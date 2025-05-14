import { IEvents } from '../base/events';
import { createElement } from '../../utils/utils';


export interface IBasket {
	basket: HTMLElement;
	title: HTMLElement;
	basketList: HTMLElement;
	basketPrice: HTMLElement;
	orderButton: HTMLButtonElement;
	iconBasketButton: HTMLButtonElement;
	iconCounterBasket: HTMLElement;
	renderCounterBasket(value: number): void;
	renderSumAllProducts(sumAll: number): void;
	render(): HTMLElement;
}

export class Basket implements IBasket {
	basket: HTMLElement;
	title: HTMLElement;
	basketList: HTMLElement;
	orderButton: HTMLButtonElement;
	basketPrice: HTMLElement;
	iconBasketButton: HTMLButtonElement;
	iconCounterBasket: HTMLElement;

	constructor(template: HTMLTemplateElement, protected events: IEvents) {
		this.basket = template.content.querySelector('.basket').cloneNode(true) as HTMLElement;
		this.title = this.basket.querySelector('.modal__title');
		this.basketList = this.basket.querySelector('.basket__list');
		this.orderButton = this.basket.querySelector('.basket__button');
		this.basketPrice = this.basket.querySelector('.basket__price');

		//для иконки корзины  в header
		this.iconBasketButton = document.querySelector('.header__basket');
		this.iconCounterBasket = document.querySelector('.header__basket-counter');

		this.orderButton.addEventListener('click', () => { this.events.emit('order:open') });
		this.iconBasketButton.addEventListener('click', () => { this.events.emit('basket:open') });

		this.items = [];
	}

	set items(items: HTMLElement[]) {
		if (items.length) {
			this.basketList.replaceChildren(...items);
			this.orderButton.removeAttribute('disabled');
		} else {
			this.orderButton.setAttribute('disabled', 'disabled');
			this.basketList.replaceChildren(createElement<HTMLParagraphElement>('p', { textContent: 'Корзина пуста' }));
		}
	}

	renderCounterBasket(value: number) {
		this.iconCounterBasket.textContent = String(value);
	}

	renderSumAllProducts(sumAll: number) {
		this.basketPrice.textContent = String(sumAll + ' синапсов');
	}

	render() {
		this.title.textContent = 'Корзина';
		return this.basket;
	}
}