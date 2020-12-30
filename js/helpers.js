"use strict";
import variables from './variables.js';

function getUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
    sURLVariables = sPageURL.split("&"),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split("=");

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
}

function validName(nameInput) {
  var phoneValue = nameInput.value;
  var valid = phoneValue.length >= 2;
  !valid
    ? (nameInput.style.outline = "2px solid red")
    : (nameInput.style.outline = "2px solid #ccc");
  return valid;
}

function validPhone(phoneInput) {
  var phoneValue = removeExtraCharactersInPhoneNumber(phoneInput.value);
  var re = /(?:\w)(?:(?:(?:(?:\+?3)?8\W{0,5})?0\W{0,5})?[45679]\s?\d[^\w,;(\+]{0,5})?\d\W{0,5}\d\W{0,5}\d\W{0,5}\d\W{0,5}\d\W{0,5}\d\W{0,5}\d(?!(\W?\d))/;
  var valid = re.test(phoneValue);
  !valid
    ? (phoneInput.style.outline = "2px solid red")
    : (phoneInput.style.outline = "2px solid #ccc");
  return valid;
}

function validMail(emailInput) {
  var emailValue = emailInput.value;
  var re = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
  var valid = re.test(emailValue);
  !valid
    ? (emailInput.style.border = "2px solid red")
    : (emailInput.style.border = "2px solid #ccc");
  return valid;
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) {
      var cidLong = c.substring(nameEQ.length, c.length);
      var tmp = cidLong.split('.');
      // берем 3 и 4 фрагмент и склеиваем
      var cid = tmp[2] + '.' + tmp[3];
      // возвращаем значение
      return cid;
    } 
  }
  return null;
}

function redirectUserToNeighboringTabWithGETRequestToLeeloo(
  name,
  email,
  phone,
  userId,
  utm_medium,
  utm_source,
  utm_term,
  utm_campaign,
  utm_content
) {
  const url =
    `https://wep.wf/${variables.url_hash}?name=${name}&email=${email}&phone=${phone}` +
    (userId ? `&id=${userId}` : '') +
    (utm_medium ? `&utm_medium=${utm_medium}` : "") +
    (utm_source ? `&utm_source=${utm_source}` : "") +
    (utm_term ? `&utm_term=${utm_term}` : "") +
    (utm_campaign ? `&utm_campaign=${utm_campaign}` : "") +
    (utm_content ? `&utm_content=${utm_content}` : "");

  window.open(url);
};

function clearRegisterFormAndCloseRegisterModal (registerForm) {
    registerForm.reset();
    var modalWindow = document.querySelector(".modalwindow");
    modalWindow.classList.remove("modalwindow_active");
};

function requestToGOITDatabaseWithGoogleId (google_id, name, phone, email, utm_medium, utm_source, utm_term, utm_campaign, utm_content) {
    return fetch("https://integrations.goit.global/api/leaduser/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: google_id,
          firstName: name,
          phone: phone,
          email: email,
          params: {
            utm_medium: utm_medium ? utm_medium : '',
            utm_source: utm_source ? utm_source : '',
            utm_term: utm_term ? utm_term : '',
            utm_campaign: utm_campaign ? utm_campaign : '',
            utm_content: utm_content ? utm_content : '',
            product_id: variables.product_id,
          }
        }),
      })
        .then((data) => {
          return data.json();
        })
}

function requestToGOITDatabaseWithoutGoogleId (name, phone, email, utm_medium, utm_source, utm_term, utm_campaign, utm_content) {
    return fetch("https://integrations.goit.global/api/leaduser/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: name,
          phone: phone,
          email: email,
          params: {
            utm_medium: utm_medium ? utm_medium : '',
            utm_source: utm_source ? utm_source : '',
            utm_term: utm_term ? utm_term : '',
            utm_campaign: utm_campaign ? utm_campaign : '',
            utm_content: utm_content ? utm_content : '',
            product_id: variables.product_id,
          }
        }),
      })
        .then((data) => {
          return data.json();
        })
}

function removeExtraCharactersInPhoneNumber (phoneNumber) {
  var validSymbolsArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  var arr = phoneNumber.split('');
  var newCleanArray = [];
  arr.forEach((el) => {
    if(validSymbolsArray.includes(el)) {
      newCleanArray.push(el);
    }
  })
  return newCleanArray.join('');
}

export default {
  getUrlParameter,
  validName,
  validPhone,
  validMail,
  readCookie,
  redirectUserToNeighboringTabWithGETRequestToLeeloo,
  clearRegisterFormAndCloseRegisterModal,
  requestToGOITDatabaseWithGoogleId,
  requestToGOITDatabaseWithoutGoogleId,
  removeExtraCharactersInPhoneNumber,
};

// $('input[type="tel"]').mask("+38(999)999-99-99");

// $('form').on('submit', function (e) {
//   console.log('click');
//   e.preventDefault();
//   var emailValue = $(this).find('input[type="email"]')[0];
//   var emailValid = ValidMail(emailValue);
//   //var telValue = $(this).find('input[type="tel"]')[0];
//   //var telValid = ValidPhone(telValue);

//   if (emailValid) {
//     $('.submit').prop('disabled', true);
//     var allInput = this.querySelectorAll('input');
//     allInput.forEach(function (el) {
//       return el.style.outline = '1px solid #000';
//     });
//     var $form = $(this);
//     $.ajax({
//       type: 'POST',
//       url: 'crm/registration.php',
//       dataType: 'json',
//       data: $form.serialize(),
//       success: function success(response) {
//         if (response.status == 'success') {
//           window.location.href = 'https://wep.wf/9wp0ie';
//         }
//       }
//     });
//   }
// }); // script to get utm
