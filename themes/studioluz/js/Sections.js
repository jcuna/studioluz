
class Sections {
  static applyFocalPoint() {
    Sections.findParentSibling('.focal-point', 'field--name-field-background-position', (main, parent, sibling) => {
      let pos =- Number(sibling.textContent);
      main.classList.add('right-3');
      main.classList.add('up-3');
      main.innerHTML = `<div>${main.innerHTML}</div>`;
      //main.setAttribute('style', `background-position-y: ${pos}px;`);
    });
  }

  static findParentSibling(mainClass, siblingClass, callback) {
    document.querySelectorAll(mainClass).forEach(function (node) {
      let parent = node.parentElement;
      let nodes = Array.from(parent.children);
      let filtered = nodes.filter(el => el.classList.contains(siblingClass));
      if (filtered.length === 1) {
        callback(node, parent, filtered[0]);
      }
    });
  }
}

Sections.applyFocalPoint();
