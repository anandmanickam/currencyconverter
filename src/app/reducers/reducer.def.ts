import {Action} from './../actions/action.def';

/**
 * Reducer definition.
 * The reducers are pure functions that accepts the current Store state and an action object passed
 *  from the action creators returns a copy of the state with the neccessary modifications.  
 * @export
 * @interface Reducer
 * @template T 
 */
export interface Reducer<T> {
  (state: T, action: Action): T;
}
