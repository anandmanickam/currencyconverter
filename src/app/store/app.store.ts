import { Store, createStore, compose, StoreEnhancer } from 'redux';
import { AppState } from './../models/app-state.model';
import { containerReducer } from './../reducers/container-reducer';
import {AppStore} from './store.token';

/* A highly useful redux devToolsExtension that gives a temporal window to the application's state
 *  for tracking and debugging.
 * Checcks if the browser has the extension and returns the reference to that extension for the
 *  store's access else return an identity function that does nothing.
 */
const devtools: StoreEnhancer<AppState> = window['devToolsExtension']
  ? window['devToolsExtension']()
  : f => f;

/**
 * Creates the store with the devtoolsExtension middleware and the reducer
 * 
 * @export
 * @returns {Store<AppState>} 
 */
export function createAppStore(): Store<AppState> {
  return createStore<AppState>(
    containerReducer,
    compose(devtools)
  );
}

/* Uses a factory pattern to create the store and maintain a single instance of the store throughout 
 *  the state of the application 
 */
export const appStoreProvider = [
  { provide: AppStore, useFactory: createAppStore }
];
