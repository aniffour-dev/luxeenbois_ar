// src/types/form.ts
export interface OrderFormData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    color: 'black' | 'white';
    quantity: number;
  }