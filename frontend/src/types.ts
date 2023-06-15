export interface User {
  id: string;
  email: string;
  user_type: string;
}

export interface Offer {
  id: string;
  code: string
  price: number | null
  status: "created" | "ongoing" | "concluded"
  provider_id: string | null
  driver_id: string | null
  ambulance_id: string | null
}
