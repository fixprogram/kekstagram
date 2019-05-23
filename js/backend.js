(function() {

  const ServerUrl = {
    LOAD: 'https://js.dump.academy/kekstagram/data',
    UPLOAD: 'https://js.dump.academy/kekstagram'
  }

  const MessageText = {
    ERROR_LOAD: 'Произошла неизвестная ошибка. Пожалуйста, обновите страницу.',
    ERROR_SERVER: 'Произошла ошибка соединения. Пожалуйста, обновите страницу.',
    ERROR_TIMEOUT: 'Сервер долго не отвечает. Пожалуйста, обновите страницу.'
  };

  let createXhr = function(method, url, onSuccess, onError) {
    let xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function() {
      if(xhr.status === 200) {
        onSuccess(xhr.response);
      }
      else {
        onError(MessageText.ERROR_LOAD);
      }
    });

    xhr.addEventListener('error', function() {
      onError(MessageText.ERROR_SERVER);
    });

    xhr.addEventListener('timeout', function() {
      onError(MessageText.ERROR_TIMEOUT);
    });

    xhr.open(method, url);
    return xhr;
  }

  let load = function(onSuccess, onError) {
    createXhr('GET', ServerUrl.LOAD, onSuccess, onError).send();
  }

  let upload = function(onSuccess, onError, data) {
    createXhr('POST', ServerUrl.UPLOAD, onSuccess, onError).send(data);
  }

  window.backend = {
    load: load,
    upload: upload
  }

})();
