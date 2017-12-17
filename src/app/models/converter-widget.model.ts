import {CurrencyModel} from './app.currency.model';

export class WidgetModel {

  fromCurrency: CurrencyModel;
  toCurrency: CurrencyModel;

  constructor(_fromCurrency: CurrencyModel, _toCurrency: CurrencyModel){
    this.fromCurrency = _fromCurrency;
    this.toCurrency = _toCurrency
  }

  switchCurrencies(){
    var _temp:CurrencyModel = new CurrencyModel();
    _temp = this.fromCurrency;
    this.fromCurrency = this.toCurrency;
    this.toCurrency = _temp;
  }
}