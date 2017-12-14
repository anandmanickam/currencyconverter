import {Action} from './../actions/action.def';

export interface Reducer<T> {
  (state: T, action: Action): T;
}