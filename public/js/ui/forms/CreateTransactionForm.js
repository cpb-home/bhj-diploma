/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const callback = (err, response) => {
      if (err) {
        throw new Error(err);
      } else {
        const formList = this.element.querySelector('.accounts-select'); 
        
        formList.innerHTML = response.data.reduce((acc, e) => {
          let currentRow = '<option value="' + e.id + '">' + e.name + '</option>';
          return acc + currentRow;
        }, '');
      }
    }
    Account.list('', callback);
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    const callback = (err, response) => {
      if (err) {
        App.modalErrorMessage(this.element, err);
      } else {
        App.update();
        this.element.reset();
        this.element.closest('.modal ').style.display = 'none';
      }
    }
    Transaction.create(data, callback);
  }
}