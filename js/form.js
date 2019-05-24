(function() {

  "use strict";

  window.maxLevel = 453;

  let effectPin = document.querySelector('.effect-level__pin');
  let effectLevelDepth = document.querySelector('.effect-level__depth');
  let level = window.maxLevel;

  window.setCoord = function(coord = window.maxLevel) {
    level = coord;
    effectPin.style.left = level + 'px';
    effectLevelDepth.style.width = level + 'px';
  }

  window.setCoord(level);

  effectPin.addEventListener('mousedown', function(evt) {
    let positionX = evt.clientX;

    let onPinMove = function(moveEvt) {
      moveEvt.preventDefault();

      let shift  = positionX - moveEvt.clientX;
      positionX = moveEvt.clientX;

      level = (effectPin.offsetLeft - shift);

      if(level > window.maxLevel) {
        level = window.maxLevel;
      } else if(level < 0) {
        level = 0;
      }

      window.setCoord(level);
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

  let effectLevelLine = document.querySelector('.effect-level__line');

  effectLevelLine.addEventListener('click', function(evt) {
    evt.preventDefault();
    let clickCoord = effectLevelLine.getBoundingClientRect();
    clickCoord = (evt.clientX - clickCoord.left) / effectLevelLine.offsetWidth * window.maxLevel;
    window.setCoord(clickCoord);
    window.showEffect(clickCoord);
  });

})();
