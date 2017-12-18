import { Component, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Store } from 'redux';

import { AppStore } from './../store/store.token';
import { AppState } from './../models/app-state.model';
import { appStoreProvider } from './../store/app.store';
import { WidgetModel } from '../models/converter-widget.model';
import { Constants } from '../constants/app.constants';
import { HttpServiceProvider } from '../services/http-service.component';
import { CurrencyModel } from '../models/app.currency.model';
import * as WidgetActions from '../actions/widget.actions';
import {validateCurrency} from '../utils/app.validator';

@Component({
  selector: 'converter-widget',
  templateUrl: 'app/views/converter-widget.component.htm',
  providers: [HttpServiceProvider],
})

export class ConverterComponent { 
  
  static widgetMark:number = -1;
  widgetInstance:number;
  _widgetModel:WidgetModel;
  currencyTypes:string[] = Constants.CURRENCY_TYPES_ARRAY;
  httpErrFlg:boolean = false;
  httpErrMsg:string =  Constants.HTTP_ERROR_MSG
  disclaimerStatus:boolean = false;

  constructor(private _httpservice: HttpServiceProvider,
    @Inject(AppStore) private store: Store<AppState>
  ) { 
    this.widgetInstance = ++ConverterComponent.widgetMark;
    this._widgetModel =
      new WidgetModel(new CurrencyModel(), new CurrencyModel(Constants.CURRENCY_TYPES_ARRAY[1]));
    store.subscribe(() => this.loadWidgetFromStore());
    this.loadWidgetFromStore();
  }

  loadWidgetFromStore(){
    this._widgetModel = this.store.getState().widgetModels[this.widgetInstance];
    this.httpErrFlg = !this.store.getState().isHttpRatesFetched;
  }

  synthesisEvent = (value: any, name: string, type: string) => {
    return {'target': { value, name, type}};
  }

  onInputChange(event: any){
    if(this.ValidateInputField(event)){
      this._widgetModel.fromCurrency.currencyValue = event.target.value;
      this.calculateRates();      
    }
  }

  onSelectionChange(event: any) {
    this.httpErrFlg = false;
    if(event.target.name === Constants.FROM_CURRENCY){

        if(event.target.value === this._widgetModel.toCurrency.currencyType){
          this._widgetModel.switchCurrencies();
        } else {
          this._widgetModel.fromCurrency.currencyType = event.target.value;
        }
        this.fetchAndCalcCurRates(this._widgetModel.fromCurrency.currencyType);

    } else {

        if(event.target.value === this._widgetModel.fromCurrency.currencyType) {
            this._widgetModel.switchCurrencies();
            this.fetchAndCalcCurRates(this._widgetModel.fromCurrency.currencyType);
        } else {
          this._widgetModel.toCurrency.currencyType = event.target.value;
          this.calculateRates();
        }

    }
  }
  
  fetchAndCalcCurRates(_baseCur){
    this._httpservice.fetch(Constants.API_URL, 'base=' + _baseCur)
      .subscribe((response) => {
          if (Object.keys(response).length !== 0) {
            this._widgetModel.fromCurrency.currencyRates = response;
            this.calculateRates();
          } else {
            this.httpErrFlg = true;
          }
      });
  }

  keyBindVerify(event){
    if(event.which == 32 || event.which == 13){
      this.toggleDisclaimer();
    }
  }

  toggleDisclaimer() {
    this.disclaimerStatus = !this.disclaimerStatus;
  }
  
  calculateRates(){
    this._widgetModel.toCurrency.currencyValue = Number(
      (this._widgetModel.fromCurrency.currencyRates.rates[this._widgetModel.toCurrency.currencyType] *
      this._widgetModel.fromCurrency.currencyValue).toFixed(2));
      this.store.dispatch(WidgetActions.updateCurrencyValues(this._widgetModel,this.widgetInstance));
  }

  ValidateInputField(event:any){
    if(this.httpErrFlg){
      return false;
    }
    return true;
  }

}
