from flask import Flask, request, jsonify, session
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from flask_session import Session
from config import ApplicationConfig
from models import db, Hospital, Provider, User

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

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")