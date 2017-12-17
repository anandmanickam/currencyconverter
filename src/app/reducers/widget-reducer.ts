import {Action} from './../actions/action.def';
import { Reducer} from './../reducers/reducer.def';
import { ActionTypes} from './../constants/app.constants';
import { AppState } from './../models/app-state.model';
import { WidgetModel } from './../models/converter-widget.model'

export const widgetReducer: Reducer<WidgetModel[]> =
  (state: WidgetModel[], action: Action): WidgetModel[] => {

    switch (action.type) {

    case ActionTypes.UPDATE_CURRENCY_VALUES:
        return Object.assign({...state}, state[action.widgetInstance], action.payload);
        
    default:
        return state;
    }
  };