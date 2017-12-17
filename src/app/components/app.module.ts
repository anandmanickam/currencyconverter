import { NgModule }      from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import {appStoreProvider} from './../store/app.store';
import { NumbersOnlyDirective} from '../directives/numonly.directive';
import { ContainerComponent }  from './container.component';
import { ConverterComponent } from './converter-widget.component';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpModule ],
  declarations: [ ContainerComponent, ConverterComponent, NumbersOnlyDirective ],
  providers: [appStoreProvider],
  bootstrap: [ ContainerComponent ]
})
export class AppModule { }
