# Copyright (c) 2026 Nohuto. All rights reserved.
import html, json, re, time, urllib.error, urllib.request, shutil
from pathlib import Path

ROOT_PATH = Path(__file__).resolve().parents[1]
APP_PATH = ROOT_PATH / 'app.js'
OUT_PATH = ROOT_PATH / 'data' / 'repos.json'
MEDIA_SOURCES_PATH = ROOT_PATH / 'data' / 'media-sources.json'
MEDIA_CACHE_PATH = ROOT_PATH / 'data' / 'media-cache.json'

headers = {'User-Agent': 'Mozilla/5.0'}

def load_json(path, default):
    if not path.exists():
        return default
    try:
        return json.loads(path.read_text(encoding='utf-8'))
    except json.JSONDecodeError:
        return default

def save_json(path, data):
    path.parent.mkdir(exist_ok=True)
    path.write_text(json.dumps(data, indent=2, ensure_ascii=True), encoding='utf-8')

def fetch_desc(repo):
    url = f'https://github.com/{repo}'
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, timeout=20) as resp:
        html_text = resp.read().decode('utf-8', errors='ignore')
    match = re.search(r'<meta name="description" content="([^"]+)"', html_text)
    if not match:
        return ''
    desc = match.group(1)
    suffix = f' - {repo}'
    if desc.endswith(suffix):
        desc = desc[: -len(suffix)]
    return html.unescape(desc.strip())

def update_repo_descriptions():
    app_text = APP_PATH.read_text(encoding='utf-8')
    repos = re.findall(r"repo: '([^']+)'", app_text)

    repo_map = {}
    for repo in repos:
        try:
            repo_map[repo] = fetch_desc(repo)
        except Exception:
            repo_map[repo] = ''
        time.sleep(0.3)

    save_json(OUT_PATH, repo_map)
    print(f'Wrote {len(repo_map)} repos to {OUT_PATH}')

def download_media_asset(url, destination, cache):
    request_headers = dict(headers)
    cache_entry = cache.get(url, {})
    etag = cache_entry.get('etag')
    last_modified = cache_entry.get('last_modified')
    if etag:
        request_headers['If-None-Match'] = etag
    if last_modified:
        request_headers['If-Modified-Since'] = last_modified

    req = urllib.request.Request(url, headers=request_headers)
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            dest_path = ROOT_PATH / destination
            dest_path.parent.mkdir(parents=True, exist_ok=True)
            temp_path = dest_path.with_suffix(dest_path.suffix + '.tmp')
            with open(temp_path, 'wb') as handle:
                shutil.copyfileobj(resp, handle)
            temp_path.replace(dest_path)
            new_entry = cache.setdefault(url, {})
            resp_etag = resp.headers.get('ETag')
            resp_last_modified = resp.headers.get('Last-Modified')
            if resp_etag:
                new_entry['etag'] = resp_etag
            if resp_last_modified:
                new_entry['last_modified'] = resp_last_modified
            return True
    except urllib.error.HTTPError as err:
        if err.code == 304:
            return False
        print(f'Failed to download {url}: {err}')
    except Exception as err:
        print(f'Failed to download {url}: {err}')
    return False

def update_media_assets():
    sources = load_json(MEDIA_SOURCES_PATH, [])
    if not sources:
        print('No media sources configured.')
        return 0
    cache = load_json(MEDIA_CACHE_PATH, {})
    updated = 0
    for item in sources:
        url = item.get('url')
        destination = item.get('path')
        if not url or not destination:
            continue
        if download_media_asset(url, destination, cache):
            updated += 1
        time.sleep(0.2)
    save_json(MEDIA_CACHE_PATH, cache)
    print(f'Updated {updated} media assets.')
    return updated

if __name__ == '__main__':
    update_repo_descriptions()
    update_media_assets()
