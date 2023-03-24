export const renderPreloader = function (parentElement) {
  const spans = document.querySelectorAll(".preloader span");
  const markup = `
    <div class="preloader">
      <span></span>
      <span></span>
      <span></span>
    </div>
  `;
  parentElement.insertAdjacentHTML("beforeend", markup);
  spans.forEach((span, i) => {
    const preloader = setTimeout(() => {
      span.classList.add("entry");
    }, 250 * i);
  });

  // setTimeout(() => {
  //   const preloader = document.querySelector(".preloader");
  //   preloader.remove();
  // }, 10000);
};
