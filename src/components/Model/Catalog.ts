import { IProductItem } from '../../types';
import { IEvents } from '../base/events';

interface IModelCatalog {
	productList: IProductItem[]
}

export class ModelCatalog implements IModelCatalog {
	protected _productList: IProductItem[]

	constructor(protected events: IEvents) {
		this._productList = []
	}

	get productList() {
		return this._productList
	}

	set productList(data: IProductItem[]) {
		this._productList = data
		this.events.emit('productList:changed')
	}
}