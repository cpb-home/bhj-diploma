/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
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
        this.element.reset();
        App.setState( 'user-logged' );
        App.modals.login.close();
        User.setCurrent({id: response.user.id, name: response.user.name});
        App.update();
      }
    };
    User.login(data, callback);
  }
}