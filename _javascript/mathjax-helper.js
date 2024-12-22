document.addEventListener('DOMContentLoaded', () => {
  if (typeof MathJax !== 'undefined') {
    MathJax.typesetPromise().catch((err) => console.error(err));
  }
});
