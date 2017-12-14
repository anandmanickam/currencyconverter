import { Store, createStore, compose, StoreEnhancer } from 'redux';
import { AppState } from './../models/app-state.model';
import { containerReducer } from './../reducers/container-reducer'
import {AppStore} from './store.token';

const devtools: StoreEnhancer<AppState> = window['devToolsExtension']
  ? window['devToolsExtension']() 
  : f => f;

export function createAppStore(): Store<AppState> {
  return createStore<AppState>(
    containerReducer,
    compose(devtools)
  );
}

export const appStoreProviders = [
  { provide: AppStore, useFactory: createAppStore }
];