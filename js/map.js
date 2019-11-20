'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var PIN_START_X = 570;
  var PIN_START_Y = 375;
  var pinTemplate = document.querySelector('#pin').content.querySelector('button');
  var fragment = document.createDocumentFragment();
  var pinBlock = document.querySelector('.map__pins');
  var addressField = document.querySelector('#address');
  var avatarLoader = document.querySelector('#avatar');
  var formFieldsets = document.querySelectorAll('.ad-form__element');
  var mapFilters = document.querySelectorAll('.map__filter');
  var map = document.querySelector('.map');
  var form = document.querySelector('.ad-form');
  var mainMapPin = document.querySelector('.map__pin--main');
  var mapPinsArea = document.querySelector('.map__pins');

  var renderPins = function () {
    for (var i = 0; i < window.data.pinsNumber; i++) {
      var mapPin = pinTemplate.cloneNode(true);
      var pinAvatar = mapPin.querySelector('img');
      mapPin.setAttribute('style', 'left: ' + window.data.pins[i].location.x + 'px; ' + 'top: ' + window.data.pins[i].location.y + 'px;');
      pinAvatar.setAttribute('src', window.data.pins[i].author.avatar);
      pinAvatar.setAttribute('alt', window.data.pins[i].offer.title);
      mapPin.setAttribute('data-id', i);
      fragment.appendChild(mapPin);
    }
    pinBlock.appendChild(fragment);
  };

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

  var getClickedpinIndex = function (evt) {
    var mapClick = evt.target.closest('.map__pin:not(.map__pin--main)');

    if (mapClick) {
      var clickedPinIndex = mapClick.getAttribute('data-id');
      window.card.renderOfferDetails(window.data.pins[clickedPinIndex]);

      var detailsCloseButton = document.querySelector('.popup__close');

      map = document.querySelector('.map');

      var closeDetails = function () {
        var detailsPopup = document.querySelector('.map__card');
        if (detailsPopup) {
          map.removeChild(detailsPopup);
        }
        document.removeEventListener('keydown', onDocumentKeydown);
        detailsCloseButton.removeEventListener('click', onDetailsCloseButtonClick);
      };

      var onDetailsCloseButtonClick = function () {
        closeDetails();
      };

      var onDocumentKeydown = function (keyPressed) {
        if (keyPressed.keyCode === ESC_KEYCODE) {
          closeDetails();
        }
      };

      detailsCloseButton.addEventListener('click', onDetailsCloseButtonClick);

      document.addEventListener('keydown', onDocumentKeydown);
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
    getClickedpinIndex(evt);
  });

  getFormDisabled();
})();
