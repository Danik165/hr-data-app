from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///employees.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAu1SU1LfVLPHCozMxH2Mo'
jwt = JWTManager(app)
db = SQLAlchemy(app)
CORS(app)


class Skill(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    skill = db.Column(db.String(100), nullable=False)
    level = db.Column(db.String(100), nullable=False)
    years = db.Column(db.String(100), nullable=False)
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'), nullable=False)

    def __repr__(self):
        return f'<Skill {self.skill} - {self.level} - {self.years}>'

    def to_dict(self):
        return {
            'id': self.id,
            'skill': self.skill,
            'level': self.level,
            'years': self.years
        }


class Employee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    activity = db.Column(db.String(100), nullable=False)
    skills = db.relationship('Skill', backref='employee', lazy=True, cascade="all, delete-orphan")
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f'<Employee {self.name}>'

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'activity': self.activity,
            'created_at': self.created_at.isoformat(),
            'skills': [skill.to_dict() for skill in self.skills],
        }


@app.route('/employees', methods=['GET', 'POST'])
@jwt_required()
def employees():
    if request.method == 'GET':
        employees = Employee.query.all()
        return jsonify([e.to_dict() for e in employees])
    elif request.method == 'POST':
        new_employee = Employee(name=request.json['name'], activity=request.json['activity'])

        skills = request.json['skills']
        for skill_data in skills:
            skill = Skill(skill=skill_data['skill'], level=skill_data['level'], years=skill_data['years'], employee=new_employee)
            db.session.add(skill)

        db.session.add(new_employee)
        db.session.commit()
        return jsonify(new_employee.to_dict()), 201


@app.route('/employees/<int:employee_id>', methods=['PUT', 'DELETE'])
@jwt_required()
def employee(employee_id):
    employee = Employee.query.get_or_404(employee_id)
    if request.method == 'PUT':
        employee.name = request.json['name']
        employee.activity = request.json['activity']
        employee.skills = []
        skills = request.json['skills']
        for skill_data in skills:
            skill = Skill(skill=skill_data['skill'], level=skill_data['level'], years=skill_data['years'], employee=employee)
            db.session.add(skill)

        db.session.commit()
        return jsonify(employee.to_dict())
    elif request.method == 'DELETE':
        db.session.delete(employee)
        db.session.commit()
        return jsonify({'result': 'success'})


users = {}


@app.route('/register', methods=['POST'])
def register():
    username = request.json.get('username', None)
    password = request.json.get('password', None)
    if not username or not password:
        return jsonify({"msg": "Missing username or password"}), 400

    if username in users:
        return jsonify({"msg": "Username already exists"}), 400

    users[username] = password
    return jsonify({"msg": "User registered successfully"}), 201


@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username', None)
    password = request.json.get('password', None)
    if not username or not password:
        return jsonify({"msg": "Missing username or password"}), 400

    user_password = users.get(username, None)
    if user_password is None or user_password != password:
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token), 200



@app.errorhandler(500)
def internal_server_error(error):
    app.logger.error('Server Error: %s', error)
    return jsonify({'error': 'Internal Server Error'}), 500


def create_tables():
    with app.app_context():
        db.create_all()


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)

