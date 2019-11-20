'use strict';

(function () {
  var testPrice = 150;
  var types = ['palace', 'flat', 'house', 'bungalo'];
  var testRoom = 1;
  var testGuest = 2;
  var times = ['12:00', '13:00', '14:00'];
  var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photosLinks = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  window.data = {
    pinsNumber: 8,
    pins: [],
  };

  var getPin = function (i) {
    var userNumber = (i < 10) ? '0' + (i + 1) : i + 1;
    var x = window.util.getRandomInRange(window.util.MAP_COORDINATES.X.MIN, window.util.MAP_COORDINATES.X.MAX);
    var y = window.util.getRandomInRange(window.util.MAP_COORDINATES.Y.MIN, window.util.MAP_COORDINATES.Y.MAX);
    var pin = {
      'author': {
        'avatar': 'img/avatars/user' + userNumber + '.png',
      },
      'offer': {
        'title': 'Название оффера',
        'address': x + ', ' + y,
        'price': testPrice,
        'type': types[window.util.getRandomInRange(0, types.length - 1)],
        'rooms': testRoom,
        'guests': testGuest,
        'checkin': times[window.util.getRandomInRange(0, times.length - 1)],
        'checkout': times[window.util.getRandomInRange(0, times.length - 1)],
        'features': featuresList.slice(0, window.util.getRandomInRange(1, featuresList.length - 1)),
        'description': 'Описание оффера',
        'photos': photosLinks.slice(0, window.util.getRandomInRange(1, photosLinks.length - 1)),
      },
      'location': {
        'x': x,
        'y': y,
      },
    };
    return pin;
  };

  var getPins = function () {
    for (var i = 0; i < window.data.pinsNumber; i++) {
      window.data.pins.push(getPin(i));
    }
    return window.data.pins;
  };

  getPins();

})();
