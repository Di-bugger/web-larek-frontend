import { IEvents } from '../base/events';


export interface IOrder {
	formOrder: HTMLFormElement;
	buttonAll: HTMLButtonElement[];
	formErrors: HTMLElement;
	paySelect: string;
	render(): HTMLElement;
}

export class Order implements IOrder {
	formOrder: HTMLFormElement;
	formErrors: HTMLElement;
	buttonAll: HTMLButtonElement[];
	buttonSubmit: HTMLButtonElement;

	constructor(template: HTMLTemplateElement, protected events: IEvents) {
		this.formOrder = template.content.querySelector('.form').cloneNode(true) as HTMLFormElement;
		this.formErrors = this.formOrder.querySelector('.form__errors');
		this.buttonAll = Array.from(this.formOrder.querySelectorAll('.button_alt'));
		this.buttonSubmit = this.formOrder.querySelector('.order__button');

		this.buttonAll.forEach(item => {
			item.addEventListener('click', () => {
				this.paySelect = item.name;
				events.emit('order:paymentSelection', item);
			});
		});

		this.formOrder.addEventListener('input', (event: Event) => {
			const target = event.target as HTMLInputElement;
			const field = target.name;
			const value = target.value;
			this.events.emit(`order:changeAddress`,{ field, value });
		});

		this.formOrder.addEventListener('submit', (event: Event) => {
			event.preventDefault();
			this.events.emit('userinfo:open');
		});
	}

	set paySelect(payMethod: string) {
		this.buttonAll.forEach(item => {
			item.classList.toggle('button_alt-active', item.name === payMethod);
		})
	}

	set activeButton(value: boolean) {
		this.buttonSubmit.disabled = !value;
	}


	render() {
		return this.formOrder
	}
}