export interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
}

export interface OrderItem extends MenuItem {
  quantity: number;
}