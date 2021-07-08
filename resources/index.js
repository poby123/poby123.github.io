function pageScroll(y) {
  window.scrollBy(0, 1);
  scrollDelay = setTimeout(pageScroll, 10);
}

function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
  };
}

const contentSection = document.getElementsByClassName('content')[0];

const titleHeader = document.getElementById('title-header');
titleHeader.addEventListener('click', () => {
  console.log('titleHeader is clicked!');
  window.scroll(0, getOffset(contentSection).top);
});
