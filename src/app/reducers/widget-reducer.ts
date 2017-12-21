import {Action} from './../actions/action.def';
import { Reducer} from './../reducers/reducer.def';
import { ActionTypes} from './../constants/app.constants';
import { AppState } from './../models/app-state.model';
import { WidgetModel } from './../models/converter-widget.model'

/**
 * A nested reducer that modifies an induvidual widget model pbject in the widget models
 *  array of the app state.
 * @param {WidgetModel[]} state 
 * @param {Action} action 
 * @returns {WidgetModel[]} 
 */
export const widgetReducer: Reducer<WidgetModel[]> =
  (state: WidgetModel[], action: Action): WidgetModel[] => {

    switch (action.type) {

    case ActionTypes.UPDATE_CURRENCY_VALUES:
        return Object.assign({...state}, state[action.widgetInstance], action.payload);
        
    default:
        return state;
    }
  };