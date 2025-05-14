
export class PageModel {
	protected _pageWrapper: HTMLElement;

	constructor() {
		this._pageWrapper = document.querySelector('.page__wrapper');
	}

	set scrollLock(locked: boolean) {
		if (locked) {
			this._pageWrapper.classList.add('page__wrapper_locked');
		} else {
			this._pageWrapper.classList.remove('page__wrapper_locked');
		}
	}

}