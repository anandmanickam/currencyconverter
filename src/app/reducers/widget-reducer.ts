import {Action} from './../actions/action.def';
import { Reducer} from './../reducers/reducer.def';
import { ActionTypes} from './../constants/app.constants';
import { AppState } from './../models/app-state.model';
import { WidgetModel } from './../models/converter-widget.model'

export const widgetReducer: Reducer<WidgetModel[]> =
  (state: WidgetModel[], action: Action): WidgetModel[] => {

    const _widgetModel = {...state[action.widgetInstance]};

    switch (action.type) {

    case ActionTypes.UPDATE_CURRENCY_VALUES:
        this._widgetModel.fromCurrency.currencyValue = action.payload.fromCurrencyValue;
        this._widgetModel.toCurrency.currencyValue = action.payload.toCurrencyValue;
        return Object.assign({...state}, state[action.widgetInstance], this._widgetModel);

    case ActionTypes.UPDATE_FROM_CURRENCY_TYPE:
        this._widgetModel.fromCurrency.currencyType = action.payload.fromCurrencyType;
        this._widgetModel.toCurrency.currencyValue = action.payload.toCurrencyValue;
        return Object.assign({...state}, state[action.widgetInstance], this._widgetModel);
        
    case ActionTypes.UPDATE_TO_CURRENCY_TYPE:
        this._widgetModel.toCurrency.currencyType = action.payload.toCurrencyType;
        this._widgetModel.toCurrency.currencyValue = action.payload.toCurrencyValue;
        return Object.assign({...state}, state[action.widgetInstance], this._widgetModel);
        
    default:
        return state;
    }
  };