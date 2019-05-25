(function() {

    "use strict";

    let picturesList = document.querySelector('.pictures');
    let pictureTemplate = document.querySelector('#picture');

    let createPictureElement = function(url, comment, likes) {
      let el = pictureTemplate.content.cloneNode(true);
      el.querySelector('.picture__img').src = url;
      el.querySelector('.picture__comments').textContent = comment;
      el.querySelector('.picture__likes').textContent = likes;
      return el;
    };

    let renderPicture = function(objects) {
      let fragment = document.createDocumentFragment();
      for(let i = 0; i < objects.length; i++) {
        fragment.appendChild(createPictureElement(objects[i].url, objects[i].comments.length, objects[i].likes));
      }
      return fragment;
    };

    let bigPicture = document.querySelector('.big-picture');
    bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
    bigPicture.querySelector('.social__comments-loader').classList.add('visually-hidden');

    let showImage = function(data) {
      bigPicture.querySelector('.big-picture__img img').src = data.url;
      bigPicture.querySelector('.likes-count').textContent = data.likes;
      bigPicture.querySelector('.comments-count').textContent = data.comments.length;

      let btnClose = bigPicture.querySelector('.big-picture__cancel');

      let commentsList = bigPicture.querySelector('.social__comments');
      let commentsItem = commentsList.querySelectorAll('.social__comment');
      commentsItem.forEach(function(it) {
        commentsList.removeChild(it);
      });

      data.comments.forEach(function(it){
        commentsList.appendChild(renderComment(it));
      });

      bigPicture.querySelector('.social__caption').textContent = data.description;

      bigPicture.classList.remove('hidden');

      btnClose.addEventListener('click', function() {
        bigPicture.classList.add('hidden');
      });
    };

    let renderComment = function(comment) {
      let commentElement = document.querySelector('#comment').content.querySelector('.social__comment').cloneNode(true);
      commentElement.querySelector('.social__picture').src = comment.avatar;
      commentElement.querySelector('.social__picture').alt = comment.name;
      commentElement.querySelector('.social__text').textContent = comment.message;
      return commentElement;
    };

    let deleteAllPhotos = function() {
      let pictures = picturesList.querySelectorAll('.picture');
      pictures.forEach(function(it) {
        picturesList.removeChild(it);
      });
    }

    window.renderPhotos = function(data) {
      deleteAllPhotos();
      picturesList.appendChild(renderPicture(data));
      let pictures = picturesList.querySelectorAll('.picture');
      pictures.forEach(function(it, i){
        it.addEventListener('click', function(){
          showImage(data[i]);
        });
      });
    }

    let onSuccess = function(data) {
      let adData = data;

      window.renderPhotos(adData);

      let popularBtn = document.querySelector('#filter-popular');
      let newBtn = document.querySelector('#filter-new');
      let discussedBtn = document.querySelector('#filter-discussed');

      newBtn.addEventListener('click', function(evt) {
        window.filterActivate(evt.target);
        window.getRandomPhotos(adData);
      });

      popularBtn.addEventListener('click', function(evt) {
        window.filterActivate(evt.target);
        window.getPopularPhotos(adData);
      });

      discussedBtn.addEventListener('click', function(evt) {
        window.filterActivate(evt.target);
        window.getDiscussedPhotos(adData);
      });
    }

    let onError = function(message) {
      console.log(message);
    }

    window.backend.load(onSuccess, onError);
})();
