'use strict';

(function () {
  var roomsNumber = document.querySelector('#room_number');
  var guestsNumber = document.querySelector('#capacity');
  var price = document.querySelector('#price');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var type = document.querySelector('#type');

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

  var getPricecheck = function () {
    var typeSelected = type.options.selectedIndex;
    var typeSelectedValue = type.options[typeSelected].value;

    if (typeSelectedValue === 'bungalo') {
      price.setAttribute('min', '0');
      price.setAttribute('placeholder', '0');
    } else {
      if (typeSelectedValue === 'flat') {
        price.setAttribute('min', '1000');
        price.setAttribute('placeholder', '1000');
      } else {
        if (typeSelectedValue === 'house') {
          price.setAttribute('min', '5000');
          price.setAttribute('placeholder', '5000');
        } else {
          price.setAttribute('min', '10000');
          price.setAttribute('placeholder', '10000');
        }
      }
    }
  };

  var getTimeInCheck = function () {
    var timeInSelected = timeIn.options.selectedIndex;
    var timeInSelectedValue = timeIn.options[timeInSelected].value;

    for (var i = 0; i <= timeOut.options.length - 1; i++) {
      if (timeInSelectedValue === timeOut.options[i].value) {
        timeOut.options[i].selected = true;
      }
    }
  };

  var getTimeOutCheck = function () {
    var timeOutSelected = timeOut.options.selectedIndex;
    var timeOutSelectedValue = timeOut.options[timeOutSelected].value;

    for (var i = 0; i <= timeIn.options.length - 1; i++) {
      if (timeOutSelectedValue === timeIn.options[i].value) {
        timeIn.options[i].selected = true;
      }
    }
  };

  roomsNumber.addEventListener('change', function () {
    getGuestsNumberCheck();
  });


  guestsNumber.addEventListener('change', function () {
    getGuestsNumberCheck();
  });

  type.addEventListener('change', function () {
    getPricecheck();
  });

  timeIn.addEventListener('change', function () {
    getTimeInCheck();
  });

  timeOut.addEventListener('change', function () {
    getTimeOutCheck();
  });
})();
