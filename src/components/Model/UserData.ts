import { IEvents } from '../base/events';
import { FormErrors } from '../../types';

export interface IUserData {
	email: string;
	phone: string;
	address: string;
	typeCost: string;
	totalCost: number;
	addAddress(field: string, value: string): void;
	addInfoUser(data: string, value: string): void;
	validateOrder(): boolean;
	validateContacts(): boolean;
	getOrder(): object;
}

export class UserDataModel implements IUserData {
	email: string;
	phone: string;
	address: string;
	typeCost: string;
	totalCost: number;
	formErrors: FormErrors = {};

	constructor(protected events: IEvents) {
		this.email = '';
		this.phone = '';
		this.address = '';
		this.typeCost = '';
		this.totalCost = 0;
	}

	addAddress(field: string, value: string) {
		if (field === 'address') {
			this.address = value;
		}

		if (this.validateOrder()) {
			this.events.emit('order:ready', this.getOrder());
		}
	}

	addInfoUser(data: string, value: string) {
		if (data === 'email') {
			this.email = value
		} else if (data === 'phone') {
			this.phone = value
		}

		if (this.validateContacts()) {
			this.events.emit('order:ready', this.getOrder());
		}
	}

//Валидация
	validateOrder() {
		const regexp = /^[а-яА-ЯёЁa-zA-Z0-9\s/.,-]{5,}$/;
		const errors: typeof this.formErrors = {};

		if (!this.address) {
			errors.address = 'Необходимо указать адрес';
		} else if (!regexp.test(this.address)) {
			errors.address = 'Укажите настоящий адрес';
		}

		if (!this.typeCost) {
			errors.payment = 'Выберите способ оплаты';
		}

		this.formErrors = errors;
		this.events.emit('formErrors:address', this.formErrors); // Отправляем общее событие об ошибках
		return Object.keys(errors).length === 0;
	}

	validateContacts() {
		const regexpEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
		const regexpPhone = /^((8|\+7)[- ]?)?(\(\d{3}\)[- ]?)?[\d- ]{10}$/;

		const errors: typeof this.formErrors = {};

		if (!this.email) {
			errors.email = 'Необходимо указать email';
		} else if (!regexpEmail.test(this.email)) {
			errors.email = 'Некорректный адрес электронной почты';
		}

		if (!this.phone) {
			errors.phone = 'Необходимо указать телефон';
		} else {
			const cleanedPhone = this.phone.replace(/\D/g, '');

			if (cleanedPhone.startsWith('8')) {
				this.phone = '+7' + cleanedPhone.slice(1);
			} else if (cleanedPhone.startsWith('7')) {
				this.phone = '+' + cleanedPhone;
			} else if (!cleanedPhone.startsWith('+7')) {
				this.phone = '+7' + cleanedPhone;
			} else {
				this.phone = cleanedPhone;
			}

			if (!regexpPhone.test(this.phone)) {
				errors.phone = 'Некорректный формат номера телефона';
			}
		}

		this.formErrors = errors;
		this.events.emit('formErrors:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}


	getOrder() {
		return {
			email: this.email,
			phone: this.phone,
			address: this.address,
			payment: this.typeCost,
			total: this.totalCost,
		}
	}
}