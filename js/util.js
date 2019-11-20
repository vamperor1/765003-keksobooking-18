'use strict';

(function () {
  window.util = {
    MAP_COORDINATES: {
      X: {
        MIN: 0,
        MAX: 1200,
      },
      Y: {
        MIN: 130,
        MAX: 630,
      },
    },

    getRandomInRange: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  };
})();
