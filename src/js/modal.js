import clickOutside from "./clickOutside.js";

export default class Modal {
  _parentElements;
  _modal;

  constructor(parentElement) {
    this._parentElements = document.querySelectorAll(parentElement);
    this._closest = parentElement;
  }

  handlerClick(e) {
    if (!e.target.closest(this._closest)) return;
    this.addModalMarkup();
    clickOutside(this._modal, ".modal");
  }

  generateMarkup() {
    const markup = `
      <div class="modal-overlay active">
        <div class="modal">
          <p>Clique para ver mais informações sobre o post.</p>
        </div>
      </div>
    `;
    return markup;
  }

  addModalMarkup() {
    document.body.insertAdjacentHTML("beforeend", this.generateMarkup());
    this._modal = document.querySelector(".modal-overlay");
  }

  _bind() {
    this.handlerClick = this.handlerClick.bind(this);
  }

  _addEvents() {
    this._parentElements.forEach((el) => {
      el.addEventListener("click", this.handlerClick);
    });
  }

  init() {
    if (this._parentElements) {
      this._bind();
      this._addEvents();
    }
    return this;
  }
}
