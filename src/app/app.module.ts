import { NgModule }      from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { ContainerComponent }  from './container.component';
import { ConverterComponent } from './converter-widget.component';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpModule ],
  declarations: [ ContainerComponent, ConverterComponent ],
  bootstrap: [ ContainerComponent ]
})
export class AppModule { }
