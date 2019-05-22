(function() {

  "use strict";

  const IMG_TYPES = ['gif', 'jpeg', 'jpg', 'png'];

  let fileChoose = document.querySelector('.img-upload__input');
  let popupEdit = document.querySelector('.img-upload__overlay');
  let popupImg = popupEdit.querySelector('img');

  let showPopupEdit = function() {
    popupEdit.classList.remove('hidden');

    let file = fileChoose.files[0];
    let fileName = file.name.toLowerCase();

    let matches = IMG_TYPES.some(function(it){
      return fileName.endsWith(it);
    });
    if(matches) {
      let reader = new FileReader();

      reader.addEventListener('load', function() {
        popupImg.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  let btnClosePopup = popupEdit.querySelector('.img-upload__cancel');
  let closePopupEdit = function() {
    popupEdit.classList.add('hidden');
  };

  fileChoose.addEventListener('change', function() {
    showPopupEdit();
  });

  btnClosePopup.addEventListener('click', function() {
    closePopupEdit();
  });

})();
