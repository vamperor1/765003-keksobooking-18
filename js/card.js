'use strict';

(function () {
  var detailsTemplate = document.querySelector('#card').content.querySelector('article');
  var offerDetail = detailsTemplate.cloneNode(true);
  var detailsFragment = document.createDocumentFragment();

  var getOfferDetailType = function (pinIndex) {
    var offerType = offerDetail.querySelector('.popup__type');
    if (pinIndex.offer.type === 'flat') {
      offerType.textContent = 'Квартира';
    } else {
      if (pinIndex.offer.type === 'bungalo') {
        offerType.textContent = 'Бунгало';
      } else {
        if (pinIndex.offer.type === 'house') {
          offerType.textContent = 'Дом';
        } else {
          offerType.textContent = 'Дворец';
        }
      }
    }
  };

  var getOfferDetailFeatures = function (pinIndex) {
    var featuresItems = offerDetail.querySelectorAll('.popup__feature');
    var featuresTemplate = offerDetail.querySelector('.popup__features');
    for (var i = featuresItems.length - 1; i >= 0; i--) {
      var featureItem = featuresItems[i];
      featuresTemplate.removeChild(featureItem);
    }

    if (pinIndex.offer.features.length > 0) {
      var offerFeatureTemplate = document.createElement('li');
      offerFeatureTemplate.className = 'popup__feature';
      for (var j = 0; j <= pinIndex.offer.features.length - 1; j++) {
        var offerFeature = offerFeatureTemplate.cloneNode(true);
        offerFeature.classList.add('popup__feature--' + pinIndex.offer.features[j]);
        featuresTemplate.appendChild(offerFeature);
      }
    }
  };

  var getOfferDetailPhotos = function (pinIndex) {
    var offerPhotosTemplate = offerDetail.querySelector('.popup__photo');
    var offerPhotos = offerDetail.querySelector('.popup__photos');
    offerPhotos.innerHTML = '';
    for (var i = 0; i <= pinIndex.offer.photos.length - 1; i++) {
      var offerPhoto = offerPhotosTemplate.cloneNode(true);
      offerPhoto.setAttribute('src', pinIndex.offer.photos[i]);
      offerPhotos.appendChild(offerPhoto);
    }
  };

  window.card = {
    renderOfferDetails: function (pinIndex) {

      offerDetail.querySelector('.popup__title').textContent = pinIndex.offer.title;

      offerDetail.querySelector('.popup__text--address').textContent = pinIndex.offer.address;

      offerDetail.querySelector('.popup__text--price').innerHTML = pinIndex.offer.price + '&#x20bd;<span>/ночь</span>';

      offerDetail.querySelector('.popup__text--capacity').textContent = pinIndex.offer.rooms + ' комнаты для ' + pinIndex.offer.guests + ' гостей';

      offerDetail.querySelector('.popup__text--time').textContent = 'Заезд после ' + pinIndex.offer.checkin + ', ' + 'выезд до ' + pinIndex.offer.checkout;

      offerDetail.querySelector('.popup__description').textContent = pinIndex.offer.description;

      offerDetail.querySelector('.popup__avatar').setAttribute('src', pinIndex.author.avatar);

      getOfferDetailType(pinIndex);

      getOfferDetailFeatures(pinIndex);

      getOfferDetailPhotos(pinIndex);

      detailsFragment.appendChild(offerDetail);
      document.querySelector('.map').insertBefore(detailsFragment, document.querySelector('.map__filters-container'));
    },
  };
})();
