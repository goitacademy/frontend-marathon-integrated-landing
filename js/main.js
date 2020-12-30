"use strict";
import helpers from "./helpers.js";

$(document).ready(function () {
  var utm_source = helpers.getUrlParameter("utm_source");
  var utm_medium = helpers.getUrlParameter("utm_medium");
  var utm_term = helpers.getUrlParameter("utm_term");
  var utm_campaign = helpers.getUrlParameter("utm_campaign");
  var utm_content = helpers.getUrlParameter("utm_content");
  $("input[name=utm_source]").val(utm_source);
  $("input[name=utm_medium]").val(utm_medium);
  $("input[name=utm_term]").val(utm_term);
  $("input[name=utm_campaign]").val(utm_campaign);
  $("input[name=utm_content]").val(utm_content);

  $('input[type="tel"]').mask("+38(999)999-99-99");

  // console.log("utm_source :>> ", utm_source);
  // console.log("utm_medium :>> ", utm_medium);
  // console.log("utm_term :>> ", utm_term);
  // console.log("utm_campaign :>> ", utm_campaign);
  // console.log("utm_content :>> ", utm_content);

  const registerForm = document.querySelector("#register_form");
  const registerFormInputName = document.querySelector(
    "#register_form_input_name"
  );
  const registerFormInputTel = document.querySelector(
    "#register_form_input_tel"
  );
  const registerFormInputEmail = document.querySelector(
    "#register_form_input_email"
  );
  registerForm.addEventListener("submit", onSubmitRegisterForm);

  function onSubmitRegisterForm(event) {
    event.preventDefault();

    var nameValid = helpers.validName(registerFormInputName);
    var telValid = helpers.validPhone(registerFormInputTel);
    var emailValid = helpers.validMail(registerFormInputEmail);

    if (nameValid && emailValid && telValid) {
      var allInput = this.querySelectorAll("input");
      allInput.forEach(function (el) {
        return (el.style.outline = "1px solid #000");
      });

      var google_id = helpers.readCookie("_ga");

      var phoneNumberWithoutExtraCharacters = helpers.removeExtraCharactersInPhoneNumber(registerFormInputTel.value);

      if (google_id !== null) {
        helpers
          .requestToGOITDatabaseWithGoogleId(
            google_id,
            registerFormInputName.value,
            phoneNumberWithoutExtraCharacters,
            registerFormInputEmail.value,
            utm_medium,
            utm_source,
            utm_term,
            utm_campaign,
            utm_content
          )
          .then((res) => {
            if (res.success) {
              var userId = res.id;

              helpers.redirectUserToNeighboringTabWithGETRequestToLeeloo(
                registerFormInputName.value,
                registerFormInputEmail.value,
                phoneNumberWithoutExtraCharacters,
                userId,
                utm_medium,
                utm_source,
                utm_term,
                utm_campaign,
                utm_content
              );

              helpers.clearRegisterFormAndCloseRegisterModal(registerForm);
            } else {
              helpers.redirectUserToNeighboringTabWithGETRequestToLeeloo(
                registerFormInputName.value,
                registerFormInputEmail.value,
                phoneNumberWithoutExtraCharacters,
                google_id,
                utm_medium,
                utm_source,
                utm_term,
                utm_campaign,
                utm_content
              );

              helpers.clearRegisterFormAndCloseRegisterModal(registerForm);
            }
          })
          .catch((err) => {
            console.warn(err);

            helpers.redirectUserToNeighboringTabWithGETRequestToLeeloo(
              registerFormInputName.value,
              registerFormInputEmail.value,
              phoneNumberWithoutExtraCharacters,
              google_id,
              utm_medium,
              utm_source,
              utm_term,
              utm_campaign,
              utm_content
            );

            helpers.clearRegisterFormAndCloseRegisterModal(registerForm);
          });

      } else {

        helpers
          .requestToGOITDatabaseWithoutGoogleId(
            registerFormInputName.value,
            phoneNumberWithoutExtraCharacters,
            registerFormInputEmail.value,
            utm_medium,
            utm_source,
            utm_term,
            utm_campaign,
            utm_content
          )
          .then((res) => {
            if (res.success) {
              var userId = res.id;

              helpers.redirectUserToNeighboringTabWithGETRequestToLeeloo(
                registerFormInputName.value,
                registerFormInputEmail.value,
                phoneNumberWithoutExtraCharacters,
                userId,
                utm_medium,
                utm_source,
                utm_term,
                utm_campaign,
                utm_content
              );

              helpers.clearRegisterFormAndCloseRegisterModal(registerForm);
            } else {
              // google_id in this case = null, and get request to Leeloo without id
              helpers.redirectUserToNeighboringTabWithGETRequestToLeeloo(
                registerFormInputName.value,
                registerFormInputEmail.value,
                phoneNumberWithoutExtraCharacters,
                google_id,
                utm_medium,
                utm_source,
                utm_term,
                utm_campaign,
                utm_content
              );
  
              helpers.clearRegisterFormAndCloseRegisterModal(registerForm);
            }
          })
          .catch((err) => {
            console.warn(err);

            // google_id in this case = null, and get request to Leeloo without id
            helpers.redirectUserToNeighboringTabWithGETRequestToLeeloo(
              registerFormInputName.value,
              registerFormInputEmail.value,
              phoneNumberWithoutExtraCharacters,
              google_id,
              utm_medium,
              utm_source,
              utm_term,
              utm_campaign,
              utm_content
            );

            helpers.clearRegisterFormAndCloseRegisterModal(registerForm);
          });;
      }
    }
  }
});

function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread()
  );
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _iterableToArray(iter) {
  if (
    Symbol.iterator in Object(iter) ||
    Object.prototype.toString.call(iter) === "[object Arguments]"
  )
    return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
}

(function () {
  "use strict";

  var viewport = document.body.clientWidth;

  var firststepBtn = _toConsumableArray(
    document.querySelectorAll(".button_change")
  );

  if (viewport >= 768) {
    firststepBtn.forEach(function (el) {
      el.innerHTML = "зарегистрироваться на марафон";
    });
  }
})();
