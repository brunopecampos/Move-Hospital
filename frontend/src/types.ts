export interface User {
  id: string;
  email: string;
  user_type: string;
}

export interface Request {
  id?: string;
  description: string;
  ambulance_type: string;
  responsible_name: string;
  responsible_phone: string;
  created: Date;
  transference_time: Date;
  destination_address: string;
  destination_name: string;
  status: "created" | "schedules" | "ongoing" | "finished"
  hospital_id: string,
  patient_id?: string,
  offer_id?: string
}

export interface Offer {
  id?: string;
  code: string
  price: number
  status: "created" | "scheduled" | "ongoing" | "finished"
  provider_id: string | null
  driver_id: string | null
  ambulance_id: string | null
}

export interface Patient {
  id?: string;
  name: string;
  age: number;
  gender: string;
  clinical_condition: string;
  phone: string;
  observations: string;
}
