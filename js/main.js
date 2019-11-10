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
var offerDetail = detailsTemplate.cloneNode(true);

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
    // var pinButton = mapPin.querySelector('.map__pin');
    mapPin.setAttribute('style', 'left: ' + pins[i].location.x + 'px; ' + 'top: ' + pins[i].location.y + 'px;');
    pinAvatar.setAttribute('src', pins[i].author.avatar);
    pinAvatar.setAttribute('alt', pins[i].offer.title);
    mapPin.setAttribute('data-id', i);
    fragment.appendChild(mapPin);
  }
  pinBlock.appendChild(fragment);
};

var getOfferDetailType = function (pinDetails) {
  var offerType = offerDetail.querySelector('.popup__type');
  if (pinDetails.offer.type === 'flat') {
    offerType.textContent = 'Квартира';
  } else {
    if (pinDetails.offer.type === 'bungalo') {
      offerType.textContent = 'Бунгало';
    } else {
      if (pinDetails.offer.type === 'house') {
        offerType.textContent = 'Дом';
      } else {
        offerType.textContent = 'Дворец';
      }
    }
  }
};

var getOfferDetailFeatures = function (pinDetails) {
  var featuresItems = offerDetail.querySelectorAll('.popup__feature');
  var featuresTemplate = offerDetail.querySelector('.popup__features');
  for (var i = featuresItems.length - 1; i >= 0; i--) {
    var featureItem = featuresItems[i];
    featuresTemplate.removeChild(featureItem);
  }

  if (pinDetails.offer.features.length > 0) {
    var offerFeatureTemplate = document.createElement('li');
    offerFeatureTemplate.className = 'popup__feature';
    for (var j = 0; j <= pinDetails.offer.features.length - 1; j++) {
      var offerFeature = offerFeatureTemplate.cloneNode(true);
      offerFeature.classList.add('popup__feature--' + pinDetails.offer.features[j]);
      featuresTemplate.appendChild(offerFeature);
    }
  }
};

var getOfferDetailPhotos = function (pinDetails) {
  var offerPhotosTemplate = offerDetail.querySelector('.popup__photo');
  var offerPhotos = offerDetail.querySelector('.popup__photos');
  offerPhotos.removeChild(offerPhotosTemplate);
  for (var k = 0; k <= pinDetails.offer.photos.length - 1; k++) {
    var offerPhoto = offerPhotosTemplate.cloneNode(true);
    offerPhoto.setAttribute('src', pinDetails.offer.photos[k]);
    offerPhotos.appendChild(offerPhoto);
  }
};

var renderOfferDetails = function (pinDetails) {

  offerDetail.querySelector('.popup__title').textContent = pinDetails.offer.title;

  offerDetail.querySelector('.popup__text--address').textContent = pinDetails.offer.address;

  offerDetail.querySelector('.popup__text--price').innerHTML = pinDetails.offer.price + '&#x20bd;<span>/ночь</span>';

  offerDetail.querySelector('.popup__text--capacity').textContent = pinDetails.offer.rooms + ' комнаты для ' + pinDetails.offer.guests + ' гостей';

  offerDetail.querySelector('.popup__text--time').textContent = 'Заезд после ' + pinDetails.offer.checkin + ', ' + 'выезд до ' + pinDetails.offer.checkout;

  offerDetail.querySelector('.popup__description').textContent = pinDetails.offer.description;

  offerDetail.querySelector('.popup__avatar').setAttribute('src', pinDetails.author.avatar);

  getOfferDetailType(pins[0]);

  getOfferDetailFeatures(pins[0]);

  getOfferDetailPhotos(pins[0]);

  detailsFragment.appendChild(offerDetail);
  document.querySelector('.map').insertBefore(detailsFragment, document.querySelector('.map__filters-container'));
};

getPins();

// renderPins();

// renderOfferDetails(pins[0]);

// Задание 4 - "Подробности"

var PIN_START_X = 570;
var PIN_START_Y = 375;
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;
var formFieldsets = document.querySelectorAll('.ad-form__element');
var mapFilters = document.querySelectorAll('.map__filter');
var mainMapPin = document.querySelector('.map__pin--main');
var mapPinsArea = document.querySelector('.map__pins');
var map = document.querySelector('.map');
var form = document.querySelector('.ad-form');
var addressField = document.querySelector('#address');
var avatarLoader = document.querySelector('#avatar');
var roomsNumber = document.querySelector('#room_number');
var guestsNumber = document.querySelector('#capacity');

var getFormDisabled = function () {
  avatarLoader.setAttribute('disabled', '');
  addressField.setAttribute('value', PIN_START_X + ', ' + PIN_START_Y);
  addressField.setAttribute('readonly', '');

  for (var i = 0; i <= formFieldsets.length - 1; i++) {
    formFieldsets[i].setAttribute('disabled', '');
  }

  for (var j = 0; j <= mapFilters.length - 1; j++) {
    mapFilters[j].setAttribute('disabled', '');
  }
};

var getFormEnabled = function () {
  avatarLoader.removeAttribute('disabled', '');
  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');

  for (var i = 0; i <= formFieldsets.length - 1; i++) {
    formFieldsets[i].removeAttribute('disabled', '');
  }

  for (var j = 0; j <= mapFilters.length - 1; j++) {
    mapFilters[j].removeAttribute('disabled', '');
  }
};

var getGuestsNumberCheck = function () {
  var roomsSelected = roomsNumber.options.selectedIndex;
  var roomsSelectedValue = roomsNumber.options[roomsSelected].value;
  var guestsSelected = guestsNumber.options.selectedIndex;
  var guestsSelectedValue = guestsNumber.options[guestsSelected].value;

  if (roomsSelectedValue === '1') {
    if (guestsSelectedValue !== '1') {
      guestsNumber.setCustomValidity('Одна комната для одного гостя');
    } else {
      guestsNumber.setCustomValidity('');
    }
  } else {
    if (roomsSelectedValue === '2') {
      if (guestsSelectedValue === '3' || guestsSelectedValue === '0') {
        guestsNumber.setCustomValidity('Две комнаты для одного или двух гостей');
      } else {
        guestsNumber.setCustomValidity('');
      }
    } else {
      if (roomsSelectedValue === '3') {
        if (guestsSelectedValue === '0') {
          guestsNumber.setCustomValidity('Три комнаты для одного, двух или трех гостей');
        } else {
          guestsNumber.setCustomValidity('');
        }
      } else {
        if (roomsSelectedValue === '100') {
          if (guestsSelectedValue !== '0') {
            guestsNumber.setCustomValidity('Сто комнат это не для гостей');
          } else {
            guestsNumber.setCustomValidity('');
          }
        }
      }
    }
  }
};

var clickedPinDetails = function (evt) {
  var mapClick = evt.target.closest('.map__pin:not(.map__pin--main)');
  if (mapClick) {
    var clickedPinIndex = mapClick.getAttribute('data-id');
    renderOfferDetails(pins[clickedPinIndex]);

    var detailsCloseButton = document.querySelector('.popup__close');
    var detailsPopup = document.querySelector('.map__card');

    map = document.querySelector('.map');

    var closeDetails = function () {
      map.removeChild(detailsPopup);
      document.removeEventListener('keydown', onDetailsEscPress);
    };

    var onDetailsEscPress = function (keyPressed) {
      if (keyPressed.keyCode === ESC_KEYCODE) {
        closeDetails();
      }
    };

    detailsCloseButton.addEventListener('click', function () {
      closeDetails();
    });

    document.addEventListener('keydown', onDetailsEscPress);
  }
};

mainMapPin.addEventListener('mousedown', function () {
  if (map.classList.contains('map--faded')) {
    getFormEnabled();
    renderPins();
  }
});

mainMapPin.addEventListener('keydown', function (evt) {
  if (map.classList.contains('map--faded')) {
    if (evt.keyCode === ENTER_KEYCODE) {
      getFormEnabled();
      renderPins();
    }
  }
});

mapPinsArea.addEventListener('click', function (evt) {
  clickedPinDetails(evt);
});

roomsNumber.addEventListener('change', function () {
  getGuestsNumberCheck();
});

guestsNumber.addEventListener('change', function () {
  getGuestsNumberCheck();
});

getFormDisabled();
