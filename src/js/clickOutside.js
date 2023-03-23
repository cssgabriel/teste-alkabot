export default function clickOutside(element, outside) {
  element.addEventListener("click", function (e) {
    if (e.target?.closest(outside)) return;
    e.target.classList.toggle("active");
    e.target.remove();
  });
}
