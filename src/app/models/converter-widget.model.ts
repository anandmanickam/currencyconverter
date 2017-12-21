import {CurrencyModel} from './app.currency.model';

/**
 * The Widget model that consists of two copies of currency model for both conversion currency
 * and converted currency.   
 * 
 * @export
 * @class WidgetModel
 */
export class WidgetModel {

  fromCurrency: CurrencyModel;
  toCurrency: CurrencyModel;

  constructor(_fromCurrency: CurrencyModel, _toCurrency: CurrencyModel){
    this.fromCurrency = _fromCurrency;
    this.toCurrency = _toCurrency
  }

  switchCurrencies(){
    [this.fromCurrency, this.toCurrency] = [this.toCurrency, this.fromCurrency];
  }
}