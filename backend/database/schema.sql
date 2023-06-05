DROP TABLE IF EXISTS posts;

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
    gender TEXT CHECK (name IN ('Masc', 'Fem', 'Other')) NOT NULL,
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
    status TEXT CHECK (name IN ('created', 'offer_accepted', 'started', 'passanger_on_board', 'finished')) NOT NULL DEFAULT 'created',
    hospital_id INTEGER NOT NULL,
    patient_id INTEGER NOT NULL,
    offer_id INTEGER
);

CREATE TABLE posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    title TEXT NOT NULL,
    content TEXT NOT NULL
);
