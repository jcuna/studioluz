
import {getIconElement} from "./utilities";

export default class FocalPoint {

  constructor(linkTop, headerSize) {
    this.linkTop = linkTop;
    this.headerSize = headerSize;
    this.haveArrows = [];
    this.IPE = document.querySelector("#panels-ipe-tray");
  }

  applyFocalPoint() {
    const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 1600);
    const groupLinks = document.querySelectorAll('.group-link');
    groupLinks.forEach((parent, i) => {
      let desiredHeight = h;
      if (i === 0) {
        desiredHeight = desiredHeight - this.headerSize;
        let grantParentSibling = parent.parentElement.previousElementSibling;
        if (grantParentSibling !== null) {
          let shortBackground = grantParentSibling.querySelector('.short-background');
          if (shortBackground !== null) {
            desiredHeight = desiredHeight - shortBackground.clientHeight;
          }
        }
      }
      if (desiredHeight < 500) {
        desiredHeight = 500;
      }

      this.centerImgs(parent, desiredHeight);
      this.centerText(parent, desiredHeight);
      if (i !== groupLinks.length -1) {
        this.addArrowLink(parent, h, i);
      }
    });
  }

  addArrowLink(node, desiredHeights, index) {
    if (this.haveArrows[index]) {
      return;
    }
    this.haveArrows[index] = true;
    const el = document.createElement('div');
    el.classList.add('scroll-anchor');
    el.classList.add('push-hover');
    el.innerHTML = getIconElement('caret-down-large-icon', 'scroll-arrow');
    el.addEventListener('click', e => {
      window.scrollBy({
        top: desiredHeights,
        left: 0,
        behavior: 'smooth'
      });
    });
    node.appendChild(el);
  }

  centerText(parent, desiredHeight) {
    let title = parent.querySelector('.link-title');
    let link = parent.querySelector('.luz-link a');
    title.style.top = `${desiredHeight * 0.4}px`;
    link.style.top = `${desiredHeight * 0.4 + this.linkTop}px`;
  }

  centerImgs(parent, desiredHeight) {
    let img = parent.querySelector('.group-link-image img');
    let center = parent.querySelector('.field--name-field-background-focus');
    if (center) {
      let [x, y] = center.innerText.split(':');
      parent.style.height = `${desiredHeight}px`;
      let top = ((desiredHeight - img.getAttribute('height')) / 2) + Number(y);
      let left = ((parent.clientWidth - img.getAttribute('width')) / 2) + Number(x);
      img.setAttribute('style', `top: ${top}px; left: ${left}px; position: relative;`);

    }
  }

  addFocalSelector() {
    let hid = false;

    let mutationObserver = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.target.classList.contains('ipe-form') && !hid) {
          let f = mutation.target.querySelector('.form-item-field-link-0-subform-field-background-focus-0-value');
          f.style.display = 'none';
          f.parentElement.insertBefore(this.selectorNode, f);
          hid = true;
        }
      });
    });

    mutationObserver.observe(this.IPE, {
      // attributes: true,
      // characterData: true,
      childList: true,
      subtree: true,
      // attributeOldValue: true,
      // characterDataOldValue: true
    });
  }

  get selectorNode() {
    const selector = document.createElement('div');
    selector.classList.add('focus-selector');
    selector.addEventListener('click', e => {
      const img = document.querySelector('.image-preview img');
      img.style.cursor = 'crosshair';
      img.addEventListener('click', function (e) {
        const input = document.querySelector('.form-item-field-link-0-subform-field-background-focus-0-value input');
        let x = e.pageX - img.offsetLeft - img.getAttribute('width');
        let y = e.pageY - img.offsetTop - img.getAttribute('height');
        input.value = `${Math.round(x/2)}:${Math.round(y/2)}`;
        img.style.cursor = 'initial';
        img.removeEventListener('click', this);
      });
    });
    return selector;
  }

  keepBinding(el, button) {
    const self = this;
    el.addEventListener('click', function (e) {
      el.removeEventListener('click', this);
      self.addFocalSelector();
      switch(button.getAttribute('data-tab-id')) {
        case 'manage_content':

      }
    });
  }

  findParentSibling(mainClass, siblingClass, callback) {
    document.querySelectorAll(mainClass).forEach(node => {
      let parent = node.parentElement;
      let nodes = Array.from(parent.children);
      let filtered = nodes.filter(el => el.classList.contains(siblingClass));
      if (filtered.length === 1) {
        callback(node, parent, filtered[0]);
      }
    });
  }
}
