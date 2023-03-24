import LoadPosts from "./views/postsView.js";
import { Modal } from "./modal.js";
import { API_URL } from "./config.js";

const init = async function () {
  const loadPosts = new LoadPosts(".main__section--list-posts");
  const posts = await loadPosts.getContentAPI(`${API_URL}`);
  loadPosts.updateState(posts);
  loadPosts.renderPosts(loadPosts.handlerMarkupPost);
  const modal = new Modal().init();

  // modal.updatePost(loadPosts._generateMarkupPost(post));
};

init();
