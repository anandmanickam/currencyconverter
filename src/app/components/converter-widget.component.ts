import { Component, Inject, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Store } from 'redux';
import { AppStore } from './../store/store.token';
import { AppState } from './../models/app-state.model';
import { appStoreProviders } from './../store/app.store';
import { WidgetModel } from '../models/converter-widget.model';
import { Constants } from '../constants/app.constants';
import { HttpServiceProvider } from '../services/http-service.component';

@Component({
  selector: 'converter-widget',
  templateUrl: 'app/views/converter-widget.component.htm',
  providers: [appStoreProviders, HttpServiceProvider]
})

export class ConverterComponent implements OnInit{ 

  static WidgetCount = 0;
  _widgetModel:WidgetModel;
  widgetInstance:number;
  httpErrorObj:any = {
    httpErrFlag: false,
    httpErrMsg: Constants.HTTP_ERROR_MSG
  };
  disclaimerStatus:boolean = false;

  constructor(private _httpservice: HttpServiceProvider,
    @Inject(AppStore) private store: Store<AppState>
  ) { 
    this.widgetInstance = ConverterComponent.WidgetCount;
    ConverterComponent.WidgetCount ++;
    this.loadWidgetFromStore();
  }

  loadWidgetFromStore(){
    console.log('Store State ->', this.store.getState(), this.store.getState().widgetModels[this.widgetInstance] );
  }
  ngOnInit(){
    console.log('oninit Store State ->', this.store.getState(), this.store.getState().widgetModels[this.widgetInstance]);
  }
  // onInputChange(event: any){

  //   if (this.isValidEvent(event)){
  //      this.calculateRates(event);      
  //    }

  // }

  // onSelectionChange(event: any) {
  //   if (this.isValidEvent(event)) {
  //       this.invokeHttpServiceAndFetch(
  //         event.target.value,
  //         (response:any)=>{
  //           if (Object.keys(response).length !== 0) {
  //             this.componentModel[event.target.name].currencyRates = response;
  //             this.calculateRates(event);
  //             this.resetCurrencyTypeOptions();
  //           } else {
  //             /* Stop further processing */
  //           }
  //       });
  //   }
  // }

  // synthesisEvent = (value: any, name: string, type: string) => {
  //   return {'target': { value, name, type}};
  // }
  
  // toggleDisclaimer() {
  //   this.disclaimerStatus = !this.disclaimerStatus;
  // }

  // resetCurrencyTypeOptions(){
  //   this.fromCurrencyTypes = Constants.CURRENCY_TYPES_ARRAY;
  //   this.toCurrencyTypes = [];
  //   for(var _cur in Constants.CURRENCY_TYPES_ARRAY){
  //     if (Constants.CURRENCY_TYPES_ARRAY[_cur] !== 
  //         this.componentModel[Constants.FROM_CURRENCY].currencyType) {
  //       this.toCurrencyTypes.push(Constants.CURRENCY_TYPES_ARRAY[_cur]);
  //     }
  //   }
  // }

  // invokeHttpServiceAndFetch(value:string, callback:any){
  //   this._httpservice.getLatestCurrencyRates(value)
  //     .subscribe(response => {
  //       this.httpErrorObj.httpErrFlag = false;
  //       callback(response)
  //     },
  //   error => {
  //     console.log('Error in HTTP Fetch', error);
  //     this.httpErrorObj.httpErrFlag = true;
  //     callback({});
  //   });
  // }

  // getOtherItem(item:string){

  //   if (item === Constants.FROM_CURRENCY){
  //     return Constants.TO_CURRENCY;
  //   }
  //   return Constants.FROM_CURRENCY;

  // }
  
  // /* Picking the target element to apply the change and the focus element where the 
  // event is applied. The value is taken from the focus element and calculated
  // LOGIC - FROMCURRENCY_VALUE * TO_CURRENCYBASERATE = TO_CURRENCY_VALUE and
  // TO_CURRENCY_VALUE * FROM_CURRENCYBASERATE = FROMCURRENCY_VALUE*/
  // calculateRates(event:any){
  //   var targetElementToChange: string, 
  //       focusCurrencyToCalculateFrom: string;
  //   if(event.target.type === Constants.EVENT_TYPE_NUMBER ) {
  //     targetElementToChange = this.getOtherItem(event.target.name);
  //     focusCurrencyToCalculateFrom = event.target.name;
  //   } else if (event.target.type === Constants.EVENT_TYPE_SELECT) {
  //     targetElementToChange = Constants.TO_CURRENCY;
  //     focusCurrencyToCalculateFrom = Constants.FROM_CURRENCY;
  //   }
  //   var targetCurrencyType: string = 
  //     this.componentModel[targetElementToChange].currencyType;
  //   var targetCurrencyRate: number = 
  //     this.componentModel[focusCurrencyToCalculateFrom].currencyRates.rates[targetCurrencyType];
    
  //   this.componentModel[targetElementToChange].currencyValue =
  //     this.componentModel[focusCurrencyToCalculateFrom].currencyValue * targetCurrencyRate;
  // }

  // isValidEvent(event:any){
  //   if(this.httpErrorObj.httpErrFlag){
  //     return false;
  //   }
  //   var isValidEvent:boolean = false;
  //   switch (event.target.type) {
  //     case Constants.EVENT_TYPE_NUMBER: {
  //       if(event.target.name === Constants.FROM_CURRENCY) {
  //         if (typeof event.target.value !== 'number' || event.target.value < 0){
  //           this.fromCurErrMsg = Constants.HTTP_INPUT_ERROR_MSG;
  //         }else{
  //           this.componentModel.fromCurrency.currencyValue = parseFloat(event.target.value);
  //           this.fromCurErrMsg = '';
  //           isValidEvent = true;
  //         }
  //       } else if (event.target.name === Constants.TO_CURRENCY) {
  //         if (typeof event.target.value !== 'number' || event.target.value < 0) {
  //           this.toCurErrMsg = Constants.HTTP_INPUT_ERROR_MSG;
  //         } else {
  //           this.componentModel.toCurrency.currencyValue = parseFloat(event.target.value);
  //           this.toCurErrMsg = '';
  //           isValidEvent = true;
  //         }
  //       }
  //       isValidEvent = true;
  //       break;
  //     }
  //     case Constants.EVENT_TYPE_SELECT: {
  //       if(event.target.name === Constants.FROM_CURRENCY && 
  //         event.target.value === this.componentModel.toCurrency.currencyType){
  //           this.componentModel.switchCurrencies();
  //           this.resetCurrencyTypeOptions();
  //           this.calculateRates({
  //             target: {
  //               'name': Constants.FROM_CURRENCY,
  //               'type': Constants.EVENT_TYPE_NUMBER
  //             }
  //           });
  //         } else {
  //           if (event.target.name === Constants.FROM_CURRENCY){
  //             this.componentModel.fromCurrency.currencyType = event.target.value;
  //           } else {
  //             this.componentModel.toCurrency.currencyType = event.target.value;
  //           }
  //           isValidEvent = true;
  //         }
  //       break;
  //     }
  //   }
  //   return isValidEvent;
  // }

}
