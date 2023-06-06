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

@app.route("/@me")
def get_current_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    
    user = User.query.filter_by(id=user_id).first()
    return jsonify({
        "id": user.id,
        "email": user.email
    }) 

def add_user(user, new_user):
    user_exists = user.query.filter_by(email=new_user.email).first() is not None

    if user_exists:
        return jsonify({"error": "User already exists"}), 409

    db.session.add(new_user)
    db.session.commit()

    session["user_id"] = new_user.id

    return jsonify({
        "id": new_user.id,
    })
    

@app.route("/register-hospital", methods=["POST"])
def register_hospital():
    name = request.json["name"]
    cnpj = request.json["cnpj"]
    employee_name = request.json["employee_name"]
    address = request.json["address"]
    email = request.json["email"]
    password = request.json["password"]

    hashed_password = bcrypt.generate_password_hash(password)
    new_hospital = Hospital(name=name, cnpj=cnpj, employee_name=employee_name, address=address, email=email, password=hashed_password)
    return add_user(Hospital, new_hospital)

@app.route("/register-provider", methods=["POST"])
def register_provider():
    name = request.json["name"]
    cnpj = request.json["cnpj"]
    employee_name = request.json["employee_name"]
    address = request.json["address"]
    email = request.json["email"]
    password = request.json["password"]

    hashed_password = bcrypt.generate_password_hash(password)
    new_provider = Provider(name=name, cnpj=cnpj, employee_name=employee_name, address=address, email=email, password=hashed_password)
    return add_user(Provider, new_provider)

@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error": "Unauthorized"}), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401
    
    session["user_id"] = user.id

    return jsonify({
        "id": user.id,
        "email": user.email
    })

@app.route("/logout", methods=["POST"])
def logout_user():
    session.pop("user_id")
    return "200"

if __name__ == "__main__":
    app.run(debug=True)