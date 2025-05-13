import { Card } from "./Card";
import { IProductItem } from "../../types";
import { IEvents } from "../base/events";

export interface ICardDetailed {
	description: HTMLElement;
	button: HTMLElement;
	render(data: IProductItem): HTMLElement;
}

export class CardDetailed extends Card implements ICardDetailed {
	description: HTMLElement;
	button: HTMLElement;

	constructor(template: HTMLTemplateElement, protected events: IEvents) {
		super(template);
		this.description = this._cardElement.querySelector('.card__text');
		this.button = this._cardElement.querySelector('.card__button');
		this.button.addEventListener('click', () => { this.events.emit('card:addToBasket') });
	}

	notForSale(data:IProductItem) {
		if(data.price) {
			return 'Купить'
		} else {
			this.button.setAttribute('disabled', 'true')
			return 'Не продается'
		}
	}

	render(data: IProductItem): HTMLElement {
		this._cardCategory.textContent = data.category;
		this.cardCategory = data.category;
		this._cardTitle.textContent = data.title;
		this._cardImage.src = data.image;
		this._cardImage.alt = this._cardTitle.textContent;
		this._cardPrice.textContent = this.setPrice(data.price);
		this.description.textContent = data.description;
		this.button.textContent = this.notForSale(data);
		return this._cardElement;
	}
}