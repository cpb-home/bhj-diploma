/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  static URL = '/user';
  
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    window.localStorage.setItem('user', JSON.stringify(user));
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    window.localStorage.removeItem('user');
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    return window.localStorage.hasOwnProperty('user') ? JSON.parse(window.localStorage.user) : '';
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(callback) {
    /*

    Извлекает данные о текущем авторизованном пользователе. Пользуется функцией createRequest.

Метод fetch принимает 1 аргумент: callback. В качестве ответа в callback будет объект вида:

{
    "success": true,
    "user": {
        "id": 2,
        "name": "Vlad",
        "email": "l@l.one",
        "created_at": "2019-03-06 18:46:41",
        "updated_at": "2019-03-06 18:46:41"
    }
}
Например:

User.fetch(( err, response ) => {
  console.log( response.user.id ); // 2
});
Если пользователь не авторизован, то будет возвращён объект вида:

{
    "success": false,
    "error": "Необходима авторизация"
}
Если в результате есть данные об авторизованном пользователе, необходимо обновить данные текущего пользователя (для этого вызывайте метод setCurrent):

console.log( User.current()); // undefined
User.fetch(( err, response ) => {
  console.log( response.user.name ); // Vlad
  console.log( User.current().name ); // Vlad
});
Если данных о пользователе нет (success = false), необходимо удалить запись об авторизации (для этого вызывайте метод unsetCurrent):

console.log( User.current()); // { id: 47, name: 'Vlad' }
User.fetch(( err, response ) => {
  // Оказалось, что пользователь уже больше не авторизован (истекла сессия)
  console.log( response.user ); // undefined
  console.log( response.success ); // false
  console.log( User.current() ); // undefined
});
Метод посылает GET запрос на адрес, заданный по формату URL + '/current'. Метод запускает выполнение функции createRequest.

    */
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback) {
    createRequest({
      url: this.URL + '/login',
      method: 'POST',
      responseType: 'json',
      data,
      callback
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback) {

  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(callback) {
    createRequest({
      url: this.URL + '/logout',
      method: 'POST',
      responseType: 'json',
      callback
    });
    User.unsetCurrent();
  }
}


/*
const formData = new FormData();
formData.append('email', 'demo@demo');
formData.append('password', 'demo');

cal = (err, response) => {
  if (response) {console.log(response);}
  if (err){console.log(err);}
}

const y = new User;
const user = User.login(formData, cal);
*/