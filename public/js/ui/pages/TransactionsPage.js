/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    if (!element) {
      throw new Error('Не удалось найти элемент');
    } else {
      this.element = element;
      this.registerEvents();
    }
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    this.render(this.lastOptions);
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    const deleteAccountBtn = this.element.querySelector('.remove-account');
    const deleteTransactionBtns = this.element.querySelectorAll('.transaction__remove');

    deleteAccountBtn.addEventListener('click', () => this.removeAccount());

    deleteTransactionBtns.forEach(btn => {
      btn.addEventListener('click', () => this.removeTransaction(btn.dataset.id));
    })
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.updateWidgets() и App.updateForms(),
   * либо обновляйте только виджет со счетами и формы создания дохода и расхода
   * для обновления приложения
   * */
  removeAccount() {
    if (confirm('Вы точно хотите удалить текущий аккаунт?\nЭто действие невозможно будет отменить.')) {
      const callback = (err, response) => {
        if (err) {
          throw new Error(err);
        } else {
          App.updateWidgets();
          App.updateForms();
        }
      };
      const formDdata = new FormData();
      formDdata.append('id', this.lastOptions.account_id);
      Account.remove(formDdata, callback);
      this.clear();
    }
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update(),
   * либо обновляйте текущую страницу (метод update) и виджет со счетами
   * */
  removeTransaction( id ) {
    if (confirm('Вы точно хотите удалить данную операцию?\nЭто действие невозможно будет отменить.')) {
      const callback = (err, response) => {
        if (err) {
          throw new Error(err);
        } else {
          this.update();
          App.update();
        }
      };
      const formDdata = new FormData();
      formDdata.append('id', id);
      Transaction.remove(formDdata, callback);
    }
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options){
    if (options) {
      this.lastOptions = options;
      const callback = (err, response) => {
        if (err) {
          throw new Error(err);
        } else {
          this.renderTitle(response.data.name);
          const transactionCallback = (error, resp) => {
            if (error) {
              throw new Error(error);
            } else {
              this.renderTransactions(resp.data);
            }
          };
          Transaction.list(response.data.id, transactionCallback);
        }
      };
      Account.get(options.account_id, callback);
    }
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTransactions([]);
    const title = document.querySelector('.content-title');
    title.textContent = 'Название счета';
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name){
    const title = document.querySelector('.content-title');
    title.textContent = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(date){
    const dat = new Date(date);
    const options = { year: 'numeric', month: 'long', day: 'numeric',  hour: 'numeric', minute: 'numeric'};
    return dat.toLocaleDateString('ru-RU', options);
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item){
    const date = this.formatDate(item.created_at);
    const transactionType = 'transaction_' + item.type;
    const element = `
      <div class="transaction ${transactionType} row">
        <div class="col-md-7 transaction__details">
          <div class="transaction__icon">
              <span class="fa fa-money fa-2x"></span>
          </div>
          <div class="transaction__info">
              <h4 class="transaction__title">${item.name}</h4>
              <!-- дата -->
              <div class="transaction__date">${date}</div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="transaction__summ">
          <!--  сумма -->
              ${item.sum} <span class="currency">₽</span>
          </div>
        </div>
        <div class="col-md-2 transaction__controls">
            <!-- в data-id нужно поместить id -->
            <button class="btn btn-danger transaction__remove" data-id="${item.id}">
                <i class="fa fa-trash"></i>  
            </button>
        </div>
      </div>
    `;

    return element;
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data){
    const contentSection = this.element.querySelector('.content');
    contentSection.textContent = '';
    data.forEach(item => contentSection.insertAdjacentHTML('BeforeEnd', this.getTransactionHTML(item)));
    //this.registerEvents();
  }
  
}