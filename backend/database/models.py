from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

db = SQLAlchemy()
ma = Marshmallow()

class Hospital(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(100))
	cnpj = db.Column(db.String(14))
	employee_name = db.Column(db.String(50))
	address = db.Column(db.String(100))
	email = db.Column(db.String(50))
	password = db.Column(db.String(50))

	def __init__(self, name, cnpj, employe, address, email, password):
		self.name = name
		self.cnpj = cnpj
		self.employee_name = employe
		self.address = address
		self.email = email
		self.password = password

class HospitalSchema(ma.SQLAlchemyAutoSchema):
	class Meta:
		model = Hospital

class Patient(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(100))
	age = db.Column(db.Integer)
	gender = db.Column(db.String(10))
	clinical_condition = db.Column(db.String(50))
	phone = db.Column(db.String(20))
	observations = db.Column(db.String(100))    
    
	def __init__(self, name, age, gender, condition, phone, observations):
		self.name = name
		self.age = age
		self.gender = gender
		self.clinical_condition = condition
		self.phone = phone
		self.observations = observations

class PatientSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
    	model = Patient