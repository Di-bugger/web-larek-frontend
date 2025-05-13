import {IProductItem } from '../../types';

export interface IBasketModel {
	items: IProductItem[];
	totalPrice: number;
	addItem(item: IProductItem): void;
	removeItem(item: IProductItem): void;
	getCountItems(): number;
	clearBasket(): void
}

export class ModelBasket implements IBasketModel {
	 protected _items: IProductItem[] ;
	 protected _totalPrice: number;

	constructor() {
		this._items = []
	}

	get items() {
		return this._items;
	}

	set items(data: IProductItem[]) {
		this._items = data;
	}

	get totalPrice() {
		this._items.forEach(items => {
			this._totalPrice += items.price
		});
		return this._totalPrice;
	}

	addItem(item: IProductItem) {
		this._items = [...this._items, item];
	}

	removeItem(item: IProductItem) {
		this._items = this._items.filter((prod) => prod.id !== item.id);
	}

	getCountItems() {
		return this._items.length
	}

	clearBasket() {
		this.items = []
	}

}
