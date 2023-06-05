DROP TABLE IF EXISTS hospital;
DROP TABLE IF EXISTS patient;
DROP TABLE IF EXISTS request;
DROP TABLE IF EXISTS provider;
DROP TABLE IF EXISTS driver;
DROP TABLE IF EXISTS ambulance;
DROP TABLE IF EXISTS offer;

CREATE TABLE hospital(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    cnpj VARCHAR(14) UNIQUE NOT NULL,
    employee_name TEXT NOT NULL,
    address TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE patient(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER NOT NULL,
    gender TEXT CHECK (gender IN ('Masc', 'Fem', 'Other')) NOT NULL,
    clinical_condition TEXT NOT NULL,
    phone TEXT NOT NULL,
    observations TEXT NOT NULL
);

CREATE TABLE request(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL,
    ambulance_type TEXT NOT NULL,
    responsible_name TEXT NOT NULL,
    responsible_phone TEXT NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    transference_time TIMESTAMP NOT NULL,
    destination_address TEXT NOT NULL,
    destination_name TEXT NOT NULL,
    status TEXT CHECK (status IN ('created', 'offer_accepted', 'started', 'passanger_on_board', 'finished')) NOT NULL DEFAULT 'created',
    hospital_id INTEGER NOT NULL,
    patient_id INTEGER NOT NULL,
    offer_id INTEGER
);

CREATE TABLE provider(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    cnpj TEXT NOT NULL,
    address TEXT NOT NULL,
    employee_name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE ambulance(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    factory_model TEXT NOT NULL,
    license_plate TEXT NOT NULL,
    ambulance_type TEXT NOT NULL,
    provider_id INTEGER NOT NULL
);

CREATE TABLE driver(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    cpf VARCHAR(11) NOT NULL,
    provider_id INTEGER NOT NULL
);

CREATE TABLE offer(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT NOT NULL,
    price REAL,
    status TEXT CHECK (status IN ('sended', 'accepted', 'declined')) NOT NULL,
    provider_id INTEGER NOT NULL,
    driver_id INTEGER NOT NULL,
    ambulance_id INTEGER NOT NULL
);

