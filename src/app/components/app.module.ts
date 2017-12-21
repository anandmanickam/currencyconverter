import { NgModule }      from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import {appStoreProvider} from './../store/app.store';
import { ContainerComponent }  from './container.component';
import { ConverterComponent } from './converter-widget.component';
import { ValidCurrencyDirective } from './../directives/valid-currency.directive';

/**
 * @ngModule 
 * imports - loads the neccesary inbuilt services that are used by the custom components
 * declararions - global application level declaration of the custom components and directives
 * providers - the sigle point declaration on injectible service providers used accross components
 * bootstrap - declares the initial component to load during bootstrap 
 * @export
 * @class AppModule
 */
@NgModule({
  imports: [BrowserModule, FormsModule, HttpModule],
  declarations: [ ContainerComponent, ConverterComponent, ValidCurrencyDirective],
  providers: [appStoreProvider],
  bootstrap: [ ContainerComponent ]
})
export class AppModule { }
