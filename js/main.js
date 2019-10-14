'use strict';

var MAP_COORDINATES = {
  X: {
    MIN: 0,
    MAX: 1200,
  },
  Y: {
    MIN: 130,
    MAX: 630,
  }
};
var testPrice = 150;
var types = ['palace', 'flat', 'house', 'bungalo'];
var testRoom = 1;
var testGuest = 2;
var times = ['12:00', '13:00', '14:00'];
var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photosLinks = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var pinsNumber = 8;
var pins = [];
var pinTemplate = document.querySelector('#pin').content.querySelector('button');
var fragment = document.createDocumentFragment();
var pinBlock = document.querySelector('.map__pins');

var getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getPin = function (i) {
  var userNumber = (i < 10) ? '0' + (i + 1) : i + 1;
  var x = getRandomInRange(MAP_COORDINATES.X.MIN, MAP_COORDINATES.X.MAX);
  var y = getRandomInRange(MAP_COORDINATES.Y.MIN, MAP_COORDINATES.Y.MAX);
  var pin = {
    'author': {
      'avatar': 'img/avatars/user' + userNumber + '.png',
    },
    'offer': {
      'title': 'Название оффера',
      'address': x + ', ' + y,
      'price': testPrice,
      'type': types[getRandomInRange(0, types.length - 1)],
      'rooms': testRoom,
      'guests': testGuest,
      'checkin': times[getRandomInRange(0, times.length - 1)],
      'checkout': times[getRandomInRange(0, times.length - 1)],
      'features': featuresList.slice(0, getRandomInRange(1, featuresList.length - 1)),
      'description': 'Описание оффера',
      'photos': photosLinks.slice(0, getRandomInRange(1, photosLinks.length - 1)),
    },
    'location': {
      'x': x,
      'y': y,
    },
  };
  return pin;
};

var getPins = function () {
  for (var i = 0; i < pinsNumber; i++) {
    pins.push(getPin(i));
  }
  return pins;
};

var getMapPins = function () {
  for (var i = 0; i < pinsNumber; i++) {
    var mapPin = pinTemplate.cloneNode(true);
    var pinAvatar = mapPin.querySelector('img');
    mapPin.setAttribute('style', 'left: ' + pins[i].location.x + 'px; ' + 'top: ' + pins[i].location.y + 'px;');
    pinAvatar.setAttribute('src', pins[i].author.avatar);
    pinAvatar.setAttribute('alt', pins[i].offer.title);
    fragment.appendChild(mapPin);
  }
  pinBlock.appendChild(fragment);
};

document.querySelector('.map').classList.remove('map--faded');

getPins();
getMapPins();
