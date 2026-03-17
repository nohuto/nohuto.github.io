import html, json, os, re, shutil, time, urllib.error, urllib.request
from pathlib import Path

R = Path(__file__).resolve().parents[1]
A = R / 'app.js'
O = R / 'data' / 'repos.json'
MS = R / 'data' / 'media-sources.json'
MC = R / 'data' / 'media-cache.json'
H = {'User-Agent': 'Mozilla/5.0'}


def jload(p, d):
    try:
        return json.loads(p.read_text(encoding='utf-8'))
    except Exception:
        return d


def jsave(p, d):
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(json.dumps(d, indent=2, ensure_ascii=True), encoding='utf-8')


def ndesc(v, r):
    if not v:
        return ''
    t = html.unescape(str(v).strip())
    s = f' - {r}'
    if t.endswith(s):
        t = t[:-len(s)].rstrip()
    return '' if t == f'Contribute to {r} development by creating an account on GitHub.' else t


def fetch(r):
    hh = dict(H)
    hh['Accept'] = 'application/vnd.github+json'
    tok = os.getenv('GITHUB_TOKEN')
    if tok:
        hh['Authorization'] = f'Bearer {tok}'
    try:
        q = urllib.request.Request(f'https://api.github.com/repos/{r}', headers=hh)
        with urllib.request.urlopen(q, timeout=20) as x:
            p = json.loads(x.read().decode('utf-8', 'ignore'))
        if isinstance(p, dict) and 'description' in p:
            return ndesc(p.get('description'), r)
    except Exception:
        pass
    try:
        q = urllib.request.Request(f'https://github.com/{r}', headers=H)
        with urllib.request.urlopen(q, timeout=20) as x:
            t = x.read().decode('utf-8', 'ignore')
        m = re.search(r'<meta name="description" content="([^"]+)"', t)
        return ndesc(m.group(1), r) if m else ''
    except Exception:
        return ''


def upd_repos():
    repos = re.findall(r"repo: '([^']+)'", A.read_text(encoding='utf-8'))
    out = {}
    for r in repos:
        out[r] = fetch(r)
        time.sleep(0.3)
    jsave(O, out)


def pull(url, dst, cache):
    hh = dict(H)
    e = cache.get(url, {})
    if e.get('etag'):
        hh['If-None-Match'] = e['etag']
    if e.get('last_modified'):
        hh['If-Modified-Since'] = e['last_modified']
    try:
        req = urllib.request.Request(url, headers=hh)
        with urllib.request.urlopen(req, timeout=60) as resp:
            p = R / dst
            p.parent.mkdir(parents=True, exist_ok=True)
            t = p.with_suffix(p.suffix + '.tmp')
            with open(t, 'wb') as f:
                shutil.copyfileobj(resp, f)
            t.replace(p)
            ce = cache.setdefault(url, {})
            if resp.headers.get('ETag'):
                ce['etag'] = resp.headers['ETag']
            if resp.headers.get('Last-Modified'):
                ce['last_modified'] = resp.headers['Last-Modified']
    except urllib.error.HTTPError as e:
        if e.code != 304:
            return
    except Exception:
        return


def upd_media():
    src = jload(MS, [])
    if not src:
        return
    cache = jload(MC, {})
    for it in src:
        u = it.get('url')
        p = it.get('path')
        if u and p:
            pull(u, p, cache)
            time.sleep(0.2)
    jsave(MC, cache)


if __name__ == '__main__':
    upd_repos()
    upd_media()
