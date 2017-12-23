export class Constants {
  static WIDGET_INSTANCE = 3;
  static CURRENCY_TYPES_ARRAY: string[] = ['USD', 'CAD', 'EUR'];
  static FROM_CURRENCY: string = 'fromCurrency';
  static TO_CURRENCY: string = 'toCurrency';
  static CONFIG_ERROR_MSG =
    'Application failed to initialize due to a configuration error. Please contact your app admin or try again after sometime.';
  static HTTP_ERROR_MSG = 'The Connection seems to be broken at the moment. Please try after sometime.';
  static HTTP_INPUT_ERROR_MSG = 'Enter a positive currency amount';
  static API_URL = 'https://api.fixer.io/latest';
}

export class ActionTypes {
  static LOAD_STORE = 'LOAD_STORE';
  static UPDATE_CURRENCY_VALUES = 'UPDATE_CURRENCY_VALUES';
  static UPDATE_FROM_CURRENCY_TYPE = 'UPDATE_FROM_CURRENCY_TYPE';
  static UPDATE_TO_CURRENCY_TYPE = 'UPDATE_TO_CURRENCY_TYPE';
}
