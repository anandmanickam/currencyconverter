import { Component } from '@angular/core';
import { ConverterComponent} from './converter-widget.component';
@Component({
  selector: 'my-app',
  templateUrl: 'app/container.component.htm'
})

export class ContainerComponent  { 
  appName:String = 'Currency Converter'; 
}
