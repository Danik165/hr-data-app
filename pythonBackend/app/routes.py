from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from .models import User, db
from .forms import RegistrationForm, LoginForm
from flask_jwt_extended import jwt_required, get_jwt_identity

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    form = RegistrationForm(request.form)

    if form.validate():
        user = User.query.filter_by(email=form.email.data).first()

        if user:
            return jsonify(message="Email is already registered"), 400

        new_user = User(email=form.email.data, role=form.role.data, team_id=form.team.data)
        new_user.set_password(form.password.data)

        db.session.add(new_user)
        db.session.commit()

        return jsonify(message="User registered successfully"), 201

    return jsonify(message="Invalid input"), 400

@auth_bp.route('/login', methods=['POST'])
def login():

    form = LoginForm(request.form)
    print(form)

    if form.validate():
        user = User.query.filter_by(email=form.email.data).first()

        if user and user.check_password(form.password.data):
            access_token = create_access_token(identity=user.user_id)
            return jsonify(access_token=access_token), 200

        return jsonify(message="Invalid email or password"), 401

    return jsonify(message="Invalid input "), 400

@auth_bp.route('/user_data', methods=['GET'])
@jwt_required()
def user_data():
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()

    if not user:
        return jsonify({"msg": "User not found"}), 404

    user_data = {
        "email": user.email,
        "role": user.role
    }

    return jsonify(user_data), 200
