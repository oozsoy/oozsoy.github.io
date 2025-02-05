MathJax = {
  tex: {
    inlineMath: [
      ['$', '$'],
      ['\\(', '\\)']
    ],
    displayMath: [
      ['$$', '$$'],
      ['\\[', '\\]']
    ],
    processEscapes: true,
    processEnvironments: true,
    processRefs: true,
    tags: 'ams'
  }
};

document.addEventListener('turbolinks:load', function () {
  if (window.MathJax) {
    MathJax.typesetPromise();
  }
});
