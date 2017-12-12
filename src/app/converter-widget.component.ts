import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Converter } from './converter-widget.model';
import { Constants } from './app.constants';
import { HttpService } from './http-services.component';

@Component({
  selector: 'converter-widget',
  templateUrl: 'app/converter-widget.component.htm',
  providers: [HttpService]
})

export class ConverterComponent implements OnInit{ 

  converterInstance:Converter;
  fromCurrencyTypes: string[] = Constants.CURRENCY_TYPES_ARRAY; 
  toCurrencyTypes: string[] = [];
  fromCurErrMsg: string;
  toCurErrMsg: string;
  httpErrorObj:any = {
    httpErrFlag: false,
    httpErrMsg: Constants.HTTP_ERROR_MSG
  };
  disclaimerStatus:boolean = false;

  constructor(private _httpservice: HttpService) {
    this.converterInstance = new Converter();
    this.resetCurrencyTypeOptions();
  }

  ngOnInit(){
      this.invokeHttpServiceAndFetch(
        this.converterInstance.fromCurrency.currencyType,
        (response:any)=>{
          if(Object.keys(response).length !== 0) {
            this.converterInstance.fromCurrency.currencyRates = response;
          }
      });
      this.invokeHttpServiceAndFetch(
        this.converterInstance.toCurrency.currencyType,
        (response: any)=> {
          if (Object.keys(response).length !== 0) {
            this.converterInstance.toCurrency.currencyRates = response;
            this.calculateRates({ 
              target: { 
                'name': Constants.FROM_CURRENCY, 
                'type': Constants.EVENT_TYPE_NUMBER 
              } 
            });
          }
      });
  }

  onInputChange(event: any){

    if (this.isValidEvent(event)){
       this.calculateRates(event);      
     }

  }

  onSelectionChange(event: any) {
    if (this.isValidEvent(event)) {
        this.invokeHttpServiceAndFetch(
          event.target.value,
          (response:any)=>{
            if (Object.keys(response).length !== 0) {
              this.converterInstance[event.target.name].currencyRates = response;
              this.calculateRates(event);
              this.resetCurrencyTypeOptions();
            } else {
              /* Stop further processing */
            }
        });
    }
  }

  synthesisEvent = (value: any, name: string, type: string) => {
    return {'target': { value, name, type}};
  }
  
  toggleDisclaimer() {
    this.disclaimerStatus = !this.disclaimerStatus;
  }

  resetCurrencyTypeOptions(){
    this.fromCurrencyTypes = Constants.CURRENCY_TYPES_ARRAY;
    this.toCurrencyTypes = [];
    for(var _cur in Constants.CURRENCY_TYPES_ARRAY){
      if (Constants.CURRENCY_TYPES_ARRAY[_cur] !== 
          this.converterInstance[Constants.FROM_CURRENCY].currencyType) {
        this.toCurrencyTypes.push(Constants.CURRENCY_TYPES_ARRAY[_cur]);
      }
    }
  }

  invokeHttpServiceAndFetch(value:string, callback:any){
    this._httpservice.getLatestCurrencyRates(value)
      .subscribe(response => {
        this.httpErrorObj.httpErrFlag = false;
        callback(response)
      },
    error => {
      console.log('Error in HTTP Fetch', error);
      this.httpErrorObj.httpErrFlag = true;
      callback({});
    });
  }

  getOtherItem(item:string){

    if (item === Constants.FROM_CURRENCY){
      return Constants.TO_CURRENCY;
    }
    return Constants.FROM_CURRENCY;

  }
  
  /* Picking the target element to apply the change and the focus element where the 
  event is applied. The value is taken from the focus element and calculated
  LOGIC - FROMCURRENCY_VALUE * TO_CURRENCYBASERATE = TO_CURRENCY_VALUE and
  TO_CURRENCY_VALUE * FROM_CURRENCYBASERATE = FROMCURRENCY_VALUE*/
  calculateRates(event:any){
    var targetElementToChange: string, 
        focusCurrencyToCalculateFrom: string;
    if(event.target.type === Constants.EVENT_TYPE_NUMBER ) {
      targetElementToChange = this.getOtherItem(event.target.name);
      focusCurrencyToCalculateFrom = event.target.name;
    } else if (event.target.type === Constants.EVENT_TYPE_SELECT) {
      targetElementToChange = Constants.TO_CURRENCY;
      focusCurrencyToCalculateFrom = Constants.FROM_CURRENCY;
    }
    var targetCurrencyType: string = 
      this.converterInstance[targetElementToChange].currencyType;
    var targetCurrencyRate: number = 
      this.converterInstance[focusCurrencyToCalculateFrom].currencyRates.rates[targetCurrencyType];
    
    this.converterInstance[targetElementToChange].currencyValue =
      this.converterInstance[focusCurrencyToCalculateFrom].currencyValue * targetCurrencyRate;
  }

  isValidEvent(event:any){
    if(this.httpErrorObj.httpErrFlag){
      return false;
    }
    var isValidEvent:boolean = false;
    switch (event.target.type) {
      case Constants.EVENT_TYPE_NUMBER: {
        if(event.target.name === Constants.FROM_CURRENCY) {
          if (typeof event.target.value !== 'number' || event.target.value < 0){
            this.fromCurErrMsg = Constants.HTTP_INPUT_ERROR_MSG;
          }else{
            this.converterInstance.fromCurrency.currencyValue = parseFloat(event.target.value);
            this.fromCurErrMsg = '';
            isValidEvent = true;
          }
        } else if (event.target.name === Constants.TO_CURRENCY) {
          if (typeof event.target.value !== 'number' || event.target.value < 0) {
            this.toCurErrMsg = Constants.HTTP_INPUT_ERROR_MSG;
          } else {
            this.converterInstance.toCurrency.currencyValue = parseFloat(event.target.value);
            this.toCurErrMsg = '';
            isValidEvent = true;
          }
        }
        isValidEvent = true;
        break;
      }
      case Constants.EVENT_TYPE_SELECT: {
        if(event.target.name === Constants.FROM_CURRENCY && 
          event.target.value === this.converterInstance.toCurrency.currencyType){
            this.converterInstance.switchCurrencies();
            this.resetCurrencyTypeOptions();
            this.calculateRates({
              target: {
                'name': Constants.FROM_CURRENCY,
                'type': Constants.EVENT_TYPE_NUMBER
              }
            });
          } else {
            if (event.target.name === Constants.FROM_CURRENCY){
              this.converterInstance.fromCurrency.currencyType = event.target.value;
            } else {
              this.converterInstance.toCurrency.currencyType = event.target.value;
            }
            isValidEvent = true;
          }
        break;
      }
    }
    return isValidEvent;
  }

}
