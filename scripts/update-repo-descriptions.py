# Copyright (c) 2026 Nohuto. All rights reserved.
import html, json, re, time, urllib.request
from pathlib import Path

APP_PATH = Path(__file__).resolve().parents[1] / 'app.js'
OUT_PATH = Path(__file__).resolve().parents[1] / 'data' / 'repos.json'

headers = {'User-Agent': 'Mozilla/5.0'}

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

app_text = APP_PATH.read_text(encoding='utf-8')
repos = re.findall(r"repo: '([^']+)'", app_text)

repo_map = {}
for repo in repos:
    try:
        repo_map[repo] = fetch_desc(repo)
    except Exception:
        repo_map[repo] = ''
    time.sleep(0.3)

OUT_PATH.parent.mkdir(exist_ok=True)
OUT_PATH.write_text(json.dumps(repo_map, indent=2, ensure_ascii=True), encoding='utf-8')
print(f'Wrote {len(repo_map)} repos to {OUT_PATH}')