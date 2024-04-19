const loader = document.querySelector('#loader');

window.addEventListener('load', () => {
  setTimeout(() => {
    const header = document.querySelector('#header');
    const pageContent = document.querySelector('#page-content');
    loader.classList.add('hidden');
    pageContent.classList.remove('hidden');
    header.classList.remove('hidden');
  }, 3000); // 3 seconds delay (3000 milliseconds)
});
