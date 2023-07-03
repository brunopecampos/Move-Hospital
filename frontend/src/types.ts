export interface User {
  id: string;
  email: string;
  name: string;
  user_type: string;
}

export interface Request {
  id?: string;
  ambulance_type: string;
	origin_name: string,
	origin_address: string,
  destination_address: string;
  destination_name: string;
  description: string;
  transference_time: Date;
  created: Date;
  responsible_name: string;
  responsible_phone: string;
	patient_name: string,
	patient_age: number,
	patient_gender: string,
	patient_clinical_condition: string,
	patient_phone: string,
	patient_observations: string,
  provider_name?: string,
  price?: number,
  driver_name?: string,
  ambulance_model?: string,
  ambulance_license_plate?: string,
  status?: "pending" | "expired" | "scheduled" | "canceled" | "ongoing" | "patient_collected" | "finished"
  avaliation?: number
}

export interface Offer {
  id?: string;
  hospital_name?: string;
  ambulance_license_place?: string;
  ambulance_model?: string;
  price: number;
  created?: Date;
  code?: string;
	origin_address?: string,
	destination_address?: string
	transference_time?: Date,
  driver_name?: string;
	ambulance_id?: string;
  status?: "created" | "scheduled" | "ongoing" | "finished"
}

export interface Ambulance {
  id: string;
  factory_model: string;
  licence_plate: string;
  ambulance_type: string;
}

export interface Driver {
  id?: string;
  name: string;
  cpf: string;
}

export interface Hospital {
	name: string,
	cnpj: string,
	address: string,
	employee_name: string,
	email: string
}

export interface Provider {
	name: string,
	cnpj: string,
	address: string,
	employee_name: string,
	email: string
}