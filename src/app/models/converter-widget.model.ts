import {CurrencyModel} from './app.currency.model';

export class WidgetModel {

  static instanceId:number = 0;
  instanceName:number;

  fromCurrency: CurrencyModel;
  toCurrency: CurrencyModel;


  constructor(_fromCurrency: CurrencyModel, _toCurrency: CurrencyModel){
    this.fromCurrency = _fromCurrency;
    this.toCurrency = _toCurrency
    this.instanceName = WidgetModel.instanceId;
    WidgetModel.instanceId++; 
  }

  switchCurrencies() {

    var _tempCurrency = new CurrencyModel();
    _tempCurrency = this.toCurrency;
    this.toCurrency = this.fromCurrency;
    this.fromCurrency = _tempCurrency;

  }
  
}