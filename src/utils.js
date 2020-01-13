const _ = {
  detectLeftButtonClick(event) {
    if ('button' in event) {
      return event.button === 0;
    }

    const button = event.which || event.button;
    return button === 0;
  },

  getCoordsFromAttributes(element) {
    return {
      cellRow: Number(element.dataset.row),
      cellCol: Number(element.dataset.col)
    };
  }
};

export default _;
