export interface Ticket {
  id: Date | string | number;
  createdAt: Date;
  name: string;
  email: string;
  product: string;
  description: string;
  status: string;
}
