(function() {

  "use strict";

  let preview = document.querySelector('.img-upload__preview');
  let scaleControlValue = document.querySelector('.scale__control--value');
  let scaleControlSmaller = document.querySelector('.scale__control--smaller');
  let scaleControlBigger = document.querySelector('.scale__control--bigger');

  let changePreviewSize = function(small) {
    let value = parseInt(scaleControlValue.value) / 100;
    if(small) {
      value -= 0.25;
      console.log(parseInt(scaleControlValue.value) / 100);
    } else {
      value += 0.25;
    }
    if(value > 1) {
      value = 1;
    } else if(value < 0.25) {
      value = 0.25;
    }
    scaleControlValue.value = value * 100 + '%';
    preview.style.transform = 'scale(' + value + ')';
  }

  preview.style.transform = 'scale(1)';
  scaleControlValue.value = 100 + '%';

  scaleControlSmaller.addEventListener('click', function() {
    changePreviewSize(true);
  });

  scaleControlBigger.addEventListener('click', function() {
    changePreviewSize(false);
  });

})();
