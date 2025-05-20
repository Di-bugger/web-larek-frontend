import { IActionClick, IProductItem } from '../../types';



export interface IBasketItem {
	basketItem: HTMLElement;
	index:HTMLElement;
	title: HTMLElement;
	price: HTMLElement;
	buttonDelete: HTMLButtonElement;

	render(data: IProductItem, item: number): HTMLElement;
}

export class BasketItem implements IBasketItem {
	basketItem: HTMLElement;
	title: HTMLElement;
	price: HTMLElement;
	index:HTMLElement;

	buttonDelete: HTMLButtonElement;

	constructor (template: HTMLTemplateElement, actionDelete: IActionClick) {
		this.basketItem = template.content.querySelector('.basket__item').cloneNode(true) as HTMLElement;
		this.title = this.basketItem.querySelector('.card__title');
		this.price = this.basketItem.querySelector('.card__price');
		this.index = this.basketItem.querySelector('.basket__item-index');

		this.buttonDelete = this.basketItem.querySelector('.basket__item-delete');

		if (actionDelete?.onClick) {
			this.buttonDelete.addEventListener('click', actionDelete.onClick);
		}

	}

	protected setPrice(value: number | null) {
		if (value === null) {
			return 'Бесценно'
		}
		return String(value) + ' синапсов'
	}

	render(data: IProductItem, item: number) {
		this.title.textContent = data.title;
		this.price.textContent = this.setPrice(data.price);
		this.index.textContent = String(item);

		return this.basketItem;
	}
}