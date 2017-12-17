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

@Component({
  selector: 'converter-widget',
  templateUrl: 'app/views/converter-widget.component.htm',
  providers: [HttpServiceProvider]
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
    console.log('loading from store...');
    this._widgetModel = this.store.getState().widgetModels[this.widgetInstance];
    this.httpErrFlg = !this.store.getState().isHttpRatesFetched;
  }

  synthesisEvent = (value: any, name: string, type: string) => {
    return {'target': { value, name, type}};
  }

  onInputChange(event: any){
    if(this.ValidateEvent(event)){
      this.calculateRates(event);      
    }
  }

  onSelectionChange(event: any) {
    this.httpErrFlg = false;
    var _currbase:string = this._widgetModel.fromCurrency.currencyType;
    if(event.target.name === Constants.FROM_CURRENCY){
        if(event.target.value === this._widgetModel.toCurrency.currencyType){
          this._widgetModel.switchCurrencies();
        } else {
          _currbase = event.target.value;
        }

        this._httpservice.fetch(Constants.API_URL, 'base=' + _currbase)
          .subscribe((response) => {
            if (Object.keys(response).length !== 0) {
              this._widgetModel.fromCurrency.currencyRates = response;
            } else {
              this.httpErrFlg = true;
            }
          });

    } else {

      if(event.target.value === this._widgetModel.fromCurrency.currencyType){
          this._widgetModel.switchCurrencies();

          this._httpservice.fetch(Constants.API_URL, 'base=' + this._widgetModel.fromCurrency.currencyType)
          .subscribe((response) => {
            if (Object.keys(response).length !== 0) {
              this._widgetModel.fromCurrency.currencyRates = response;
            } else {
              this.httpErrFlg = true;
            }
          });
      }

    }
    this.calculateRates(event);
  }
  
  toggleDisclaimer() {
    this.disclaimerStatus = !this.disclaimerStatus;
  }
  
  calculateRates(event:any){
    this._widgetModel.fromCurrency.currencyValue = event.target.value;
    this._widgetModel.toCurrency.currencyValue = Number(
      (this._widgetModel.fromCurrency.currencyRates.rates[this._widgetModel.toCurrency.currencyType] *
      this._widgetModel.fromCurrency.currencyValue).toFixed(2));
      this.store.dispatch(WidgetActions.updateCurrencyValues(this._widgetModel,this.widgetInstance));
  }

  ValidateEvent(event:any){
    if(this.httpErrFlg){
      return false;
    }
    if(!new RegExp(/^[0-9]\d*(\.\d+)?$/).test(event.target.value)){   
        event.target.value = this._widgetModel.fromCurrency.currencyValue;
    }
    return true;
  }
}
