import {CurrencyModel} from './app.currency.model';

export class WidgetModel {

  fromCurrency: CurrencyModel;
  toCurrency: CurrencyModel;

  constructor(_fromCurrency: CurrencyModel, _toCurrency: CurrencyModel){
    this.fromCurrency = _fromCurrency;
    this.toCurrency = _toCurrency
  }

}