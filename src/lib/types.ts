export interface RSVPSubmission {
  id: string;
  name: string;
  phone: string;
  email: string;
  attending: boolean;
  bringingGuest: boolean;
  guestName?: string;
  guestPhone?: string;
  guestEmail?: string;
  message?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RSVPFormData {
  name: string;
  phone: string;
  email: string;
  attending: boolean;
  bringingGuest: boolean;
  guestName: string;
  guestPhone: string;
  guestEmail: string;
  message: string;
}
