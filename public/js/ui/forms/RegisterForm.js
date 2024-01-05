/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    const callback = (err, response) => {
      if (err) {
        App.modalErrorMessage(this.element, err);
      } else {
        this.element.reset();
        App.setState( 'user-logged' );
        App.modals.register.close();
        User.setCurrent({id: response.user.id, name: response.user.name});
        App.update();
      }
    };
    User.register(data, callback);
  }
}