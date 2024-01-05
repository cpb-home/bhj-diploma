/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  
  const xhr = new XMLHttpRequest;
  xhr.responseType = 'json';
  xhr.open( options.method, options.url );

  xhr.onload = function() {
    options.callback(xhr.response.error, xhr.response);
  };
  xhr.onerror = function() { 
    console.log(new Error('Ошибка createRequest 2: \nВозникла ошибка при работе xhr'));
  };

  try {
    xhr.send(options.data);
  } catch(er) {
    console.error(er);
  }
};