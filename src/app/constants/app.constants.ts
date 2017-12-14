export class Constants {

  static CURRENCY_TYPES_ARRAY: string[] = ['USD', 'CAD', 'EUR'];
  static FROM_CURRENCY:string = 'fromCurrency';
  static TO_CURRENCY:string = 'toCurrency';
  static EVENT_TYPE_NUMBER = 'number';
  static EVENT_TYPE_SELECT = 'select-one';
  static CONFIG_ERROR_MSG = 'Application failed to initialize due to a configuration error. Please contact your app admin or try again after sometime.';
  static HTTP_ERROR_MSG = 'The Connection seems to be broken at the moment. Please try after sometime.';
  static HTTP_INPUT_ERROR_MSG = 'Enter a positive currency amount';
  static API_URL = 'https://api.fixer.io/latest';
  static WIDGET_INSTANCE = 3;
}

export class ActionTypes {
  static LOAD_STORE = "LOAD_STORE";
}