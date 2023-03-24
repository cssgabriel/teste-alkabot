import { LoadContent } from "../loadContent.js";
import { API_URL } from "../config.js";

export default class LoadPosts extends LoadContent {
  constructor(selectorParentElement) {
    super();
    this._parentElement = document.querySelector(selectorParentElement);
  }

  updateState(posts) {
    this.state.posts.push(...posts);
  }

  renderPosts() {
    const posts = this.handlerMarkupPost();
    posts.forEach((post) =>
      this._parentElement.insertAdjacentHTML("beforeend", post)
    );
  }
}
