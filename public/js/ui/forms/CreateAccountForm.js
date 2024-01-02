/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
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
        App.modals.createAccount.close();
      }
    };
    Account.create(data, callback);
  }
}