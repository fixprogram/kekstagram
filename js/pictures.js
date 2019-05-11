(function() {

    "use strict";

    const comments = [
      'Всё отлично!',
      'В целом всё неплохо. Но не всё.',
      'Когда выделаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
      'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
      'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
      'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
    ];
    const descriptions = [
      'Тестим новую камеру!',
      'Затусили с друзьям и на море',
      'Как же круто тут кормят',
      'Отдыхаем...',
      'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
      'Вот это тачка!'
    ];

    let objects = [];

    let getRandomNum = function(min,max) {
      return Math.floor(Math.random() * (max - min) + min)
    };

    let createObj = function(i, comments, descriptions) {
      let obj = {
        url: 'photos/' + i + '.jpg',
        likes: getRandomNum(15, 200),
        description: descriptions[getRandomNum(0, descriptions.length)],

        createComments: function(count, commentsArr) {
          obj.comments = [];
          for(let i = 0; i < count; i++) {
            obj.comments.push(commentsArr[getRandomNum(0, commentsArr.length)]);
          }
          return obj.comments;
        }
      };
      obj.createComments(getRandomNum(1,5), comments);
      return obj;
    };

    for(var i = 1; i <= 25; i++) {
      objects.push(createObj(i, comments, descriptions));
    }

    console.log(objects);


    let pictures = document.querySelector('.pictures');
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
        fragment.appendChild(createPictureElement(objects[i].url, objects[i].comments, objects[i].likes));
      }
      return fragment;
    };

    pictures.appendChild(renderPicture(objects));


    let bigPicture = document.querySelector('.big-picture');
    bigPicture.classList.remove('hidden');

    bigPicture.querySelector('.big-picture__img img').src = objects[0].url;
    bigPicture.querySelector('.likes-count').textContent = objects[0].likes;
    bigPicture.querySelector('.comments-count').textContent = objects[0].comments.length;

    let commentsList = bigPicture.querySelector('.social__comments');

    let renderComment = function(comment) {
      let commentElement = commentsList.querySelector('.social__comment').cloneNode(true);
      commentElement.querySelector('.social__picture').src = 'img/avatar-'+ getRandomNum(1, 6) + '.svg';
      commentElement.querySelector('.social__text').textContent = comment;
      return commentElement;
    };

    objects[0].comments.forEach(function(it){
      commentsList.appendChild(renderComment(it));
    });

    bigPicture.querySelector('.social__caption').textContent = objects[0].description;

    bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
    bigPicture.querySelector('.social__comments-loader').classList.add('visually-hidden');

})();
