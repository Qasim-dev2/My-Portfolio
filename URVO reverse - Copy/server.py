import http.server
import socketserver
import os

PORT = 8000

class SPAHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Translate the path to the local file system path
        path = self.translate_path(self.path)
        
        # If the file doesn't exist, and it doesn't have an extension, route to index.html
        if not os.path.exists(path):
            self.path = '/index.html'
            
        return super().do_GET()

Handler = SPAHandler
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving SPA on http://localhost:{PORT}")
    httpd.serve_forever()
