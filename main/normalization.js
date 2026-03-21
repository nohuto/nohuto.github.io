/* Copyright (c) 2026 Nohuto. All rights reserved. */
(function attachNormalization(global) {
  'use strict';

  const DEFAULTS = Object.freeze({
    stripCrossReferenceMetadata: true,
    normalizeRelocationSymbols: true,
    stripStorageLocationComments: true,
    normalizeDecompilerIdentifiers: true,
    normalizeNumericNotation: true,
    normalizeGeneratedLabels: false,
    normalizePrototypeExpansionArgs: false,
    trimTrailingWhitespace: true
  });

  const LEGACY_DEFAULTS = Object.freeze({
    stripXrefs: false,
    stripAddresses: true,
    stripLocations: true,
    normalizeIdentifiers: true,
    trimTrailingWhitespace: true
  });

  const TOKENIZER_STATES = Object.freeze({
    code: 0,
    lineComment: 1,
    blockComment: 2,
    string: 3,
    char: 4
  });

  const MAX_MEMO_ENTRIES = 300;
  const memoCache = new Map();

  const ADDRESS_PREFIX_RE = /^(qword|dword|word|byte|xmmword|ymmword|zmmword|oword|unk|loc|off|stru|sub|nullsub)_(?:0x)?[0-9A-Fa-f]{6,}$/i;
  const LARGE_HEX_ADDR_RE = /^0[xX][0-9A-Fa-f]{8,}(?:[uUlL]{0,3})$/;
  const AUTO_IDENTIFIER_DECLARATION_RE = /^(?:[_A-Za-z]\w*(?:\s+[_A-Za-z]\w*)*\s+)(?:\*+\s*)?(?:var_\d+|arg_\d+)(?:\s*\[[^\]]+\])?\s*;\s*$/;
  const GENERATED_LABEL_RE = /^LABEL_(\d+)$/;
  const KEYWORDS_BEFORE_PAREN = new Set(['if', 'for', 'while', 'switch', 'sizeof', 'return', 'case']);

  const normalizeLineEndings = text => String(text || '').replace(/\r\n?/g, '\n');
  const isWhitespace = char => char === ' ' || char === '\t' || char === '\n' || char === '\r' || char === '\f' || char === '\v';
  const isIdentifierStart = char => /[A-Za-z_]/.test(char);
  const isIdentifierPart = char => /[A-Za-z0-9_]/.test(char);

  const cloneDefaults = () => ({ ...DEFAULTS });

  const normalizeSettings = settings => {
    const normalized = cloneDefaults();
    if (!settings || typeof settings !== 'object') {
      return normalized;
    }
    Object.keys(DEFAULTS).forEach(key => {
      if (Object.prototype.hasOwnProperty.call(settings, key)) {
        normalized[key] = Boolean(settings[key]);
      }
    });
    return normalized;
  };

  const migrateSettings = legacySettings => {
    const legacy = {
      ...LEGACY_DEFAULTS,
      ...(legacySettings && typeof legacySettings === 'object' ? legacySettings : {})
    };

    return normalizeSettings({
      stripCrossReferenceMetadata: Boolean(legacy.stripXrefs),
      normalizeRelocationSymbols: Boolean(legacy.stripAddresses),
      stripStorageLocationComments: Boolean(legacy.stripLocations),
      normalizeDecompilerIdentifiers: Boolean(legacy.normalizeIdentifiers),
      normalizeNumericNotation: DEFAULTS.normalizeNumericNotation,
      normalizeGeneratedLabels: DEFAULTS.normalizeGeneratedLabels,
      normalizePrototypeExpansionArgs: DEFAULTS.normalizePrototypeExpansionArgs,
      trimTrailingWhitespace: Boolean(legacy.trimTrailingWhitespace)
    });
  };

  const stableStringify = value => {
    if (value === null) return 'null';
    if (typeof value !== 'object') return JSON.stringify(value);
    if (Array.isArray(value)) {
      return `[${value.map(stableStringify).join(',')}]`;
    }
    const keys = Object.keys(value).sort();
    return `{${keys.map(key => `${JSON.stringify(key)}:${stableStringify(value[key])}`).join(',')}}`;
  };

  const hashFnv1a = text => {
    let hash = 0x811c9dc5;
    for (let i = 0; i < text.length; i += 1) {
      hash ^= text.charCodeAt(i);
      hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
    }
    return (hash >>> 0).toString(16).padStart(8, '0');
  };

  const memoKey = (source, settings) => `${hashFnv1a(source)}:${hashFnv1a(stableStringify(settings))}`;

  const memoGet = key => {
    if (!memoCache.has(key)) return null;
    const value = memoCache.get(key);
    memoCache.delete(key);
    memoCache.set(key, value);
    return value;
  };

  const memoSet = (key, value) => {
    memoCache.set(key, value);
    if (memoCache.size <= MAX_MEMO_ENTRIES) return;
    const first = memoCache.keys().next();
    if (!first.done) memoCache.delete(first.value);
  };

  const parseIntegerLiteral = token => {
    const match = token.match(/^(0[xX][0-9A-Fa-f]+|\d+)([uUlL]{0,3})$/);
    if (!match) return null;
    const valueToken = match[1];
    const suffix = match[2] || '';
    try {
      const value = valueToken.toLowerCase().startsWith('0x')
        ? BigInt(valueToken)
        : BigInt(valueToken);
      return { value, suffix };
    } catch {
      return null;
    }
  };

  const canonicalizeIntegerLiteral = token => {
    const parsed = parseIntegerLiteral(token);
    if (!parsed) return token;
    return parsed.value.toString(10);
  };

  const stripXrefBlocks = (source, facts) => {
    const input = source;
    let state = TOKENIZER_STATES.code;
    let output = '';
    let commentBuffer = '';
    let escape = false;

    for (let i = 0; i < input.length; i += 1) {
      const char = input[i];
      const next = i + 1 < input.length ? input[i + 1] : '';

      if (state === TOKENIZER_STATES.code) {
        if (char === '/' && next === '*') {
          state = TOKENIZER_STATES.blockComment;
          commentBuffer = '/*';
          i += 1;
          continue;
        }
        if (char === '/' && next === '/') {
          state = TOKENIZER_STATES.lineComment;
          output += '//';
          i += 1;
          continue;
        }
        if (char === '"') {
          state = TOKENIZER_STATES.string;
          escape = false;
          output += char;
          continue;
        }
        if (char === '\'') {
          state = TOKENIZER_STATES.char;
          escape = false;
          output += char;
          continue;
        }
        output += char;
        continue;
      }

      if (state === TOKENIZER_STATES.lineComment) {
        output += char;
        if (char === '\n') {
          state = TOKENIZER_STATES.code;
        }
        continue;
      }

      if (state === TOKENIZER_STATES.blockComment) {
        commentBuffer += char;
        if (char === '*' && next === '/') {
          commentBuffer += '/';
          i += 1;
          const shouldStrip =
            /\bXREFs of\b/.test(commentBuffer) ||
            /\bCallers:\b/.test(commentBuffer) ||
            /\bCallees:\b/.test(commentBuffer);
          if (!shouldStrip) {
            output += commentBuffer;
          } else {
            facts.crossReferenceBlocksStripped += 1;
          }
          commentBuffer = '';
          state = TOKENIZER_STATES.code;
        }
        continue;
      }

      if (state === TOKENIZER_STATES.string) {
        output += char;
        if (escape) {
          escape = false;
        } else if (char === '\\') {
          escape = true;
        } else if (char === '"') {
          state = TOKENIZER_STATES.code;
        }
        continue;
      }

      if (state === TOKENIZER_STATES.char) {
        output += char;
        if (escape) {
          escape = false;
        } else if (char === '\\') {
          escape = true;
        } else if (char === '\'') {
          state = TOKENIZER_STATES.code;
        }
      }
    }

    if (state === TOKENIZER_STATES.blockComment && commentBuffer) {
      output += commentBuffer;
    }
    return output;
  };

  const transformCodeTokens = (source, settings, facts) => {
    let state = TOKENIZER_STATES.code;
    let escape = false;
    let output = '';
    let braceDepth = 0;
    let previousSignificant = '';

    const identifierMap = new Map();
    let argCount = 0;
    let varCount = 0;

    let labelMap = new Map();
    let labelCount = 0;

    const mapIdentifier = identifier => {
      if (!settings.normalizeDecompilerIdentifiers) return identifier;
      if (!/^([av])\d+$/.test(identifier)) return identifier;
      if (!identifierMap.has(identifier)) {
        if (identifier.startsWith('a')) {
          argCount += 1;
          identifierMap.set(identifier, `arg_${argCount}`);
        } else {
          varCount += 1;
          identifierMap.set(identifier, `var_${varCount}`);
        }
      }
      const mapped = identifierMap.get(identifier) || identifier;
      if (mapped !== identifier) {
        facts.decompilerIdentifiersNormalized += 1;
      }
      return mapped;
    };

    const mapGeneratedLabel = identifier => {
      if (!settings.normalizeGeneratedLabels) return identifier;
      const match = identifier.match(GENERATED_LABEL_RE);
      if (!match) return identifier;
      if (!labelMap.has(identifier)) {
        labelCount += 1;
        labelMap.set(identifier, `LABEL_${labelCount}`);
      }
      const mapped = labelMap.get(identifier) || identifier;
      if (mapped !== identifier) {
        facts.generatedLabelsNormalized += 1;
      }
      return mapped;
    };

    for (let i = 0; i < source.length; i += 1) {
      const char = source[i];
      const next = i + 1 < source.length ? source[i + 1] : '';

      if (state === TOKENIZER_STATES.code) {
        if (char === '/' && next === '*') {
          state = TOKENIZER_STATES.blockComment;
          output += '/*';
          i += 1;
          continue;
        }
        if (char === '/' && next === '/') {
          state = TOKENIZER_STATES.lineComment;
          output += '//';
          i += 1;
          continue;
        }
        if (char === '"') {
          state = TOKENIZER_STATES.string;
          escape = false;
          output += char;
          continue;
        }
        if (char === '\'') {
          state = TOKENIZER_STATES.char;
          escape = false;
          output += char;
          continue;
        }

        if (isIdentifierStart(char)) {
          let j = i + 1;
          while (j < source.length && isIdentifierPart(source[j])) {
            j += 1;
          }
          let identifier = source.slice(i, j);

          if (settings.normalizeRelocationSymbols && ADDRESS_PREFIX_RE.test(identifier)) {
            const prefix = identifier.slice(0, identifier.indexOf('_'));
            identifier = `${prefix}_ADDR`;
            facts.relocationSymbolsNormalized += 1;
          }

          identifier = mapIdentifier(identifier);
          identifier = mapGeneratedLabel(identifier);

          output += identifier;
          previousSignificant = identifier;
          i = j - 1;
          continue;
        }

        if (/\d/.test(char)) {
          let j = i;
          if (char === '0' && (next === 'x' || next === 'X')) {
            j += 2;
            while (j < source.length && /[0-9A-Fa-f]/.test(source[j])) {
              j += 1;
            }
            while (j < source.length && /[uUlL]/.test(source[j])) {
              j += 1;
            }
          } else {
            while (j < source.length && /\d/.test(source[j])) {
              j += 1;
            }
            if (j < source.length && source[j] === '.') {
              let k = j + 1;
              if (k < source.length && /\d/.test(source[k])) {
                while (k < source.length && /\d/.test(source[k])) {
                  k += 1;
                }
                if (k < source.length && /[eE]/.test(source[k])) {
                  k += 1;
                  if (k < source.length && /[+-]/.test(source[k])) k += 1;
                  while (k < source.length && /\d/.test(source[k])) {
                    k += 1;
                  }
                }
                output += source.slice(i, k);
                previousSignificant = source.slice(i, k);
                i = k - 1;
                continue;
              }
            }
            if (j < source.length && /[eE]/.test(source[j])) {
              let k = j + 1;
              if (k < source.length && /[+-]/.test(source[k])) k += 1;
              let hasExponentDigits = false;
              while (k < source.length && /\d/.test(source[k])) {
                hasExponentDigits = true;
                k += 1;
              }
              if (hasExponentDigits) {
                output += source.slice(i, k);
                previousSignificant = source.slice(i, k);
                i = k - 1;
                continue;
              }
            }
            while (j < source.length && /[uUlL]/.test(source[j])) {
              j += 1;
            }
          }

          const numberToken = source.slice(i, j);
          let transformedNumber = numberToken;
          if (settings.normalizeRelocationSymbols && LARGE_HEX_ADDR_RE.test(numberToken)) {
            transformedNumber = '0xADDR';
            facts.relocationSymbolsNormalized += 1;
          } else if (settings.normalizeNumericNotation) {
            const canonical = canonicalizeIntegerLiteral(numberToken);
            transformedNumber = canonical;
            if (canonical !== numberToken) {
              facts.numericLiteralsNormalized += 1;
            }
          }

          output += transformedNumber;
          previousSignificant = transformedNumber;
          i = j - 1;
          continue;
        }

        if (char === '{') {
          if (braceDepth === 0 && previousSignificant === ')') {
            labelMap = new Map();
            labelCount = 0;
          }
          braceDepth += 1;
          output += char;
          previousSignificant = char;
          continue;
        }

        if (char === '}') {
          braceDepth = Math.max(0, braceDepth - 1);
          output += char;
          previousSignificant = char;
          continue;
        }

        if (!isWhitespace(char)) {
          previousSignificant = char;
        }
        output += char;
        continue;
      }

      if (state === TOKENIZER_STATES.lineComment) {
        output += char;
        if (char === '\n') {
          state = TOKENIZER_STATES.code;
        }
        continue;
      }

      if (state === TOKENIZER_STATES.blockComment) {
        output += char;
        if (char === '*' && next === '/') {
          output += '/';
          i += 1;
          state = TOKENIZER_STATES.code;
        }
        continue;
      }

      if (state === TOKENIZER_STATES.string) {
        output += char;
        if (escape) {
          escape = false;
        } else if (char === '\\') {
          escape = true;
        } else if (char === '"') {
          state = TOKENIZER_STATES.code;
        }
        continue;
      }

      if (state === TOKENIZER_STATES.char) {
        output += char;
        if (escape) {
          escape = false;
        } else if (char === '\\') {
          escape = true;
        } else if (char === '\'') {
          state = TOKENIZER_STATES.code;
        }
      }
    }

    return output;
  };

  const splitTopLevelArgs = text => {
    const args = [];
    let state = TOKENIZER_STATES.code;
    let escape = false;
    let start = 0;
    let parenDepth = 0;
    let bracketDepth = 0;
    let braceDepth = 0;

    for (let i = 0; i < text.length; i += 1) {
      const char = text[i];
      const next = i + 1 < text.length ? text[i + 1] : '';

      if (state === TOKENIZER_STATES.code) {
        if (char === '/' && next === '*') {
          state = TOKENIZER_STATES.blockComment;
          i += 1;
          continue;
        }
        if (char === '/' && next === '/') {
          state = TOKENIZER_STATES.lineComment;
          i += 1;
          continue;
        }
        if (char === '"') {
          state = TOKENIZER_STATES.string;
          escape = false;
          continue;
        }
        if (char === '\'') {
          state = TOKENIZER_STATES.char;
          escape = false;
          continue;
        }
        if (char === '(') parenDepth += 1;
        else if (char === ')') parenDepth = Math.max(0, parenDepth - 1);
        else if (char === '[') bracketDepth += 1;
        else if (char === ']') bracketDepth = Math.max(0, bracketDepth - 1);
        else if (char === '{') braceDepth += 1;
        else if (char === '}') braceDepth = Math.max(0, braceDepth - 1);
        else if (char === ',' && parenDepth === 0 && bracketDepth === 0 && braceDepth === 0) {
          args.push(text.slice(start, i));
          start = i + 1;
        }
        continue;
      }

      if (state === TOKENIZER_STATES.blockComment) {
        if (char === '*' && next === '/') {
          i += 1;
          state = TOKENIZER_STATES.code;
        }
        continue;
      }

      if (state === TOKENIZER_STATES.lineComment) {
        if (char === '\n') {
          state = TOKENIZER_STATES.code;
        }
        continue;
      }

      if (state === TOKENIZER_STATES.string) {
        if (escape) {
          escape = false;
        } else if (char === '\\') {
          escape = true;
        } else if (char === '"') {
          state = TOKENIZER_STATES.code;
        }
        continue;
      }

      if (state === TOKENIZER_STATES.char) {
        if (escape) {
          escape = false;
        } else if (char === '\\') {
          escape = true;
        } else if (char === '\'') {
          state = TOKENIZER_STATES.code;
        }
      }
    }

    args.push(text.slice(start));
    return args;
  };

  const isDefaultPrototypeArg = value => {
    const compact = value.replace(/\s+/g, '').toLowerCase();
    if (!compact) return false;
    if (compact === '0' || compact === 'null' || compact === 'nullptr') return true;
    if (/^0[x]0+[uUlL]*$/.test(compact)) return true;
    if (/^0+[uUlL]+$/.test(compact)) return true;
    if (/^\(void\*\)0+$/.test(compact)) return true;
    return false;
  };

  const normalizePrototypeExpansionArgsPass = (source, settings, facts) => {
    if (!settings.normalizePrototypeExpansionArgs) return source;

    let state = TOKENIZER_STATES.code;
    let escape = false;
    let output = '';

    for (let i = 0; i < source.length; i += 1) {
      const char = source[i];
      const next = i + 1 < source.length ? source[i + 1] : '';

      if (state === TOKENIZER_STATES.code) {
        if (char === '/' && next === '*') {
          state = TOKENIZER_STATES.blockComment;
          output += '/*';
          i += 1;
          continue;
        }
        if (char === '/' && next === '/') {
          state = TOKENIZER_STATES.lineComment;
          output += '//';
          i += 1;
          continue;
        }
        if (char === '"') {
          state = TOKENIZER_STATES.string;
          escape = false;
          output += char;
          continue;
        }
        if (char === '\'') {
          state = TOKENIZER_STATES.char;
          escape = false;
          output += char;
          continue;
        }

        if (isIdentifierStart(char)) {
          let j = i + 1;
          while (j < source.length && isIdentifierPart(source[j])) j += 1;
          const identifier = source.slice(i, j);
          output += identifier;

          let k = j;
          while (k < source.length && /\s/.test(source[k])) {
            output += source[k];
            k += 1;
          }

          if (k < source.length && source[k] === '(' && !KEYWORDS_BEFORE_PAREN.has(identifier)) {
            let depth = 1;
            let m = k + 1;
            let callState = TOKENIZER_STATES.code;
            let callEscape = false;
            while (m < source.length && depth > 0) {
              const c = source[m];
              const n = m + 1 < source.length ? source[m + 1] : '';
              if (callState === TOKENIZER_STATES.code) {
                if (c === '/' && n === '*') {
                  callState = TOKENIZER_STATES.blockComment;
                  m += 2;
                  continue;
                }
                if (c === '/' && n === '/') {
                  callState = TOKENIZER_STATES.lineComment;
                  m += 2;
                  continue;
                }
                if (c === '"') {
                  callState = TOKENIZER_STATES.string;
                  callEscape = false;
                  m += 1;
                  continue;
                }
                if (c === '\'') {
                  callState = TOKENIZER_STATES.char;
                  callEscape = false;
                  m += 1;
                  continue;
                }
                if (c === '(') depth += 1;
                if (c === ')') depth -= 1;
                m += 1;
                continue;
              }
              if (callState === TOKENIZER_STATES.blockComment) {
                if (c === '*' && n === '/') {
                  m += 2;
                  callState = TOKENIZER_STATES.code;
                  continue;
                }
                m += 1;
                continue;
              }
              if (callState === TOKENIZER_STATES.lineComment) {
                if (c === '\n') callState = TOKENIZER_STATES.code;
                m += 1;
                continue;
              }
              if (callState === TOKENIZER_STATES.string) {
                if (callEscape) callEscape = false;
                else if (c === '\\') callEscape = true;
                else if (c === '"') callState = TOKENIZER_STATES.code;
                m += 1;
                continue;
              }
              if (callState === TOKENIZER_STATES.char) {
                if (callEscape) callEscape = false;
                else if (c === '\\') callEscape = true;
                else if (c === '\'') callState = TOKENIZER_STATES.code;
                m += 1;
              }
            }

            if (depth === 0) {
              const argsText = source.slice(k + 1, m - 1);
              const args = splitTopLevelArgs(argsText);
              if (args.length >= 3) {
                let cutIndex = args.length;
                while (cutIndex > 0 && isDefaultPrototypeArg(args[cutIndex - 1].trim())) {
                  cutIndex -= 1;
                }
                if (cutIndex < args.length && cutIndex > 0) {
                  const kept = args.slice(0, cutIndex).map(arg => arg.trim()).join(', ');
                  output += `(${kept})`;
                  facts.prototypeExpansionArgsNormalized += args.length - cutIndex;
                  i = m - 1;
                  continue;
                }
              }
              output += source.slice(k, m);
              i = m - 1;
              continue;
            }
          }

          i = k - 1;
          continue;
        }

        output += char;
        continue;
      }

      if (state === TOKENIZER_STATES.lineComment) {
        output += char;
        if (char === '\n') state = TOKENIZER_STATES.code;
        continue;
      }
      if (state === TOKENIZER_STATES.blockComment) {
        output += char;
        if (char === '*' && next === '/') {
          output += '/';
          i += 1;
          state = TOKENIZER_STATES.code;
        }
        continue;
      }
      if (state === TOKENIZER_STATES.string) {
        output += char;
        if (escape) escape = false;
        else if (char === '\\') escape = true;
        else if (char === '"') state = TOKENIZER_STATES.code;
        continue;
      }
      if (state === TOKENIZER_STATES.char) {
        output += char;
        if (escape) escape = false;
        else if (char === '\\') escape = true;
        else if (char === '\'') state = TOKENIZER_STATES.code;
      }
    }

    return output;
  };

  const stripStorageLocationCommentsPass = (source, settings, facts) => {
    if (!settings.stripStorageLocationComments) return source;

    return source
      .split('\n')
      .map(line => {
        const next = line
          .replace(/\s*\/\/\s*\[(?:rsp|rbp|esp|ebp)[^\]]*\](?:\s*\[(?:rsp|rbp|esp|ebp)[^\]]*\])*(?:\s*BYREF)?\s*$/i, '')
          .replace(/\s*\/\/\s*(?:[re]?[abcd]x|[re]?(?:si|di|sp|bp|ip)|r\d+[bwd]?|xmm\d+|ymm\d+|zmm\d+)\s*$/i, '');
        if (next !== line) {
          facts.storageLocationCommentsStripped += 1;
        }
        return next;
      })
      .join('\n');
  };

  const stripAutoIdentifierDeclarationsPass = (source, settings, facts) => {
    if (!settings.normalizeDecompilerIdentifiers) return source;

    const lines = source.split('\n');
    const kept = [];
    lines.forEach(line => {
      if (AUTO_IDENTIFIER_DECLARATION_RE.test(line.trim())) {
        facts.autoDeclarationsStripped += 1;
        return;
      }
      kept.push(line);
    });
    return kept.join('\n');
  };

  const trimTrailingWhitespacePass = (source, settings, facts) => {
    if (!settings.trimTrailingWhitespace) return source;
    const next = source.replace(/[ \t]+$/gm, '');
    if (next !== source) {
      facts.trailingWhitespaceTrimmed = true;
    }
    return next;
  };

  const finalizeText = source => {
    const compact = source.replace(/\n{3,}/g, '\n\n').trimEnd();
    return compact ? `${compact}\n` : '';
  };

  const countStatements = source => {
    let state = TOKENIZER_STATES.code;
    let escape = false;
    let braceDepth = 0;
    let parenDepth = 0;
    let statements = 0;

    for (let i = 0; i < source.length; i += 1) {
      const char = source[i];
      const next = i + 1 < source.length ? source[i + 1] : '';

      if (state === TOKENIZER_STATES.code) {
        if (char === '/' && next === '*') {
          state = TOKENIZER_STATES.blockComment;
          i += 1;
          continue;
        }
        if (char === '/' && next === '/') {
          state = TOKENIZER_STATES.lineComment;
          i += 1;
          continue;
        }
        if (char === '"') {
          state = TOKENIZER_STATES.string;
          escape = false;
          continue;
        }
        if (char === '\'') {
          state = TOKENIZER_STATES.char;
          escape = false;
          continue;
        }
        if (char === '{') {
          if (parenDepth === 0) statements += 1;
          braceDepth += 1;
          continue;
        }
        if (char === '}') {
          braceDepth = Math.max(0, braceDepth - 1);
          if (parenDepth === 0) statements += 1;
          continue;
        }
        if (char === '(') {
          parenDepth += 1;
          continue;
        }
        if (char === ')') {
          parenDepth = Math.max(0, parenDepth - 1);
          continue;
        }
        if (char === ';' && parenDepth === 0) {
          statements += 1;
        }
        continue;
      }

      if (state === TOKENIZER_STATES.blockComment) {
        if (char === '*' && next === '/') {
          i += 1;
          state = TOKENIZER_STATES.code;
        }
        continue;
      }
      if (state === TOKENIZER_STATES.lineComment) {
        if (char === '\n') state = TOKENIZER_STATES.code;
        continue;
      }
      if (state === TOKENIZER_STATES.string) {
        if (escape) escape = false;
        else if (char === '\\') escape = true;
        else if (char === '"') state = TOKENIZER_STATES.code;
        continue;
      }
      if (state === TOKENIZER_STATES.char) {
        if (escape) escape = false;
        else if (char === '\\') escape = true;
        else if (char === '\'') state = TOKENIZER_STATES.code;
      }
    }

    return statements;
  };

  const createFacts = () => ({
    crossReferenceBlocksStripped: 0,
    relocationSymbolsNormalized: 0,
    storageLocationCommentsStripped: 0,
    decompilerIdentifiersNormalized: 0,
    numericLiteralsNormalized: 0,
    generatedLabelsNormalized: 0,
    prototypeExpansionArgsNormalized: 0,
    autoDeclarationsStripped: 0,
    trailingWhitespaceTrimmed: false,
    statementCount: 0
  });

  const normalize = (source, settingsInput) => {
    const settings = normalizeSettings(settingsInput);
    const normalizedSource = normalizeLineEndings(source);
    const key = memoKey(normalizedSource, settings);
    const memoized = memoGet(key);
    if (memoized) {
      return {
        text: memoized.text,
        facts: { ...memoized.facts }
      };
    }

    const facts = createFacts();
    let text = normalizedSource;

    if (settings.stripCrossReferenceMetadata) {
      text = stripXrefBlocks(text, facts);
    }
    text = transformCodeTokens(text, settings, facts);
    text = normalizePrototypeExpansionArgsPass(text, settings, facts);
    text = stripStorageLocationCommentsPass(text, settings, facts);
    text = stripAutoIdentifierDeclarationsPass(text, settings, facts);
    text = trimTrailingWhitespacePass(text, settings, facts);

    text = finalizeText(text);
    facts.statementCount = countStatements(text);

    const result = { text, facts };
    memoSet(key, result);
    return {
      text: result.text,
      facts: { ...result.facts }
    };
  };

  const preparePair = (left, right, settingsInput) => {
    const settings = normalizeSettings(settingsInput);
    const leftResult = normalize(left, settings);
    const rightResult = normalize(right, settings);

    return {
      leftText: leftResult.text,
      rightText: rightResult.text,
      equivalent: leftResult.text === rightResult.text,
      diagnostics: {
        left: leftResult.facts,
        right: rightResult.facts,
        settings
      }
    };
  };

  global.Normalization = Object.freeze({
    DEFAULTS,
    migrateSettings,
    normalize,
    preparePair
  });
})(window);
