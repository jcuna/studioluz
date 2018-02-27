
import emitter from './Emitter';
import {getIconElement} from "./utilities";

class FocalPoint {
  static applyFocalPoint() {
    const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 1600);
    const groupLinks = document.querySelectorAll('.group-link');
    groupLinks.forEach((parent, i) => {
      let desiredHeight = h;
      if (i === 0) {
        desiredHeight = desiredHeight - FocalPoint.headerSize;
        let grantParentSibling = parent.parentElement.previousElementSibling;
        let shortBackground = grantParentSibling.querySelector('.short-background');
        if (grantParentSibling !== null && shortBackground !== null) {
          desiredHeight = desiredHeight - shortBackground.clientHeight;
        }
      }
      if (desiredHeight < 500) {
        desiredHeight = 500;
      }

      FocalPoint.centerImgs(parent, desiredHeight);
      FocalPoint.centerText(parent, desiredHeight);
      if (i !== groupLinks.length -1) {
        FocalPoint.addArrowLink(parent, h);
      }
    });
  }

  static addArrowLink(node, desiredHeights) {
    const el = document.createElement('div');
    el.classList.add('scroll-anchor');
    el.classList.add('push-hover');
    el.innerHTML = getIconElement('caret-down-large-icon', 'scroll-arrow');
    console.log(node.nextElementSibling)
    el.addEventListener('click', e => {
      window.scrollBy({
        top: desiredHeights, // could be negative value
        left: 0,
        behavior: 'smooth'
      });
    });
    node.appendChild(el);
  }

  static centerText(parent, desiredHeight) {
    let title = parent.querySelector('.link-title');
    let link = parent.querySelector('.luz-link a');
    title.style.top = `${desiredHeight * 0.4}px`;
    link.style.top = `${desiredHeight * 0.4 + FocalPoint.linkTop}px`;
  }

  static centerImgs(parent, desiredHeight) {
    let img = parent.querySelector('.group-link-image img');
    parent.style.height = `${desiredHeight}px`;
    let top = (desiredHeight - img.getAttribute('height'))/2;
    let left = (parent.clientWidth - img.getAttribute('width'))/2;
    img.setAttribute('style', `top: ${top}px; left: ${left}px; position: relative;`);
  }

  static findParentSibling(mainClass, siblingClass, callback) {
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

FocalPoint.linkTop = 80;
FocalPoint.headerSize = 122;

FocalPoint.applyFocalPoint();
emitter.bind(['resize', 'orientationChange'], FocalPoint.applyFocalPoint);
