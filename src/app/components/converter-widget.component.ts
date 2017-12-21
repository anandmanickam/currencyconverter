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

/**
 * The actual converter widget component. It subscribes to changes in the store model and receives data 
 * from the store to initialises its internal data model. Upon user induced state change, fires up the 
 * dispatch action calls to update the store model.
 * 
 * @export
 * @class ConverterComponent
 */
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

  /**
   * Creates an instance of ConverterComponent. It also subscribes to the store model to update the 
   * widget's internal state model to reflect the changes at the view layer.
   * @param {HttpServiceProvider} _httpservice 
   * @param {Store<AppState>} store 
   * 
   * @memberOf ConverterComponent
   */
  constructor(private _httpservice: HttpServiceProvider,
    @Inject(AppStore) private store: Store<AppState>
  ) { 
    this.widgetInstance = ++ConverterComponent.widgetMark;
    this._widgetModel =
      new WidgetModel(new CurrencyModel(), new CurrencyModel(Constants.CURRENCY_TYPES_ARRAY[1]));
    store.subscribe(() => this.loadWidgetFromStore());
    this.loadWidgetFromStore();
  }

  /**
   * Loads the widget model from the store model
   * @memberOf ConverterComponent
   */
  loadWidgetFromStore(){
    this._widgetModel = this.store.getState().widgetModels[this.widgetInstance];
    this.httpErrFlg = !this.store.getState().isHttpRatesFetched;
  }
   
  synthesisEvent = (value: any, name: string, type: string) => {
    return {'target': { value, name, type}};
  }

  /**
   * This function is triggered on change in the value of input field. It validates the state of the
   * widget and triggers the calculation method
   * 
   * @param {*} event 
   */
  onInputChange(event: any){
    if(this.ValidateInputField(event)){
      this._widgetModel.fromCurrency.currencyValue = event.target.value;
      this.calculateRates();      
    }
  }

  /**
   * This function is triggered on change in the value of currency type selection field.
   * If the, from currency rate is changed it loads a new exchange rate by invoking the http service
   * else it just assigns the value to the widget model and triggers the calculation method
   * 
   * @param {*} event 
   */
  onSelectionChange(event: any) {
    this.httpErrFlg = false;
    if(event.target.name === Constants.FROM_CURRENCY){
      this._widgetModel.fromCurrency.currencyType = event.target.value;
      this.fetchAndCalcCurRates(this._widgetModel.fromCurrency.currencyType);
    } else {
      this._widgetModel.toCurrency.currencyType = event.target.value;
    }
    this.calculateRates();
    }
  
  /**
   * Acceps the url and base currency and invokes a call to the http service to fetch the lates currency.
   * The subscription sets the response to the from currency rates and invokes the calculation method.
   * In case of failure, sets the httpError Flag and stops further propagation.
   * 
   * @param {string} _baseCur 
   * 
   * @memberOf ConverterComponent
   */
  fetchAndCalcCurRates(_baseCur:string){
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

  keyBindVerify(event:KeyboardEvent){
    if(event.which == 32 || event.which == 13){
      this.toggleDisclaimer();
    }
  }

  toggleDisclaimer() {
    this.disclaimerStatus = !this.disclaimerStatus;
  }
  

  /**
   * The primary method to calculate the currency rates.
   * Logic -> (From Currency value or 0 ) * (conversion currency rate or 1).    
   * Single point exit route to store dispatch.
   * 
   * @memberOf ConverterComponent
   */
  calculateRates(){
    this._widgetModel.toCurrency.currencyValue = 
    (Number((
      ( this._widgetModel.fromCurrency.currencyRates.rates[this._widgetModel.toCurrency.currencyType] || 1) *
      ( Number.parseFloat(this._widgetModel.fromCurrency.currencyValue)  || 0)
    ).toFixed(2))).toString();
      this.store.dispatch(WidgetActions.updateCurrencyValues(this._widgetModel,this.widgetInstance));
  }


  /**
   * Validates if the event can propagate by checking the validity of conversion rates
   * 
   * @param {*} event 
   * @returns 
   * 
   * @memberOf ConverterComponent
   */
  ValidateInputField(event:any){
    if(this.httpErrFlg){
      return false;
    }
    return true;
  }

}
