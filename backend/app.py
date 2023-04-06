from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///employees.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
CORS(app)


class Employee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    experience = db.Column(db.String(200), nullable=False)

    def __repr__(self):
        return f'<Employee {self.name}>'

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'experience': self.experience,
        }


@app.route('/employees', methods=['GET', 'POST'])
def employees():
    if request.method == 'GET':
        employees = Employee.query.all()
        return jsonify([e.to_dict() for e in employees])
    elif request.method == 'POST':
        new_employee = Employee(name=request.json['name'], experience=request.json['experience'])
        db.session.add(new_employee)
        db.session.commit()
        return jsonify(new_employee.to_dict()), 201


@app.route('/employees/<int:employee_id>', methods=['PUT', 'DELETE'])
def employee(employee_id):
    employee = Employee.query.get_or_404(employee_id)
    if request.method == 'PUT':
        employee.name = request.json['name']
        employee.experience = request.json['experience']
        db.session.commit()
        return jsonify(employee.to_dict())
    elif request.method == 'DELETE':
        db.session.delete(employee)
        db.session.commit()
        return jsonify({'result': 'success'})


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
