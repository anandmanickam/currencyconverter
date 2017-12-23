import { Action, ActionCreator} from 'redux';
import {ActionTypes} from './../constants/app.constants';
import { AppState } from '../models/app-state.model';

export const initStore: ActionCreator<Action> = (payload: AppState) => ({
  type: ActionTypes.LOAD_STORE,
  payload
});
