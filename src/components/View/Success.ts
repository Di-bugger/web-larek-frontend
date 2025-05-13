import { IEvents } from "../base/events";

export interface ISuccess {
	successContent: HTMLElement;
	description: HTMLElement;
	button: HTMLButtonElement;
	render(total: number): HTMLElement;
}

export class Success implements ISuccess{
	successContent: HTMLElement;
	description: HTMLElement;
	button: HTMLButtonElement;

	constructor(template: HTMLTemplateElement, protected events: IEvents) {
		this.successContent = template.content.querySelector('.order-success').cloneNode(true) as HTMLElement;
		this.description = this.successContent.querySelector('.order-success__description');
		this.button = this.successContent.querySelector('.order-success__close');

		this.button.addEventListener('click', () => { events.emit('success:close') });
	}

	render(total: number) {
		this.description.textContent = String(`Списано ${total} синапсов`);
		return this.successContent
	}
}