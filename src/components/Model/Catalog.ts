import { IProductItem } from '../../types';
import { IEvents } from '../base/events';

interface IModelCatalog {
	productList: IProductItem[];
	selectedItems: IProductItem;
	setOpenCard(item: IProductItem): void;
}

export class ModelCatalog implements IModelCatalog {
	protected _productList: IProductItem[];
	selectedItems: IProductItem;

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

	setOpenCard(item: IProductItem) {
		this.selectedItems = item;
		this.events.emit('modalCard:open', item)
	}
}