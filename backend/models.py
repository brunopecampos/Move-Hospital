from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(345), unique=True)
    password = db.Column(db.Text, nullable=False)

class Hospital(db.Model):
    __tablename__ = 'hospital'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String, nullable=False)
    cnpj = db.Column(db.String(14), unique=True, nullable=False)
    employee_name = db.Column(db.String, nullable=False)
    address = db.Column(db.Text, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)

class Patient(db.Model):
    __tablename__ = 'patient'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String, nullable=False)
    age = db.Column(db.Integer, nullable=False)
    gender = db.Column(db.String, nullable=False)
    clinical_condition = db.Column(db.Text, nullable=False)
    phone = db.Column(db.String, nullable=False)
    observations = db.Column(db.Text, nullable=False)

class Request(db.Model):
    __tablename__ = 'request'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    description = db.Column(db.Text, nullable=False)
    ambulance_type = db.Column(db.String, nullable=False)
    responsible_name = db.Column(db.String, nullable=False)
    responsible_phone = db.Column(db.String, nullable=False)
    created = db.Column(db.TIMESTAMP, nullable=False, server_default=db.func.current_timestamp())
    transference_time = db.Column(db.TIMESTAMP, nullable=False)
    destination_address = db.Column(db.Text, nullable=False)
    destination_name = db.Column(db.Text, nullable=False)
    status = db.Column(db.String, nullable=False, default='created')
    hospital_id = db.Column(db.Integer, db.ForeignKey('hospital.id'), nullable=True)
    patient_id = db.Column(db.Integer, db.ForeignKey('patient.id'), nullable=True)
    avaliation = db.Column(db.Float, nullable=True)

class Provider(db.Model):
    __tablename__ = 'provider'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String, nullable=False)
    cnpj = db.Column(db.String, nullable=False)
    address = db.Column(db.Text, nullable=False)
    employee_name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)

class Ambulance(db.Model):
    __tablename__ = 'ambulance'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    factory_model = db.Column(db.Text, nullable=False)
    license_plate = db.Column(db.Text, nullable=False)
    ambulance_type = db.Column(db.String, nullable=False)
    provider_id = db.Column(db.Integer, db.ForeignKey('provider.id'), nullable=False)

class Driver(db.Model):
    __tablename__ = 'driver'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String, nullable=False)
    cpf = db.Column(db.String(11), nullable=False)
    provider_id = db.Column(db.Integer, db.ForeignKey('provider.id'), nullable=False)

class Offer(db.Model):
    __tablename__ = 'offer'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    code = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)
    status = db.Column(db.String, nullable=False, default="created")
    created = db.Column(db.TIMESTAMP, nullable=False, server_default=db.func.current_timestamp())
    provider_id = db.Column(db.Integer, db.ForeignKey('provider.id'), nullable=True)
    driver_id = db.Column(db.Integer, db.ForeignKey('driver.id'), nullable=True)
    ambulance_id = db.Column(db.Integer, db.ForeignKey('ambulance.id'), nullable=True)
    request_id = db.Column(db.Integer, db.ForeignKey('request.id'), nullable=True)

    provider = db.relationship("Provider", backref="offers")
    driver = db.relationship("Driver", backref="offers")
    ambulance = db.relationship("Ambulance", backref="offers")
    request = db.relationship("Request", backref="offers")

