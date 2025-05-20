import {IProductItem } from '../../types';

export interface IBasketModel {
	items: IProductItem[];
	addItem(item: IProductItem): void;
	removeItem(item: IProductItem): void;
	getTotalPrice(): number;
	getCountItems(): number;
	clearBasket(): void
}

export class ModelBasket implements IBasketModel {
	 protected _items: IProductItem[] ;

	constructor() {
		this._items = []
	}

	get items() {
		return this._items;
	}

	set items(data: IProductItem[]) {
		this._items = data;
	}

	getTotalPrice() {
		let sum = 0;
		this._items.forEach(item => {
			sum += item.price;
		})
		return sum;
	}

	addItem(item: IProductItem) {
		const existingItem = this._items.find(i => i.id === item.id); // Ищем товар с таким же ID в корзине

		if (!existingItem) { // Если товара с таким ID нет, то добавляем
			this._items = [...this._items, item];
		}
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
