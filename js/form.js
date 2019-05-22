(function() {

  "use strict";

  const maxLevel = 453;

  let effectPin = document.querySelector('.effect-level__pin');
  let effectLevelDepth = document.querySelector('.effect-level__depth');
  let level = 0;

  effectPin.addEventListener('mousedown', function(evt) {
    let positionX = evt.clientX;

    let onPinMove = function(moveEvt) {
      moveEvt.preventDefault();

      let shift  = positionX - moveEvt.clientX;
      positionX = moveEvt.clientX;

      level = (effectPin.offsetLeft - shift);

      if(level > maxLevel) {
        level = maxLevel;
      } else if(level < 0) {
        level = 0;
      }

      effectPin.style.left = level + 'px';
      effectLevelDepth.style.width = level + 'px';
      window.showEffect(level);
    };

    let onMouseUp = function(upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onPinMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
    document.addEventListener('mousemove', onPinMove);
    document.addEventListener('mouseup', onMouseUp);
  });

//// Img Scale Realization ////
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


  let effectLevelLine = document.querySelector('.effect-level__line');

  let clickOnLine = function(coord) {
    level = coord;
    effectPin.style.left = level + 'px';
    effectLevelDepth.style.width = level + 'px';
  }

  effectLevelLine.addEventListener('click', function(evt) {
    evt.preventDefault();
    let clickCoord = effectLevelLine.getBoundingClientRect();
    clickCoord = (evt.clientX - clickCoord.left) / effectLevelLine.offsetWidth * maxLevel;
    clickOnLine(clickCoord);
    window.showEffect(clickCoord);
  });

})();
