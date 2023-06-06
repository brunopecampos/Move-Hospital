import os
import sqlite3
from flask import Flask, jsonify, redirect, request, render_template, session, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

from database.models import *

app = Flask(__name__)

basedir = os.path. abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'database/database.db')
app.config['SECRET_KEY'] = '78e36c5a25734464e6d890cc3c4e61ed5474eba0ed576900346362d7ee841176'

db.init_app(app)
ma.init_app(app)


def get_db_connection():
    conn = sqlite3.connect('database/database.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/')
def index():
    return "Welcome to Move Hospital!"

@app.route('/patient/')
def get_patient():
	patients = Patient.query.all()

	return PatientSchema(many=True).jsonify(patients)

@app.route('/hospital/', methods=['GET'])
def get_hospitals():
	hospitals = Hospital.query.all()

	return HospitalSchema(many=True).jsonify(hospitals)	

@app.route('/hospital/', methods=['POST'])
def create_hospital():
	name = request.json.get('name')
	cnpj = request.json.get('cnpj')
	employee_name = request.json.get('employee_name')
	address = request.json.get('address')
	email = request.json.get('email')
	password = request.json.get('password')

	hospital = Hospital(name, cnpj, employee_name, address, email, password)

	db.session.add(hospital)
	db.session.commit()

	return HospitalSchema().jsonify(hospital)

@app.route('/login/', methods=['POST'])
def login_user():
	email = request.json.get('email')
	password = request.json.get('password')

	user = Hospital.query.filter_by(email=email).first()

	if user is None:
		return redirect(url_for('index'))

	if not user.password == password:
		return jsonify({"error": "Unauthorized"}), 401
    
	session["user_id"] = user.id

	return jsonify({
		"id": user.id,
		"email": user.email
	})
