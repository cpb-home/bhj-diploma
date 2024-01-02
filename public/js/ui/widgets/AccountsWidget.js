/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */

class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (!element) {
      throw new Error('Не удалось найти элемент');
    } else {
      this.element = element;
      this.registerEvents();
      this.update();
    }
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    const createBtn = document.querySelector('.create-account');
    const accountsList = document.querySelectorAll('.account');

    createBtn.addEventListener('click', () => App.getModal('createAccount').open());

    accountsList.forEach(account => {
      account.addEventListener('click', () => {
        this.onSelectAccount(account);
      });
    });
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    const user = User.current();
    if (user) {
      const callback = (err, response) => {
        if (err) {
          console.log(err);
        } else {
          this.clear();
          this.renderItem(response.data);
          this.registerEvents();
        }
      };
      Account.list('', callback);
    }
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    const accountEls = this.element.querySelectorAll('.account');
    accountEls.forEach(el => el.remove());
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount( element ) {
    const accounts = document.querySelectorAll('.account');
    accounts.forEach(account => account.classList.remove('active'));
    element.classList.add('active');
    App.showPage( 'transactions', { account_id: element.dataset.id });
    App.update();
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item){
    const li = document.createElement('li');
    const a = document.createElement('a');
    const spanName = document.createElement('span');
    const spanSum = document.createElement('span');

    li.className = 'account';
    li.dataset.id = item.id
    a.href = '#';
    a.textContent = ' / ';
    spanName.textContent = item.name;
    spanSum.textContent = item.sum;

    a.prepend(spanName);
    a.append(spanSum);
    li.append(a);

    return li;
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(data){
    data.forEach(item => this.element.append(this.getAccountHTML(item)));
  }
}
