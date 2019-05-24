(function() {

  "use strict";

  let imgUpload = document.querySelector('.img-upload__wrapper');
  let form = document.querySelector('.img-upload__form');
  let formHashtags = form.querySelector('.text__hashtags');
  let formDescription = form.querySelector('.text__description');
  let formEffect = form.querySelector('#effect-none');
  let formScaleValue = form.querySelector('.scale__control--value');

  let resetForm = function() {
    window.showEffect();
    window.setCoord();
    formHashtags.value = '';
    formDescription.value = '';
    formEffect.checked = true;
    formScaleValue.value = '100%';
  }

  let onSuccess = function(data) {
    if(document.querySelector('.success')) {
      let successPopup = document.querySelector('.success');
      successPopup.style.display = 'flex';
    }
    resetForm();
    window.closePopupEdit();
    document.body.appendChild(document.querySelector('#success').content.querySelector('.success'));
    console.log(data);
    let successBtn = document.querySelector('.success__button');
    successBtn.addEventListener('click', function() {
      document.querySelector('.success').style.display = 'none';
    });

  }

  let onError = function(message) {
    if(document.querySelector('.error')) {
      let errorPopup = document.querySelector('.error');
      errorPopup.style.display = 'flex';
    }
    imgUpload.classList.add('hidden');
    document.body.appendChild(document.querySelector('#error').content.querySelector('.error'));
    console.log(message);
    let errorBtnRepeat = document.querySelector('.error__button--repeat');
    let errorBtnUploadAnother = document.querySelector('.error__button--upload-another');

    errorBtnRepeat.addEventListener('click', function() {
      imgUpload.classList.remove('hidden');
      document.querySelector('.error').style.display = 'none';
    });

    errorBtnUploadAnother.addEventListener('click', function() {
      document.querySelector('.error').style.display = 'none';
    });
  }

  form.addEventListener('submit', function(evt) {
    evt.preventDefault();

    window.backend.upload(onSuccess, onError, new FormData(form));
  });

})();
