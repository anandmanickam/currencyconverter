import {Action} from './../actions/action.def';
import { Reducer} from './../reducers/reducer.def';
import { ActionTypes} from './../constants/app.constants';
import { AppState} from './../models/app-state.model';
import { WidgetModel } from './../models/converter-widget.model';
import { widgetReducer } from './widget-reducer';

/* App state initialisation */
const emptyWidgetModelArray: WidgetModel[] = [],
  initialState: AppState = {
    widgetModels: emptyWidgetModelArray,
    isHttpRatesFetched: true
  };

/**
 * The container reducer that nests the converter widget reducer. 
 * Always returns a modified copy of the AppState.
 * @param {AppState} [state=initialState] 
 * @param {Action} action 
 * @returns {AppState} 
 */
export const containerReducer: Reducer<AppState> =
  (state: AppState = initialState, action: Action): AppState => {
    switch (action.type) {

      case ActionTypes.LOAD_STORE:
        return Object.assign({}, state, action.payload);

      default:
        return {...state, widgetModels: widgetReducer(state.widgetModels, action)};
    }
  };
