import './scss/styles.scss';
import { cloneTemplate, createElement, ensureElement } from './utils/utils';
import { EventEmitter } from './components/base/events';

//Templates
const catalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const previewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');

const events = new EventEmitter();



