import { Component, Inject, OnInit } from '@angular/core';

import { Store } from 'redux';
import { AppStore } from './../store/store.token';
import { AppState } from './../models/app-state.model';
import { appStoreProviders } from './../store/app.store';
import { initStore } from './../actions/container.actions';

import { Constants } from './../constants/app.constants';
import { HttpServiceProvider } from '../services/http-service.component';
import { ConverterComponent} from './converter-widget.component';
import { WidgetModel } from '../models/converter-widget.model';
import { CurrencyModel } from '../models/app.currency.model';
//import '@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.css';

@Component({
  selector: 'my-app',
  templateUrl: 'app/views/container.component.htm',
  providers: [appStoreProviders , HttpServiceProvider]
})

export class ContainerComponent implements OnInit { 

  appName:String = 'Currency Converter';
  widgetModels: WidgetModel[] = [];
  appConfig = {
    widgetInstance: 0
  };
  configErrorObj = {
    configErrFlag: false,
    configErrMsg: Constants.CONFIG_ERROR_MSG
  };

  constructor ( private _httpservice: HttpServiceProvider,
                @Inject(AppStore) private store: Store<AppState>
              ) {}

  ngOnInit() {
    //TODO: Load json config file as asset
    // Promise.all([
    //   this._httpservice.fetch('app.config.json',''),
    //   this._httpservice.fetch(Constants.API_URL, 'base=' + Constants.CURRENCY_TYPES_ARRAY[0])
    // ]).then(results => results.forEach((response, index) => {
    //   switch (index) {
    //     case 0: {
    //       if (Object.keys(response[0].length > 0) && response[0].widgetInstance){
    //         this.appConfig = Object.assign({}, this.appConfig, response[0]);
    //       } else{
    //         /* Set the errorState to store and flag error message */
    //         this.dispatchErrorState();
    //       }
    //     }
    //     case 1: {
    //       /* Response to http call */
    //       if (Object.keys(response[1]).length > 0) {
    //         if (!this.configErrorObj.configErrFlag) {
    //             /* Instantiate AppState Object and Load the Store */
    //             for (var _i = 0; _i > this.appConfig.widgetInstance; _i++){
    //               var _indexModel = new WidgetModel(
    //                 new CurrencyModel(Constants.CURRENCY_TYPES_ARRAY[0], 0.00, response[1]),
    //                 new CurrencyModel(Constants.CURRENCY_TYPES_ARRAY[1], 0.00));
    //               this.widgetModels.push(_indexModel);
    //             }
    //             this.store.dispatch(initStore({ 
    //               'widgetModels': this.widgetModels,
    //               isHttpRatesFetched: true 
    //             }));
    //           } else {
    //             /* Set the errorState to store and flag error message */
    //             this.dispatchErrorState();
    //           }
    //       } else {
    //         for (var _i = 0; _i > this.appConfig.widgetInstance; _i++) {
    //           var _indexModel = new WidgetModel(
    //             new CurrencyModel(Constants.CURRENCY_TYPES_ARRAY[0]),
    //             new CurrencyModel(Constants.CURRENCY_TYPES_ARRAY[1]));
    //           this.widgetModels.push(_indexModel);
    //         }
    //         this.store.dispatch(initStore({
    //           'widgetModels': this.widgetModels,
    //           isHttpRatesFetched: false
    //         }));
    //       }
    //     }
    //   }
    // }));
    this._httpservice.fetch(Constants.API_URL, 'base=' + Constants.CURRENCY_TYPES_ARRAY[0]).subscribe((response) => {
      var _httpResponse = true;
      if (Object.keys(response).length > 0) {
        for (var _i = 0; _i < Constants.WIDGET_INSTANCE; _i++){
          var _indexModel = new WidgetModel(
            new CurrencyModel(Constants.CURRENCY_TYPES_ARRAY[0], 0.00, response),
            new CurrencyModel(Constants.CURRENCY_TYPES_ARRAY[1], 0.00));
          this.widgetModels.push(_indexModel);
        }
      } else {
        for (var _i = 0; _i < Constants.WIDGET_INSTANCE; _i++) {
          var _indexModel = new WidgetModel(
            new CurrencyModel(Constants.CURRENCY_TYPES_ARRAY[0]),
            new CurrencyModel(Constants.CURRENCY_TYPES_ARRAY[1]));
          this.widgetModels.push(_indexModel);
        }
        _httpResponse = false;
      }

      this.store.dispatch(initStore({ 
        'widgetModels': this.widgetModels,
        isHttpRatesFetched: _httpResponse 
      }));
    });
  }

  // dispatchErrorState(){
  //   this.configErrorObj.configErrFlag = true;
  //   const _errorState: AppState = {
  //     widgetModels: WidgetModel[0],
  //     isHttpRatesFetched: true
  //   };
  //   this.store.dispatch(initStore(_errorState));
  // }
}
