"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

(function () {
  var modalBtn = _toConsumableArray(document.querySelectorAll('.section__button'));

  var closeBtn = document.querySelector('.close');
  var modalWindow = document.querySelector('.modalwindow');

  var openModal = function openModal() {
    modalWindow.classList.add('modalwindow_active');
  };

  var closeModal = function closeModal(e) {
    var target = e.target; // console.log(target.closest('.modalwindow_container'));

    if (!target.closest('.modalwindow_container') || target.classList.contains('close')) {
      modalWindow.classList.remove('modalwindow_active');
    }
  };

  modalBtn.forEach(function (el) {
    el.addEventListener('click', openModal);
  });
  closeBtn.addEventListener('click', closeModal);
  modalWindow.addEventListener('click', closeModal);
})();