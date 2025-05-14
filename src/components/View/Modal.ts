import { IEvents } from '../base/events';


export interface IModal {
	open(): void;
	close(): void;
	render(): HTMLElement
}

export class Modal implements IModal {
	protected modal: HTMLElement;
	protected closeButton: HTMLButtonElement;
	protected _modalContent: HTMLElement;

	constructor(modalContainer: HTMLElement, protected events: IEvents) {
		this.modal = modalContainer;
		this.closeButton = modalContainer.querySelector('.modal__close');
		this._modalContent = modalContainer.querySelector('.modal__content');

		this.closeButton.addEventListener('click', this.close.bind(this));
		this.modal.addEventListener('click', this.close.bind(this));
		this.modal.querySelector('.modal__container').addEventListener('click', event => event.stopPropagation());
	}

	set content(element: HTMLElement) {
		this._modalContent.replaceChildren(element);
	}

	open() {
		this.modal.classList.add('modal_active');
		this.events.emit('modal:open');
	}

	close() {
		this.modal.classList.remove('modal_active');
		this.content = null;
		this.events.emit('modal:close');
	}

	render(): HTMLElement {
		this.open();

		return this.modal;
	}
}