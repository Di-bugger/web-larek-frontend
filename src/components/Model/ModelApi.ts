import { Api, ApiListResponse } from '../base/api';
import { IProductItem } from '../../types';


class ModelApi extends  Api{
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
}