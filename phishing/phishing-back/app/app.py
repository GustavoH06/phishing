from flask import Flask
from flask_cors import CORS
from ext import config

def create_app():
    app = Flask(__name__)
    
    CORS(app, 
        origins=["http://localhost:5173", "http://localhost:5173", "https://*.preview.app.github.dev"],
        methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allow_headers=["Content-Type", "Authorization", "X-Requested-With"],
        supports_credentials=True,
        max_age=3600)
    
    config.init_app(app)
    config.load_extensions(app)

    return app