/**
 * Класс Transaction наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/transaction'
 * */
class Transaction extends Entity {
  static URL = '/transaction';


  static list(id = '', callback){
    const options = {
      callback,
      method: 'GET',
      url: this.URL + '?account_id=' + id
    };
    createRequest(options);
  }
}