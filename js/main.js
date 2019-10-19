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
var detailsTemplate = document.querySelector('#card').content.querySelector('article');
var detailsFragment = document.createDocumentFragment();

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

var renderPins = function () {
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

var renderOfferDetails = function () {
  var offerDetail = detailsTemplate.cloneNode(true);

  offerDetail.querySelector('.popup__title').textContent = pins[0].offer.title;
  offerDetail.querySelector('.popup__text--address').textContent = pins[0].offer.address;
  offerDetail.querySelector('.popup__text--price').innerHTML = pins[0].offer.price + '&#x20bd;<span>/ночь</span>';

  var offerType = offerDetail.querySelector('.popup__type');
  if (pins[0].offer.type === 'flat') {
    offerType.textContent = 'Квартира';
  } else {
    if (pins[0].offer.type === 'bungalo') {
      offerType.textContent = 'Бунгало';
    } else {
      if (pins[0].offer.type === 'house') {
        offerType.textContent = 'Дом';
      } else {
        offerType.textContent = 'Дворец';
      }
    }
  }

  offerDetail.querySelector('.popup__text--capacity').textContent = pins[0].offer.rooms + ' комнаты для ' + pins[0].offer.guests + ' гостей';
  offerDetail.querySelector('.popup__text--time').textContent = 'Заезд после ' + pins[0].offer.checkin + ', ' + 'выезд до ' + pins[0].offer.checkout;

  var featuresItems = offerDetail.querySelectorAll('.popup__feature');
  var featuresTemplate = offerDetail.querySelector('.popup__features');
  for (var i = featuresItems.length - 1; i >= 0; i--) {
    var featureItem = featuresItems[i];
    featuresTemplate.removeChild(featureItem);
  }

  if (pins[0].offer.features.length > 0) {
    var offerFeatureTemplate = document.createElement('li');
    offerFeatureTemplate.className = 'popup__feature';
    for (var j = 0; j <= pins[0].offer.features.length - 1; j++) {
      var offerFeature = offerFeatureTemplate.cloneNode(true);
      offerFeature.classList.add('popup__feature--' + pins[0].offer.features[j]);
      featuresTemplate.appendChild(offerFeature);
    }
  }

  offerDetail.querySelector('.popup__description').textContent = pins[0].offer.description;

  var offerPhotosTemplate = offerDetail.querySelector('.popup__photo');
  var offerPhotos = offerDetail.querySelector('.popup__photos');
  offerPhotos.removeChild(offerPhotosTemplate);
  for (var k = 0; k <= pins[0].offer.photos.length - 1; k++) {
    var offerPhoto = offerPhotosTemplate.cloneNode(true);
    offerPhoto.setAttribute('src', pins[0].offer.photos[k]);
    offerPhotos.appendChild(offerPhoto);
  }

  offerDetail.querySelector('.popup__avatar').setAttribute('src', pins[0].author.avatar);

  detailsFragment.appendChild(offerDetail);
  document.querySelector('.map').insertBefore(detailsFragment, document.querySelector('.map__filters-container'));
};

document.querySelector('.map').classList.remove('map--faded');

getPins();
renderPins();
renderOfferDetails();
