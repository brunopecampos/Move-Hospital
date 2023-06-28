export interface User {
  id: string;
  email: string;
  username: string;
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
  status?: "created" | "schedules" | "ongoing" | "finished"
  avaliation?: number
}

export interface Offer {
  id?: string;
  provider_name?: string;
  price: number;
  driver_name?: string;
  created?: Date;
  code?: string;
  ambulance_id?: string;
  driver_id?: string;
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