{%- comment -%}
  See: <https://docs.mathjax.org/en/latest/options/input/tex.html#tex-options>
{%- endcomment -%}


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
    processEscapes: true,      // use \$ to produce a literal dollar sign
    processEnvironments: true, // process \begin{xxx}...\end{xxx} outside math mode
    processRefs: true, 
    tags: 'all',
    baseURL:                   // URL for use with links to tags (when there is a <base> tag in effect)
        (document.getElementsByTagName('base').length === 0) ?
          '' : (String(document.location).replace(/#.*$/, ''))
  },
  svg: {
    fontCache: 'global',
  },
};