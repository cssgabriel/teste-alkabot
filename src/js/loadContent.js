export class LoadContent {
  _parentElement;
  state = {
    posts: [],
    i: 0,
  };

  getContentAPI(url) {
    try {
      const getData = async function () {
        const response = fetch(url);
        const data = await (await response).json();
        return data;
      };
      return getData(url);
    } catch (err) {
      throw new Error(err);
    }
  }

  _generateMarkupPost(post) {
    return `
      <li class="main__section--list-item flex" data-post-id="${post.id}">
        <article class="main__section--post">
          <div class="main__section--post-img">
            <img src="" alt="" />
          </div>
          <div class="main__section--post-content">
            <h2>${post.title}</h2>
            <p>${post.body}</p>
          </div>
          <div
            class="main__section--post-question"
            title="Clique para mais informações"
          >
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
                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
              />
            </svg>
          </div>
        </article>
      </li>
    `;
  }

  handlerMarkupPost() {
    const postSliced = this.state.posts.slice(this.state.i, this.state.i + 6);
    const arrMarkupPosts = postSliced.map(this._generateMarkupPost);
    this.state.i += 6;
    return arrMarkupPosts;
  }
}
