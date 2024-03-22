const openLinkInNewWindow = (url) => {
  window.open(url, '_blank');
};

const openLinkInCurrentWindow = (url) => {
  window.location.href = url;
}

export {openLinkInNewWindow, openLinkInCurrentWindow};
