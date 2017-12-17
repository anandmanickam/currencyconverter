import {CurrencyModel} from './app.currency.model';

export class WidgetModel {

  fromCurrency: CurrencyModel;
  toCurrency: CurrencyModel;

  constructor(_fromCurrency: CurrencyModel, _toCurrency: CurrencyModel){
    this.fromCurrency = _fromCurrency;
    this.toCurrency = _toCurrency
  }

  switchCurrencies(){
    let _temp:CurrencyModel = Object.assign({}, this.fromCurrency);
    this.fromCurrency = Object.assign({}, this.toCurrency);
    _temp.currencyRates = {rates:{}};
    this.toCurrency = {..._temp};
  }
}