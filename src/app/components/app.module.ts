import { NgModule }      from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import {appStoreProvider} from './../store/app.store';
import { ContainerComponent }  from './container.component';
import { ConverterComponent } from './converter-widget.component';
import { OnlyNumber } from './../directives/numonly.directive';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpModule],
  declarations: [ ContainerComponent, ConverterComponent, OnlyNumber],
  providers: [appStoreProvider],
  bootstrap: [ ContainerComponent ]
})
export class AppModule { }
