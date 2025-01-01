// app/types.ts
export interface OrderItem {
  productName: string;
  color: string;
  quantity: number;
  price: number;
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
}

export interface OrderData {
  customerInfo: CustomerInfo;
  orderItems: OrderItem[];
}

export interface ApiResponse {
  message: string;
  orderId?: string;
  status: 'success' | 'error';
  details?: string;
}
