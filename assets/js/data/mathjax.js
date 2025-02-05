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

function renderMath() {
  if (window.MathJax) {
    MathJax.typesetPromise();
  }
}

// Ensure MathJax runs on normal page load
document.addEventListener('DOMContentLoaded', renderMath);

// Ensure MathJax runs after navigating to a new page (for PJAX/Turbolinks support)
document.addEventListener('turbolinks:load', renderMath);
