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
        console.log(err);
      } else {
        const formList = this.element.querySelector('.accounts-select');
        formList.textContent = '';
        response.data.forEach(data => {
          const option = document.createElement('option');
          option.value = data.id;
          option.textContent = data.name;
          formList.append(option);
        })
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
        const messageBlock = this.element.closest('.modal-body').querySelector('.infoMessage');
        messageBlock.style.visibility = 'visible';
        messageBlock.style.color = 'red';
        messageBlock.textContent = err;
        setTimeout(() => {
          messageBlock.style.visibility = 'hidden';
          messageBlock.style.color = 'black';
        }, 5000);
      } else {
        App.update();
        this.element.reset();
        this.element.closest('.modal ').style.display = 'none';
      }
    }
    Transaction.create(data, callback);
  }
}