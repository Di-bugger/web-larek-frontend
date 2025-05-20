import { Api, ApiListResponse } from '../base/api';
import { IOrderDone, IOrderItems, IProductItem } from '../../types';


export class ModelApi extends  Api{
	cdn: string;
	items: IProductItem[]

	constructor(baseUrl: string, cdn: string, option?: RequestInit) {
		super(baseUrl, option);

		this.cdn = cdn
	}

	getProductList(): Promise<IProductItem[]> {
		return this.get('/product').then((data: ApiListResponse<IProductItem>) =>
			data.items.map((item) => ({
				...item, image: this.cdn + item.image
			}))
		)
	}

	postOrder(order: IOrderItems): Promise<IOrderDone> {
		return this.post(`/order`, order).then((data: IOrderDone) => data);
	}
}