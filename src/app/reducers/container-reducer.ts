import {Action} from './../actions/action.def';
import { Reducer} from './../reducers/reducer.def';
import { ActionTypes} from './../constants/app.constants';
import { AppState} from './../models/app-state.model';
import { WidgetModel } from './../models/converter-widget.model'

var emptyWidgetModelArray: WidgetModel[] = [];
const initialState: AppState = { 
  widgetModels: emptyWidgetModelArray,
  isHttpRatesFetched: true };

export const containerReducer: Reducer<AppState> =
  (state: AppState = initialState, action: Action): AppState => {
    switch (action.type) {

      case ActionTypes.LOAD_STORE:
        console.log('payload->', action.payload);
        return Object.assign({}, state, action.payload);

      default:
        return state;
    }
  };