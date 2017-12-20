import { Directive, Renderer2, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[ValidCurrency]'
})
export class ValidCurrencyDirective {

    constructor(private renderer: Renderer2, private el: ElementRef) { }
    @Input('ValidCurrency') validCurrency: boolean;
    @Input('CurtDecimals') decimalPlaces: boolean;

    @HostListener('keydown', ['$event']) onKeyDown(event:any) {
        let e = <KeyboardEvent> event;
        if (this.validCurrency) {
            if (e.which === 64 || e.which === 16) {  
                return true;  
            } else if (e.which >= 48 && e.which <= 57) {  
                return true;  
            } else if (e.which >= 96 && e.which <= 105) {  
                return true;  
            } else if ([8, 9, 13, 27, 37, 38, 39, 40, 46, 110, 190].indexOf(e.which) > -1) {  
                if((e.which === 190 || e.which === 110) && event.target.value.indexOf('.') > -1 ){
                    return false;
                }
            } else {  
                e.preventDefault();  
                return false;  
            }  
        }
    }

    @HostListener('blur', ['$event']) onBlur(event:any) {

        if (event.target.value === '0') {
            event.target.value = event.target.value.concat('.00');
        } else if (event.target.value.indexOf('.') === event.target.value.length - 1) {
            event.target.value = event.target.value.concat('00');
        } else if (event.target.value.indexOf('.') > -1 
            && (event.target.value.length - 1) - event.target.value.indexOf('.') ===  1) {
            event.target.value = event.target.value.concat('0');
        }
    }

    @HostListener('keypress', ['$event']) onKeyPress(event:any) {
        let e = <any> event
    
        let valInFloat: number = parseFloat(e.target.value)
    
        if (this.decimalPlaces) {
          let curCursorPos: number = -1;   
          if (typeof this.el.nativeElement.selectionStart == "number") {
              curCursorPos = this.el.nativeElement.selectionStart;
          }
    
          let dotLength: number = e.target.value.replace(/[^\.]/g, '').length
          let decimalLength = e.target.value.split(".")[1] ? e.target.value.split(".")[1].length : 0;
    
          if( dotLength > 1 || (dotLength === 1 && e.key === ".") || (decimalLength > 1 && 
            curCursorPos > e.target.value.indexOf(".")) && ["Backspace", "Delete", "ArrowLeft", "ArrowRight"].indexOf(e.key) === -1 ) {
            e.preventDefault(); 
          }
        }  
      }
    
}