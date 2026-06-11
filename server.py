from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlsplit
import sys


class Handler(SimpleHTTPRequestHandler):
    def route(self):
        url = urlsplit(self.path)
        path = unquote(url.path)
        if path != "/" and path.endswith("/") and Path(self.directory, path.strip("/") + ".html").is_file():
            target = path.rstrip("/")
            if url.query:
                target += "?" + url.query
            self.send_response(308)
            self.send_header("Location", target)
            self.end_headers()
            return True
        return False

    def do_GET(self):
        if not self.route():
            super().do_GET()

    def do_HEAD(self):
        if not self.route():
            super().do_HEAD()

    def translate_path(self, path):
        resolved = Path(super().translate_path(path))
        route = unquote(urlsplit(path).path)
        if route != "/" and not resolved.exists():
            html = Path(str(resolved).rstrip("/\\") + ".html")
            if html.is_file():
                return str(html)
        return str(resolved)


port = int(sys.argv[1]) if len(sys.argv) > 1 else 8888
with ThreadingHTTPServer(("127.0.0.1", port), lambda *args: Handler(*args, directory=".")) as server:
    print(f"http://127.0.0.1:{port}/")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
