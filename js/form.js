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
