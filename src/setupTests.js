import '@testing-library/jest-dom';
import 'jest-canvas-mock';

// beforeAll(() => {
//   HTMLCanvasElement.prototype.getContext = jest.fn();
// });

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };
