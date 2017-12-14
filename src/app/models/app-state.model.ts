import { WidgetModel } from './converter-widget.model';


export interface AppState {
  widgetModels: WidgetModel[];
  isHttpRatesFetched: boolean;
};