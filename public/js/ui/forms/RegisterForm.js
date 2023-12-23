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
        console.log(err);
      } else {
        this.element.reset();
        App.setState( 'user-logged' );
        App.modals.login.close();
      }
    };
    User.register(data, callback);
  }
}