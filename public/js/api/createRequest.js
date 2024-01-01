/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  
  const xhr = new XMLHttpRequest;
  xhr.responseType = 'json';

  try {
    xhr.open( options.method, options.url );
    xhr.send(options.data);

    xhr.onload = function() {
      options.callback(xhr.response.error, xhr.response);
    };
    xhr.onerror = function() { 
      console.log(new Error('Ошибка createRequest 2: \nВозникла ошибка при работе xhr'));
    };
  } catch(er) {
    console.error(er);
  }
};