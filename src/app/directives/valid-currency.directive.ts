import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[ValidCurrency]'
})
export class ValidCurrencyDirective {

    constructor(private el: ElementRef) { }
    @Input('ValidCurrency') validCurrency: boolean;
    
    @HostListener('keydown', ['$event']) onKeyDown(event) {
        let e = <KeyboardEvent> event;
        if (this.validCurrency) {
            if (e.which == 64 || e.which == 16) {  
                return true;  
            } else if (e.which >= 48 && e.which <= 57) {  
                return true;  
            } else if (e.which >= 96 && e.which <= 105) {  
                return true;  
            } else if ([8, 9, 13, 27, 37, 38, 39, 40, 190].indexOf(e.which) > -1) {  
                if(e.which === 190 && event.target.value.indexOf('.') > -1 ){
                    return false;
                }
            } else {  
                e.preventDefault();  
                return false;  
            }  
        }
    }
}