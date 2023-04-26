from flask import Flask
from flask_jwt_extended import JWTManager
from flask_wtf.csrf import CSRFProtect

from .config import Config
from .database import db, migrate
from .routes import auth_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)
    csrf = CSRFProtect(app)

    app.register_blueprint(auth_bp, url_prefix='/api/auth')

    return app

app = create_app()
jwt = JWTManager(app)
