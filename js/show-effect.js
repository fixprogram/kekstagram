(function() {
  "use strict";

  const Effect = {
    ORIGIN: {
      id: 'effect-none',
      name: '',
      filter: '',
      points: '',
      min: 0,
      max: 100
    },
    CHROME: {
      id: 'effect-chrome',
      name: 'effects__preview--chrome',
      filter: 'grayscale',
      points: '',
      min: 0,
      max: 1
    },
    SEPIA: {
      id: 'effect-sepia',
      name: 'effects__preview--sepia',
      filter: 'sepia',
      points: '',
      min: 0,
      max: 1
    },
    MARVIN: {
      id: 'effect-marvin',
      name: 'effects__preview--marvin',
      filter: 'invert',
      points: '%',
      min: 0,
      max: 100
    },
    PHOBOS: {
      id: 'effect-phobos',
      name: 'effects__preview--phobos',
      filter: 'blur',
      points: 'px',
      min: 0,
      max: 3
    },
    HEAT: {
      id: 'effect-heat',
      name: 'effects__preview--heat',
      filter: 'brightness',
      points: '',
      min: 1,
      max: 3
    }
  };

  const maxLevel = 453;

  let effectsList = document.querySelector('.effects__list');
  let effects = effectsList.querySelectorAll('.effects__radio');
  let picture = document.querySelector('.img-upload__preview img');

  let effectLevelBlock = document.querySelector('.effect-level');

  let getEffect = function(id) {
    switch(id) {
      case 'effect-chrome':
        return Effect.CHROME;
      case 'effect-sepia':
        return Effect.SEPIA;
      case 'effect-marvin':
        return Effect.MARVIN;
      case 'effect-phobos':
        return Effect.PHOBOS;
      case 'effect-heat':
        return Effect.HEAT;
      case 'effect-none':
        return Effect.ORIGIN;
    }
  }

  let checkboxes = document.querySelectorAll('.effects__radio');

  let getEffectRadio = function(checkboxes) {
    let result;
    checkboxes.forEach(function(it){
      if(it.checked) {
        result = it.id;
        console.log(result);
      }
    });
    return result;
  }

  let changeSize = function(effect, level) {
    let effectName = getEffect(effect.id);
      if(effectName.filter === '') {
        picture.style.filter = 'none';
      }
      if(effectName.id === 'effect-none') {
        effectLevelBlock.style.display = 'none';
      } else {
        effectLevelBlock.style.display = 'block';
      }
      let effectLevel = level / maxLevel * effectName.max;
      picture.style.filter = effectName.filter + '(' + effectLevel + effectName.points + ')';
  }

  window.showEffect = function(level) {
    let effect = getEffectRadio(checkboxes);

    effects.forEach(function(it){
      it.addEventListener('click', function() {
        console.log(it);
        window.showEffect(level);
      });

    });

    if(effect) {
      changeSize(getEffect(effect), level);
    }
  }

})();
