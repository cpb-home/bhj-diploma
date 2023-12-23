/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  
  const xhr = new XMLHttpRequest;
  xhr.responseType = options.responseType;

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
/*
const formData = new FormData();
formData.append('email', 'demo@demo');
formData.append('password', 'demo');
const options = {
  url: '/user/login',
  method: 'POST',
  data: formData,
  callback: (err, response) => {
    if (response) {console.log(response);}
    if (err){console.log(err);}
}
}
createRequest(options);
*/