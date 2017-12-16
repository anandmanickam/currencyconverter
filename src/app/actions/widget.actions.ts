import { Action, ActionCreator} from 'redux';
import {ActionTypes} from './../constants/app.constants';
import { WidgetModel } from '../models/converter-widget.model';

export const updateCurrencyValues: ActionCreator<Action> = (payload: WidgetModel, widgetInstance:number) => ({
    type: ActionTypes.UPDATE_CURRENCY_VALUES,
    payload,
    widgetInstance 
});

export const updateFromCurrencyType: ActionCreator<Action> = (payload: WidgetModel, widgetInstance:number) => ({
    type: ActionTypes.UPDATE_FROM_CURRENCY_TYPE,
    payload,
    widgetInstance 
});

export const updateToCurrencyType: ActionCreator<Action> = (payload: WidgetModel, widgetInstance:number) => ({
    type: ActionTypes.UPDATE_TO_CURRENCY_TYPE,
    payload,
    widgetInstance 
});