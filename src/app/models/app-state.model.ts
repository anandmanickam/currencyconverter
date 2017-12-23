import { WidgetModel } from './converter-widget.model';


/**
 * Actual model of the store. It contains a declaration of an array of widget models
 *  instantiated at run time accoding to the number of widget instances spawned.
 * 
 * @export
 * @interface AppState
 */
export interface AppState {
  widgetModels: WidgetModel[];
  isHttpRatesFetched: boolean;
};
