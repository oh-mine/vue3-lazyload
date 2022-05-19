export function getScrollParent(el: Element) {
  let _parent = <Element>el.parentNode;

  while (_parent) {
    const styleOverflow = window.getComputedStyle(_parent)["overflow"];

    if (/(scroll)|(auto)/.test(styleOverflow)) {
      return _parent;
    }

    if (_parent.nodeName === "HTML") {
      return document;
    }

    _parent = <Element>_parent.parentNode;
  }
}

export function imgLoad(src: string) {
  return new Promise((resolve, reject) => {
    const oImg = new Image();
    oImg.src = src;
    oImg.onload = resolve;
    oImg.onerror = reject;
  });
}
