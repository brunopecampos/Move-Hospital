from flask import Flask, request, jsonify, session, Response
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from flask_session import Session
from config import ApplicationConfig
from models import db, Hospital, Provider, User, Patient, Request, Offer, Ambulance, Driver
from datetime import datetime

app = Flask(__name__)
app.config.from_object(ApplicationConfig)

bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
server_session = Session(app)
db.init_app(app)

with app.app_context():
    db.create_all()

# Helper funcions -> put in another file

def user_type_from_obj(obj):
    if obj == Hospital:
        return "hospital"
    return "provider"

def user_type_from_str(user_str):
    if user_str == "hospital": 
        return Hospital
    return Provider

def set_session(id, user_type):
    #print(f"new session: {id} {user_type_from_obj(user_type)}")
    session["user_id"] = id
    session["user_type"] = user_type_from_obj(user_type)

def clear_session():
    session.pop("user_id")
    session.pop("user_type")

def register_user(request, user_type):
    name = request.json["name"]
    cnpj = request.json["cnpj"]
    employee_name = request.json["employee_name"]
    address = request.json["address"]
    email = request.json["email"]
    password = request.json["password"]

    hashed_password = bcrypt.generate_password_hash(password)
    new_user = user_type(name=name, cnpj=cnpj, employee_name=employee_name, address=address, email=email, password=hashed_password)

    user_exists = user_type.query.filter_by(email=new_user.email).first() is not None

    if user_exists:
        return jsonify({"error": "User already exists"}), 409

    db.session.add(new_user)
    db.session.commit()

    set_session(new_user.id, user_type)

    return jsonify({
        "id": new_user.id,
    })

def login_user(request, user_type):
    email = request.json["email"]
    password = request.json["password"]

    user = user_type.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error": "Unauthorized"}), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401
    
    set_session(user.id, user_type)

    return jsonify({
        "id": user.id,
        "email": user.email
    })

@app.route("/@me")
def get_current_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    
    user_type = session.get("user_type")
    user_obj = user_type_from_str(user_type)
    user = user_obj.query.filter_by(id=user_id).first()
    return jsonify({
        "id": user.id,
        "email": user.email,
        "user_type": user_type,
        "name": user.name
    }) 

@app.route("/register-hospital", methods=["POST"])
def register_hospital():
    return register_user(request, Hospital)

###### HOSPITAL ENDPOINTS ######
@app.route('/hospital/<int:hospitalId>/request', methods=['POST'])
def create_request(hospitalId):
    data = request.json
    # Extract data from the request JSON
    ambulance_type = data['ambulance_type']
    destination_name = data['destination_name']
    destination_address = data['destination_address']
    description = data['description']
    transference_time = datetime.strptime(data['transference_time'], '%Y-%m-%d %H:%M:%S')
    responsible_name = data['responsible_name']
    responsible_phone = data['responsible_phone']
    patient_name = data['patient_name']
    patient_age = int(data['patient_age'])
    patient_gender = data['patient_gender']
    patient_clinical_condition = data['patient_clinical_condition']
    patient_phone = data['patient_phone']
    patient_observations = data['patient_observations']

    # Create new objects in the database
    hospital = Hospital.query.get(hospitalId)
    patient = Patient(name=patient_name, age=patient_age, gender=patient_gender,
                      clinical_condition=patient_clinical_condition, phone=patient_phone,
                      observations=patient_observations)
    request_entity = Request(ambulance_type=ambulance_type, description=description,
                      responsible_name=responsible_name, responsible_phone=responsible_phone,
                      created=datetime.now(), transference_time=transference_time,
                      destination_address=destination_address, destination_name=destination_name,
                      hospital_id=hospitalId)
    request_entity.hospital_id = hospitalId
    #request_entity.patient_id = patient

    db.session.add(patient)
    db.session.flush()
    request_entity.patient_id = patient.id
    db.session.add(request_entity)
    db.session.commit()

    return jsonify({'message': 'Request created successfully'}), 201

# Get requests with status "pending"
@app.route('/hospital/<int:hospitalId>/request/pending', methods=['GET'])
def get_created_requests(hospitalId):
    hospital = Hospital.query.get(hospitalId)
    requests = Request.query.filter_by(hospital_id=hospitalId, status='pending').all()
    result = []
    for request_item in requests:
        patient = Patient.query.get(request_item.patient_id)
        request_data = {
            'id': request_item.id,
            'ambulance_type': request_item.ambulance_type,
            'origin_name': hospital.name,
            'origin_address': hospital.address,
            'destination_name': request_item.destination_name,
            'destination_address': request_item.destination_address,
            'description': request_item.description,
            'transference_time': request_item.transference_time,
            'created': request_item.created,
            'responsible_name': request_item.responsible_name,
            'responsible_phone': request_item.responsible_phone,
            'patient_name': patient.name,
            'patient_age': patient.age,
            'patient_gender': patient.gender,
            'patient_clinical_condition': patient.clinical_condition,
            'patient_phone': patient.phone,
            'patient_observations': patient.observations
        }
        result.append(request_data)

    return jsonify(result)

# Get requests with status "scheduled"
@app.route('/hospital/<int:hospitalId>/request/scheduled', methods=['GET'])
def get_scheduled_requests(hospitalId):
    hospital = Hospital.query.get(hospitalId)
    requests = Request.query.filter_by(hospital_id=hospitalId,status='scheduled').all()
    print("AAAAAAAAAAAAAA")
    result = []
    for request_item in requests:
        print(request_item.id)
        patient = Patient.query.get(request_item.patient_id)
        print(type(patient))
        offer = Offer.query.filter_by(request_id=request_item.id,status='approved').one()
        #print("sdfjlksfjkldsjfksld")
        provider = Provider.query.get(offer.provider_id)
        driver = Driver.query.get(offer.driver_id)
        ambulance = Ambulance.query.get(offer.ambulance_id)
        request_data = {
            'id': request_item.id,
            'ambulance_type': request_item.ambulance_type,
            'origin_name': hospital.name,
            'origin_address': hospital.address,
            'destination_name': request_item.destination_name,
            'destination_address': request_item.destination_address,
            'description': request_item.description,
            'transference_time': request_item.transference_time,
            'created': request_item.created,
            'responsible_name': request_item.responsible_name,
            'responsible_phone': request_item.responsible_phone,
            'patient_name': patient.name,
            'patient_age': patient.age,
            'patient_gender': patient.gender,
            'patient_clinical_condition': patient.clinical_condition,
            'patient_phone': patient.phone,
            'patient_observations': patient.observations,
            'provider_name': provider.name,
            'price': offer.price,
            'driver_name': driver.name,
            'ambulance_model': ambulance.factory_model,
            'ambulance_license_plate': ambulance.license_plate
        }
        result.append(request_data)

    return jsonify(result)

# Get requests with status "ongoing"
@app.route('/hospital/<int:hospitalId>/request/ongoing', methods=['GET'])
def get_ongoing_requests(hospitalId):
    hospital = Hospital.query.get(hospitalId)
    requests = Request.query.filter_by(hospital_id=hospitalId, status='ongoing').all()
    result = []
    for request_item in requests:
        patient = Patient.query.get(request_item.patient_id)
        offer = Offer.query.filter_by(request_id=request_item.id,status='approved').first()
        provider = Provider.query.get(offer.provider_id)
        driver = Driver.query.get(offer.driver_id)
        ambulance = Ambulance.query.get(offer.ambulance_id)
        status_text = "Em andamento" if request_item.status=='ongoing' else "Paciente coletado"
        request_data = {
            'id': request_item.id,
            'ambulance_type': request_item.ambulance_type,
            'origin_name': hospital.name,
            'origin_address': hospital.address,
            'destination_name': request_item.destination_name,
            'destination_address': request_item.destination_address,
            'description': request_item.description,
            'transference_time': request_item.transference_time,
            'created': request_item.created,
            'responsible_name': request_item.responsible_name,
            'responsible_phone': request_item.responsible_phone,
            'patient_name': patient.name,
            'patient_age': patient.age,
            'patient_gender': patient.gender,
            'patient_clinical_condition': patient.clinical_condition,
            'patient_phone': patient.phone,
            'patient_observations': patient.observations,
            'provider_name': provider.name,
            'price': offer.price,
            'driver_name': driver.name,
            'ambulance_model': ambulance.factory_model,
            'ambulance_license_plate': ambulance.license_plate,
            'status': status_text
        }
        result.append(request_data)

    return jsonify(result)

# Get requests with status "finished"
@app.route('/hospital/<int:hospitalId>/request/concluded', methods=['GET'])
def get_concluded_requests(hospitalId):
    hospital = Hospital.query.get(hospitalId)
    requests = Request.query.filter_by(hospital_id=hospitalId, status='finished').all()
    result = []
    for request_item in requests:
        patient = Patient.query.get(request_item.patient_id)
        offer = Offer.query.filter_by(request_id=request_item.id, status="approved").first()
        provider = Provider.query.get(offer.provider_id)
        driver = Driver.query.get(offer.driver_id)
        ambulance = Ambulance.query.get(offer.ambulance_id)
        if ambulance:
            request_data = {
                'id': request_item.id,
                'ambulance_type': request_item.ambulance_type,
                'origin_name': hospital.name,
                'origin_address': hospital.address,
                'destination_name': request_item.destination_name,
                'destination_address': request_item.destination_address,
                'description': request_item.description,
                'transference_time': request_item.transference_time,
                'created': request_item.created,
                'responsible_name': request_item.responsible_name,
                'responsible_phone': request_item.responsible_phone,
                'patient_name': patient.name,
                'patient_age': patient.age,
                'patient_gender': patient.gender,
                'patient_clinical_condition': patient.clinical_condition,
                'patient_phone': patient.phone,
                'patient_observations': patient.observations,
                'provider_name': provider.name,
                'price': offer.price,
                'avaliation': request_item.avaliation
            }
            result.append(request_data)

    return jsonify(result)

@app.route('/hospital/<hospitalId>/request/<int:requestId>', methods=['PATCH'])
def set_request_rating(hospitalId, requestId):
    request_item = Request.query.get(requestId)
    data = request.json
    if request_item:
        request_item.avaliation = data['rating']
        db.session.commit()
        return Response(status=200)
    
    return Response(status=400)

# Get all offers for a given request
@app.route('/hospital/<int:hospitalId>/request/<int:requestId>/offer', methods=['GET'])
def get_request_offers(hospitalId, requestId):
    #offers = Offer.query.join(Request).filter_by(id=requestId, hospital_id=hospitalId).all()
    offers = Offer.query.filter_by(request_id=requestId).all() #Faster version?
    result = []
    for offer_item in offers:
        provider = Provider.query.get(offer_item.provider_id)
        driver = Driver.query.get(offer_item.driver_id)
        offer_data = {
            'id': offer_item.id,
            'provider_name': provider.name,
            'provider_rating': provider.rating,
            'price': offer_item.price,
            'driver_name': driver.name,
            'created': offer_item.created,
        }
        result.append(offer_data)

    return jsonify(result)

# Approve request offer
@app.route('/hospital/<int:hospitalId>/request/<int:requestId>/offer/<int:offerId>/approve', methods=['PATCH'])
def set_request_offer_status(hospitalId, requestId, offerId):
    offer = Offer.query.get(offerId)
    if (offer):
        offer.status = 'approved'
        request_item = Request.query.get(requestId)
        if request_item:
            request_item.status = 'scheduled'
            db.session.commit()
            return Response(status=200)
        return Response(status=400)


    return Response(status=400)

# Get hospital profile information    
@app.route('/hospital/<int:hospitalId>/profile', methods=['GET'])
def get_hospital_profile(hospitalId):
    hospital = Hospital.query.get(hospitalId)
    if(hospital):
        hospital_data = {
            'name': hospital.name,
            'cnpj': hospital.cnpj,
            'address': hospital.address,
            'employee_name': hospital.employee_name,
            'email': hospital.email
        }

        return jsonify(hospital_data)
    else:
        return Response(status=400)

###### PROVIDER ENDPOINTS ######

# Create an ambulance
@app.route('/provider/<int:providerId>/ambulance/', methods=['POST'])
def create_ambulance(providerId):
    data = request.get_json()

    # Extract data from the request JSON
    factory_model = data['factory_model']
    license_plate = data['license_plate']
    ambulance_type = data['ambulance_type']

    # Retrieve the provider from the database
    provider = Provider.query.get(providerId)

    # Create a new ambulance object
    ambulance = Ambulance(factory_model=factory_model, license_plate=license_plate,
                          ambulance_type=ambulance_type, provider_id=providerId)

    # Assign the provider to the ambulance
    ambulance.provider = provider

    db.session.add(ambulance)
    db.session.commit()

    return jsonify({'message': 'Ambulance created successfully'}), 201

# Get provider's ambulances
@app.route('/provider/<int:providerId>/ambulance', methods=['GET'])
def get_provider_ambulances(providerId):
    ambulances = Ambulance.query.filter_by(provider_id=providerId).all()
    result = []
    for ambulance in ambulances:
        ambulance_data = {
            'id': ambulance.id,
            'factory_model': ambulance.factory_model,
            'license_plate': ambulance.license_plate,
            'ambulance_type': ambulance.ambulance_type
        }
        result.append(ambulance_data)

    return jsonify(result)

# Get all system's requests
@app.route('/provider/<int:providerId>/request/pending', methods=['GET'])
def get_all_requests(providerId):
    requests = Request.query.filter_by(status="peding").all()
    result = []
    for request_item in requests:
        patient = Patient.query.get(request_item.patient_id)
        hospital = Hospital.query.get(request_item.hospital_id)
        request_data = {
            'id': request_item.id,
            'ambulance_type': request_item.ambulance_type,
            'origin_name': hospital.name,
            'origin_address': hospital.address,
            'destination_name': request_item.destination_name,
            'destination_address': request_item.destination_address,
            'description': request_item.description,
            'transference_time': request_item.transference_time,
            'created': request_item.created,
            'responsible_name': request_item.responsible_name,
            'responsible_phone': request_item.responsible_phone,
            'patient_name': patient.name,
            'patient_age': patient.age,
            'patient_gender': patient.gender,
            'patient_clinical_condition': patient.clinical_condition,
            'patient_phone': patient.phone,
            'patient_observations': patient.observations
        }
        result.append(request_data)

    return jsonify(result)

# Create an offer for a request
@app.route('/provider/<int:providerId>/offer/<int:requestId>', methods=['POST'])
def create_offer(providerId, requestId):
    data = request.get_json()

    # Extract data from the request JSON
    price = data['price']
    ambulance_id = data['ambulance_id']
    driver_name = data['driver_name']
    driver_cpf = data['driver_cpf']

    # Retrieve the provider and request from the database
    provider = Provider.query.get(providerId)
    request_item = Request.query.get(requestId)

    # Create a new offer object
    offer = Offer(price=price, provider_id=providerId, 
                  ambulance_id=ambulance_id, request_id=requestId)

    # Assign the provider, driver, ambulance, and request to the offer
    offer.provider = provider
    offer.driver = Driver(name=driver_name, cpf=driver_cpf, provider_id=providerId)
    offer.ambulance = Ambulance.query.get(ambulance_id)
    offer.request = request_item

    db.session.add(offer)
    db.session.commit()

    return jsonify({'message': 'Offer created successfully'}), 200

# Get pending offers
@app.route('/provider/<int:providerId>/offer/pending', methods=['GET'])
def get_pending_offers(providerId):
    provider = Provider.query.get(providerId)
    offers = Offer.query.filter_by(provider=provider, status='pending').all()
    result = []
    for offer in offers:
        request = Request.query.get(offer.request_id)
        hospital = Hospital.query.get(request.hospital_id)
        ambulance = Ambulance.query.get(offer.ambulance_id)
        if ambulance :
            driver = Driver.query.get(offer.driver_id)
            offer_data = {
                'price': offer.price,
                'hospital_name': hospital.name,
                'origin_address': hospital.address,
                'destination_address': request.destination_address,
                'transference_time': request.transference_time,
                'driver_name': driver.name,
                'ambulance_model': ambulance.factory_model,
                'ambulance_license_plate': ambulance.license_plate
            }
            result.append(offer_data)


    return jsonify(result)

# Get denied or expired offers
@app.route('/provider/<int:providerId>/offer/denied', methods=['GET'])
def get_denied_expired_offers(providerId):
    provider = Provider.query.get(providerId)
    offers = Offer.query.filter((Offer.provider==provider) & ((Offer.status=='denied') | (Offer.status=='expired'))).all()
    result = []
    for offer in offers:
        request = Request.query.get(offer.request_id)
        hospital = Hospital.query.get(request.hospital_id)
        ambulance = Ambulance.query.get(offer.ambulance_id)
        driver = Driver.query.get(offer.driver_id)
        offer_data = {
            'price': offer.price,
            'destination_address': request.destination_address,
            'transference_time': request.transference_time,
            'driver_name': driver.name,
        }
        result.append(offer_data)

    return jsonify(result)

# Get requests scheduled to the provider
@app.route('/provider/<int:providerId>/request/scheduled', methods=['GET'])
def get_provider_scheduled_requests(providerId):
    provider = Provider.query.get(providerId)
    offers = Offer.query.filter((Offer.provider_id==providerId) & (Offer.status == "approved") ).join(Request, Offer.request_id==Request.id)\
            .filter(Request.status=='scheduled').all()
    result = []
    for offer in offers:
        request_item = Request.query.get(offer.request_id)
        hospital = Hospital.query.get(request_item.hospital_id)
        print("AMBULANCEID: ")
        print(offer.ambulance_id)
        ambulance = Ambulance.query.get(offer.ambulance_id)
        driver = Driver.query.get(offer.driver_id)
        patient = Patient.query.get(request_item.patient_id)
        offer_data = {
            'id': request_item.id,
            'ambulance_type': request_item.ambulance_type,
            'origin_name': hospital.name,
            'origin_address': hospital.address,
            'destination_name': request_item.destination_name,
            'destination_address': request_item.destination_address,
            'description': request_item.description,
            'transference_time': request_item.transference_time,
            'created': request_item.created,
            'responsible_name': request_item.responsible_name,
            'responsible_phone': request_item.responsible_phone,
            'patient_name': patient.name,
            'patient_age': patient.age,
            'patient_gender': patient.gender,
            'patient_clinical_condition': patient.clinical_condition,
            'patient_phone': patient.phone,
            'patient_observations': patient.observations,
            'provider_name': provider.name,
            'price': offer.price,
            'driver_name': driver.name,
            'ambulance_model': ambulance.factory_model,
            'ambulance_license_plate': ambulance.license_plate
        }
        result.append(offer_data)

    return jsonify(result)

# Get ongoing requests from the provider
@app.route('/provider/<int:providerId>/request/ongoing', methods=['GET'])
def get_provider_ongoing_requests(providerId):
    provider = Provider.query.get(providerId)
    offers = Offer.query.filter((Offer.provider_id==providerId) & (Offer.status == "approved")).join(Request, Offer.request_id==Request.id)\
            .filter((Request.status=='ongoing') | (Request.status=='patient_collected')).all()
    result = []
    for offer in offers:
        request_item = Request.query.get(offer.request_id)
        hospital = Hospital.query.get(request_item.hospital_id)
        ambulance = Ambulance.query.get(offer.ambulance_id)
        driver = Driver.query.get(offer.driver_id)
        patient = Patient.query.get(request_item.patient_id)
        request_data = {
            'id': request_item.id,
            'ambulance_type': request_item.ambulance_type,
            'origin_name': hospital.name,
            'origin_address': hospital.address,
            'destination_name': request_item.destination_name,
            'destination_address': request_item.destination_address,
            'description': request_item.description,
            'transference_time': request_item.transference_time,
            'created': request_item.created,
            'responsible_name': request_item.responsible_name,
            'responsible_phone': request_item.responsible_phone,
            'patient_name': patient.name,
            'patient_age': patient.age,
            'patient_gender': patient.gender,
            'patient_clinical_condition': patient.clinical_condition,
            'patient_phone': patient.phone,
            'patient_observations': patient.observations,
            'provider_name': provider.name,
            'price': offer.price,
            'driver_name': driver.name,
            'ambulance_model': ambulance.factory_model,
            'ambulance_license_plate': ambulance.license_plate,
            'status': request_item.status
        }
        result.append(request_data)

    return jsonify(result)

# Conclude a request
@app.route('/provider/<int:providerId>/request/<int:requestId>/<newStatus>', methods=['PATCH'])
def set_request_concluded(providerId, requestId, newStatus):
    request = Request.query.get(requestId)
    if (request):
        request.status = newStatus
        db.session.commit()
        return Response(status=200)

    return Response(status=400)

# Get concluded requests from the provider
@app.route('/provider/<int:providerId>/request/concluded', methods=['GET'])
def get_provider_concluded_requests(providerId):
    provider = Provider.query.get(providerId)
    offers = Offer.query.filter(Offer.provider_id==providerId).join(Request, Offer.request_id==Request.id)\
            .filter(Request.status=='finished').all()
    result = []
    for offer in offers:
        request_item = Request.query.get(offer.request_id)
        hospital = Hospital.query.get(request_item.hospital_id)
        driver = Driver.query.get(offer.driver_id)
        patient = Patient.query.get(request_item.patient_id)
        ambulance = Ambulance.query.get(offer.ambulance_id)
        if ambulance:
            request_data = {
                'id': request_item.id,
                'ambulance_type': request_item.ambulance_type,
                'origin_name': hospital.name,
                'origin_address': hospital.address,
                'destination_name': request_item.destination_name,
                'destination_address': request_item.destination_address,
                'description': request_item.description,
                'transference_time': request_item.transference_time,
                'created': request_item.created,
                'responsible_name': request_item.responsible_name,
                'responsible_phone': request_item.responsible_phone,
                'patient_name': patient.name,
                'patient_age': patient.age,
                'patient_gender': patient.gender,
                'patient_clinical_condition': patient.clinical_condition,
                'patient_phone': patient.phone,
                'patient_observations': patient.observations,
                'provider_name': provider.name,
                'price': offer.price,
                'driver_name': driver.name,
                'ambulance_model': ambulance.factory_model,
                'ambulance_license_plate': ambulance.license_plate,
                'avaliation': request_item.avaliation
            }
            result.append(request_data)

    return jsonify(result)

# Get provider profile information    
@app.route('/provider/<int:providerId>/profile', methods=['GET'])
def get_provider_profile(providerId):
    provider = Provider.query.get(providerId)
    if(provider):
        provider_data = {
            'name': provider.name,
            'cnpj': provider.cnpj,
            'address': provider.address,
            'employee_name': provider.employee_name,
            'email': provider.email
        }

        return jsonify(provider_data)
    else:
        return Response(status=400)

@app.route("/register-provider", methods=["POST"])
def register_provider():
    return register_user(request, Provider)

@app.route("/login-hospital", methods=["POST"])
def login_hospital():
    return login_user(request, Hospital)

@app.route("/login-provider", methods=["POST"])
def login_provider():
    return login_user(request, Provider)

@app.route("/logout", methods=["POST"])
def logout_ambulance():
    clear_session()
    return "200"


####### NEW REQUESTS ######

# Create a new request


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")