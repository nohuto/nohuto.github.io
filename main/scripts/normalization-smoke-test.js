/* Copyright (c) 2026 Nohuto. All rights reserved. */
const fs = require('fs');
const vm = require('vm');
const assert = require('assert');

const context = { window: {}, console };
vm.createContext(context);
vm.runInContext(fs.readFileSync('main/normalization.js', 'utf8'), context);

const engine = context.window.Normalization;
assert(engine, 'Normalization must be attached to window');

const migrated = engine.migrateSettings({
  stripXrefs: true,
  stripAddresses: true,
  stripLocations: true,
  normalizeIdentifiers: false,
  trimTrailingWhitespace: true
});
assert.strictEqual(migrated.stripCrossReferenceMetadata, true);
assert.strictEqual(migrated.normalizeRelocationSymbols, true);
assert.strictEqual(migrated.stripStorageLocationComments, true);
assert.strictEqual(migrated.normalizeDecompilerIdentifiers, false);

const left = [
  '/*',
  ' * XREFs of Fn @ 0x140123456',
  ' */',
  'int __fastcall Fn(int a1)',
  '{',
  '  int v1;',
  '  if ( a1 == 0x10u )',
  '    goto LABEL_20;',
  'LABEL_20:',
  '  return 0LL;',
  '}'
].join('\n');

const right = [
  '/*',
  ' * XREFs of Fn @ 0x140654321',
  ' */',
  'int __fastcall Fn(int a2)',
  '{',
  '  int v2;',
  '  if ( a2 == 16LL )',
  '    goto LABEL_19;',
  'LABEL_19:',
  '  return 0;',
  '}'
].join('\n');

const normalizationSettings = {
  ...engine.DEFAULTS,
  normalizeGeneratedLabels: true
};
const prepared = engine.preparePair(left, right, normalizationSettings);
assert.strictEqual(prepared.equivalent, true, 'Equivalent pseudocode should normalize to no-diff');

const labelsOff = engine.preparePair(left, right, {
  ...engine.DEFAULTS,
  normalizeGeneratedLabels: false
});
assert.strictEqual(labelsOff.equivalent, false, 'Without label normalization, label renumbering should still diff');

console.log('normalization smoke tests passed');
