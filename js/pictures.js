(function() {

    "use strict";

    // const comments = [
    //   'Всё отлично!',
    //   'В целом всё неплохо. Но не всё.',
    //   'Когда выделаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    //   'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    //   'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    //   'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
    // ];
    // const descriptions = [
    //   'Тестим новую камеру!',
    //   'Затусили с друзьям и на море',
    //   'Как же круто тут кормят',
    //   'Отдыхаем...',
    //   'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    //   'Вот это тачка!'
    // ];

    // let objects = [];

    // let getRandomNum = function(min,max) {
    //   return Math.floor(Math.random() * (max - min) + min)
    // };

    // let createObj = function(i, comments, descriptions) {
    //   let obj = {
    //     url: 'photos/' + i + '.jpg',
    //     likes: getRandomNum(15, 200),
    //     description: descriptions[getRandomNum(0, descriptions.length)],

    //     createComments: function(count, commentsArr) {
    //       obj.comments = [];
    //       for(let i = 0; i < count; i++) {
    //         obj.comments.push(commentsArr[getRandomNum(0, commentsArr.length)]);
    //       }
    //       return obj.comments;
    //     }
    //   };
    //   obj.createComments(getRandomNum(1,5), comments);
    //   return obj;
    // };

    // for(var i = 1; i <= 25; i++) {
    //   objects.push(createObj(i, comments, descriptions));
    // }

    // console.log(objects);


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
      console.log(objects);
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
        console.log(it);
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

    // pictures.forEach(function(it, i){
    //   it.addEventListener('click', function(){
    //     showImage(objects[i]);
    //   });
    // });

    let onSuccess = function(data) {
      console.log(data);
      picturesList.appendChild(renderPicture(data));
      let pictures = picturesList.querySelectorAll('.picture');
      pictures.forEach(function(it, i){
        it.addEventListener('click', function(){
          console.log(data[i]);
          showImage(data[i]);
        });
      });
    }

    let onError = function(message) {
      console.log(message);
    }

    window.backend.load(onSuccess, onError);
})();
