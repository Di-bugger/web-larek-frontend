import { IEvents } from '../base/events';
import { createElement } from '../../utils/utils';


export interface IBasket {
	basket: HTMLElement;
	title: HTMLElement;
	basketList: HTMLElement;
	basketPrice: HTMLElement;
	OrderButton: HTMLButtonElement;
	IconBasketButton: HTMLButtonElement;
	IconCounterBasket: HTMLElement;
	renderCounterBasket(value: number): void;
	renderSumAllProducts(sumAll: number): void;
	render(): HTMLElement;
}

export class Basket implements IBasket {
	basket: HTMLElement;
	title: HTMLElement;
	basketList: HTMLElement;
	OrderButton: HTMLButtonElement;
	basketPrice: HTMLElement;
	IconBasketButton: HTMLButtonElement;
	IconCounterBasket: HTMLElement;

	constructor(template: HTMLTemplateElement, protected events: IEvents) {
		this.basket = template.content.querySelector('.basket').cloneNode(true) as HTMLElement;
		this.title = this.basket.querySelector('.modal__title');
		this.basketList = this.basket.querySelector('.basket__list');
		this.OrderButton = this.basket.querySelector('.basket__button');
		this.basketPrice = this.basket.querySelector('.basket__price');

		//для иконки корзины  в header
		this.IconBasketButton = document.querySelector('.header__basket');
		this.IconCounterBasket = document.querySelector('.header__basket-counter');

		this.OrderButton.addEventListener('click', () => { this.events.emit('order:open') });
		this.IconBasketButton.addEventListener('click', () => { this.events.emit('basket:open') });

		this.items = [];
	}

	set items(items: HTMLElement[]) {
		if (items.length) {
			this.basketList.replaceChildren(...items);
			this.OrderButton.removeAttribute('disabled');
		} else {
			this.OrderButton.setAttribute('disabled', 'disabled');
			this.basketList.replaceChildren(createElement<HTMLParagraphElement>('p', { textContent: 'Корзина пуста' }));
		}
	}

	renderCounterBasket(value: number) {
		this.IconCounterBasket.textContent = String(value);
	}

	renderSumAllProducts(sumAll: number) {
		this.basketPrice.textContent = String(sumAll + ' синапсов');
	}

	render() {
		this.title.textContent = 'Корзина';
		return this.basket;
	}
}