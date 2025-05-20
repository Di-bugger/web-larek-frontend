export interface IProductItem {
	id: string;
	title: string;
	description: string;
	image: string;
	category: string;
	price: number | null;
}

export interface IOrderItems{
	payment: string;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];
}

export interface IOrderForm {
	payment?: string;
	address?: string;
	phone?: string;
	email?: string;
	total?: string | number;
}

export interface IOrderDone {
	id: string;
	total: number;
}

export interface IActionClick {
	onClick: (event: MouseEvent) => void;
}

export interface IOrder extends IOrderForm {
	items: string[];
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;

