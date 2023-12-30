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
    document.querySelector('.user-name').textContent = user.name;
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    window.localStorage.removeItem('user');
    document.querySelector('.user-name').textContent = "";
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    return window.localStorage.hasOwnProperty('user') ? JSON.parse(window.localStorage.user) : undefined;
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(callback) {
    const LS = this.current() ? this.current() : 0;
    if (LS) {
      const options = {
        method: 'GET',
        url: this.URL + '/current?id=' + LS.id,
        responseType: 'json',
        callback
      };
      createRequest(options);
    }
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