
export const getIconElement = function (type, classes) {
  return '<svg class="' + classes + ' svg-icon" viewBox="0 0 48 23"><use ' +
  'xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/themes/studioluz/assets/ui.svg#' + `${type}">` +
  '</use></svg>';
};
