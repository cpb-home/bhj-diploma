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
        App.modalErrorMessage(this.element, err);
      } else {
        App.update();
        this.element.reset();
        App.modals.createAccount.close();
      }
    };
    Account.create(data, callback);
  }
}