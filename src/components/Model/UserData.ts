import { IEvents } from '../base/events';

export interface IUserData {
	email: string;
	phone: string;
	address: string;
	typeCost: string;
	totalCost: number;
}

export class UserDataModel implements IUserData {
	email: string;
	phone: string;
	address: string;
	typeCost: string;
	totalCost: number;


	constructor(protected events: IEvents) {
		this.email = '';
		this.phone = '';
		this.address = '';
		this.typeCost = '';
		this.totalCost = 0;
	}

	addAddress(address: string) {
		this.address = address;
	}

	addInfoUser(data: string, value: string) {
		if (data === 'email') {
			this.email = value
		} else if (data === 'phone') {
			this.phone = value
		}
	}

	getOrder() {
		return {
			email: this.email,
			phone: this.phone,
			address: this.address,
			typeCost: this.typeCost,
			totalCost: this.totalCost,
		}
	}
}