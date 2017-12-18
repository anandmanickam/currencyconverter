import { NgModule }      from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import {appStoreProvider} from './../store/app.store';
import { ContainerComponent }  from './container.component';
import { ConverterComponent } from './converter-widget.component';
import { ValidCurrencyDirective } from './../directives/valid-currency.directive';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpModule],
  declarations: [ ContainerComponent, ConverterComponent, ValidCurrencyDirective],
  providers: [appStoreProvider],
  bootstrap: [ ContainerComponent ]
})
export class AppModule { }
