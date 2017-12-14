import { Constants } from '../constants/app.constants';

export class CurrencyModel {

  currencyType: string;
  currencyValue: number;
  currencyRates: {}; //Mandator for fromCurrency and optional for toCurrency

  constructor(
    _currencyType: string = Constants.CURRENCY_TYPES_ARRAY[0],
    _currencyValue: number = 0.00,
    _currencyRates?: {}
  ){
    this.currencyType = _currencyType;
    this.currencyValue = _currencyValue;
    this.currencyRates = _currencyRates || {};
  }

}