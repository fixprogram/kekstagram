(function() {

  "use strict";

  const RANDOM_PHOTOS = 10;

  let filtersBlock = document.querySelector('.img-filters');
  let filters = filtersBlock.querySelectorAll('.img-filters__button');

  filtersBlock.classList.remove('img-filters--inactive');

  window.filterActivate = function(evtClick) {
    filters.forEach(function(it) {
      it.classList.remove('img-filters__button--active');
    });
    evtClick.classList.add('img-filters__button--active');
  }

  window.getRandom = function(max, min = 0) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  window.getRandomPhotos = function(adData) {
    let data = adData.slice(0);
    console.log(data);
    while(data.length > RANDOM_PHOTOS) {
      data.splice(window.getRandom(data.length), 1);
    }
    window.renderPhotos(data);
    console.log(data);
  }

  window.getPopularPhotos = function(adData) {
    let data = adData.slice(0);
    window.renderPhotos(data);
    console.log(data);
  }

  window.getDiscussedPhotos = function(adData) {
    let data = adData.slice(0);
    data.sort(function(left, right) {
      return right.comments.length - left.comments.length;
    });
    window.renderPhotos(data);
    console.log(data);
  }

})();
