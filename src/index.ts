import './scss/styles.scss';
import { ensureElement } from './utils/utils';
import { EventEmitter } from './components/base/events';
import { API_URL, CDN_URL } from './utils/constants';
import {ModelApi} from './components/Model/ModelApi';
import { ModelCatalog } from './components/Model/Catalog';
import { ModelBasket } from './components/Model/Basket';
import { UserDataModel } from './components/Model/UserData';
import { Basket } from './components/View/Basket';
import { Modal } from './components/View/Modal';
import { Order } from './components/View/Order';
import { OrderContacts } from './components/View/OrderContacts';
import { IOrderForm, IOrderItems, IProductItem } from './types';
import { Card } from './components/View/Card';
import { CardDetailed } from './components/View/CardDetailed';
import { BasketItem } from './components/View/BasketItem';
import { Success } from './components/View/Success';
import { PageModel } from './components/View/Page';

//Templates
const catalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const previewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');

const modalContainer = ensureElement<HTMLElement>('#modal-container');
const cardContainer = ensureElement<HTMLElement>('.gallery');

const events = new EventEmitter();

//Модели данных
const apiModel = new ModelApi(API_URL,CDN_URL);
const dataModel =new ModelCatalog(events);
const basketModel = new ModelBasket();
const userDataModel = new UserDataModel(events);

//Модели представления
const basket = new Basket(basketTemplate, events);
const modal = new Modal(modalContainer, events);
const order = new Order(orderTemplate, events);
const orderContacts = new OrderContacts(contactsTemplate, events);
const page = new PageModel()


//Рендер карточек на странице
events.on('productList:changed', () => {
	dataModel.productList.forEach(item => {
		const card = new Card(catalogTemplate, { onClick: () => events.emit('card:select', item) });
		cardContainer.append(card.render(item));
	})
})

// Определение карточки по которой кликнули
events.on('card:select', (item: IProductItem) => { dataModel.setOpenCard(item) });

//Открытие выбранной карточки
events.on('modalCard:open', (item: IProductItem) => {
	const cardDetailed = new CardDetailed(previewTemplate, events)

	const isInBasket = Boolean(basketModel.items.find(i => i.id === item.id));
	console.log(isInBasket);
	cardDetailed.isInBasket(isInBasket);

	modal.content = cardDetailed.render(item);
	modal.render();
});

//Добавление карточки товара в корзину
events.on('card:addToBasket', () => {
	basketModel.addItem(dataModel.selectedItems);
	console.log(dataModel.selectedItems.id);
	basket.renderCounterBasket(basketModel.getCountItems());
	modal.close();
});

// Возвращаем отрендеренный контент
function renderBasketContent() {
	let i = 0;
	basket.items = basketModel.items.map((item) => {
		const basketItem = new BasketItem(cardBasketTemplate, { onClick: () => events.emit('card:deleteFromBasket', item) });
		i = i + 1;
		return basketItem.render(item, i);
	});
	return basket.render();
}

// Обновляем данные корзины
function updateBasketData() {
	basket.renderCounterBasket(basketModel.getCountItems());
	basket.renderSumAllProducts(basketModel.getTotalPrice());
}

// Открываем модальное окно с отрендеренным контентом
function openBasketModal() {
	modal.content = renderBasketContent();
	modal.render();
}

//Открытие корзины
events.on('basket:open', () => {
	updateBasketData();
	openBasketModal();
});

//удаление карточки из корзины
events.on('card:deleteFromBasket', (item: IProductItem) => {
	basketModel.removeItem(item);
	updateBasketData();
	openBasketModal();
});

//Открытие окна заказа
events.on('order:open', () => {
	modal.content = order.render();
	modal.render();
});

//Открытие окна выбора способа оплаты и доставки
events.on('order:paymentSelection', (button: HTMLButtonElement) => {
	userDataModel.typeCost = button.name
})

//Открытие окна заполнения данных email и phone
events.on('userinfo:open', () => {
	modal.content = orderContacts.render();
	modal.render();
});

//открытие успешного заказа
events.on('success:open', () => {
	userDataModel.totalCost = basketModel.getTotalPrice();
	const userData = userDataModel.getOrder();
	// Получаем товары из корзины
	const items = basketModel.items;

	// Преобразуем массив товаров в массив ID
	const itemsId = items.map(item => item.id); // Предполагаем, что у каждого товара есть свойство id

	// Создаем объект заказа, объединяя данные пользователя и ID товаров, для передачи в аргумент функции
	const orderData: IOrderItems = {
		...userData, // Копируем данные пользователя
		items: itemsId // Добавляем ID товаров из корзины
	};
	console.log(orderData)

	apiModel.postOrder(orderData)
		.then((data) => {
			console.log(data);
			const success = new Success(successTemplate, events);
			modal.content = success.render(basketModel.getTotalPrice());
			basketModel.clearBasket();
			basket.renderCounterBasket(basketModel.getCountItems());
			modal.render();
		})
		.catch(error => console.log(error));
});

//закрытие успешного заказа
events.on('success:close', () => modal.close());

//отслеживания изменения в полях
events.on(`order:changeAddress`, (data: { field: string, value: string }) => {
	userDataModel.addAddress(data.field, data.value);
	console.log(userDataModel.address)
});

//Ошибка при вводе некорректного адресса
events.on('formErrors:address', (errors: Partial<IOrderForm>) => {
	const { address, payment } = errors;
	order.activeButton = !address && !payment;
	order.formErrors.textContent = Object.values({address, payment}).filter(i => !!i).join('; ');
})

//отслеживания изменения в полях
events.on(`userinfo:changeContacts`, (data: { field: string, value: string }) => {
	userDataModel.addInfoUser(data.field, data.value);
});

events.on('formErrors:change', (errors: Partial<IOrderForm>) => {
	const { email, phone } = errors;
	orderContacts.activeButton = !email && !phone;
	orderContacts.formErrors.textContent = Object.values({phone, email}).filter(i => !!i).join('; ');
})


events.on('modal:open', () => {
	page.scrollLock = true;
});


events.on('modal:close', () => {
	page.scrollLock = false;
});

apiModel.getProductList()
	.then(function (data: IProductItem[]) {
		dataModel.productList = data;
	})
	.catch(error => console.log(error))



