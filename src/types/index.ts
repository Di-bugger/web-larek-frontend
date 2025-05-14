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

export interface IOrderDone {
	id: string;
	total: number;
}

