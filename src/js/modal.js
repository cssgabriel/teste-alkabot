import clickOutside from "./clickOutside.js";
import { LoadContent } from "./loadContent.js";
import { renderPreloader } from "./views/preloadView.js";
import { API_URL, API_URL_USERS } from "./config.js";

export class Modal {
  _parentElements = document.querySelectorAll(".main__section--list-posts");
  _closest = ".main__section--post-question";
  _modal;
  _post = {
    id: "",
    postId: [],
    userId: [],
    comments: [],
  };

  handlerClick(e) {
    if (!e.target.closest(this._closest)) return;
    this.renderModalMarkup(e.target.closest(".main__section--list-item"));
    clickOutside(this._modal, ".modal");
  }

  generateMarkup(post) {
    const el = document.querySelector(".modal-overlay.active");
    if (!el) {
      try {
        const getData = async function (url) {
          const response = fetch(url);
          const data = await (await response).json();
          return data;
        };
        getData(`${API_URL}${post.dataset.postId}/comments`).then((res) => {
          this._post.id = post.dataset.id;
          this._post.comments.push(...res);
        });
        return `
          <div class="modal-overlay active" data-post-id="${post.dataset.postId}">
            <div class="modal">
              <div class="post-container">
                <ul class="main__section--list-posts flex">
                  ${post.outerHTML}
                </ul>
              </div>
              <div class="modal__post-content">
                <h2>Comentários</h2>
              </div>
              <button>Ler post completo</button>
              <div class="x-mark">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
          </div>
        `;
      } catch (err) {
        throw new Error(err);
      }
    }
  }

  generateMarkupComments() {
    this.generateUserMarkup();
    const parentElement = this._modal.querySelector(".modal__post-content");
    renderPreloader(parentElement);
    setTimeout(() => {
      this._post.comments.forEach((comment) => {
        const markup = `
          <ul class="modal__post-list">
            <li class="modal__post-item">
                <h3>${comment}</h3>
                <p>Company: ${comment}</p>
                <p>${comment.body}</p>
              </li>
          </ul>`;
        parentElement.insertAdjacentHTML("beforeend", markup);
      });
    }, 500);
    document.querySelector(".preloader")?.remove();
  }

  generateUserMarkup() {
    try {
      const getData = async function (url) {
        const response = fetch(url);
        const data = await (await response).json();
        return data;
      };
      getData(`${API_URL_USERS}${this._post.userId}`).then((res) => {
        // this._post.userId.push(...res);
        console.log(res);
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  renderModalMarkup(post) {
    const markupPost = this.generateMarkup(post);
    document.body.insertAdjacentHTML("beforeend", markupPost);
    this._modal = document.querySelector(".modal-overlay");
    this._modal.addEventListener("click", this.closeModal.bind(this));
    this.generateMarkupComments();
  }

  closeModal(e) {
    if (!e.target.closest(".x-mark")) return;
    this._modal.remove();
    this._post.comments = [];
    this._post.userId = [];
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
