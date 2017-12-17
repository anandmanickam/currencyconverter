import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';

import { Store } from 'redux';
import { AppStore } from './../store/store.token';
import { AppState } from './../models/app-state.model';
import { appStoreProvider } from './../store/app.store';
import { initStore } from './../actions/container.actions';

import { Constants } from './../constants/app.constants';
import { HttpServiceProvider } from '../services/http-service.component';
import { ConverterComponent} from './converter-widget.component';
import { WidgetModel } from '../models/converter-widget.model';
import { CurrencyModel } from '../models/app.currency.model';

@Component({
  selector: 'my-app',
  templateUrl: 'app/views/container.component.htm',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['node_modules/@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.min.css'],
  providers: [appStoreProvider , HttpServiceProvider]
})

export class ContainerComponent implements OnInit { 

  appName:String = 'Currency Converter Widgets';
  widgetModels: WidgetModel[] = [];

  constructor ( private _httpservice: HttpServiceProvider,
                @Inject(AppStore) private store: Store<AppState>
              ) {}

  ngOnInit() {
  
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
}
