import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[OnlyNumber]'
})
export class OnlyNumber {

  constructor(private el: ElementRef) { }

  @Input() OnlyNumber: boolean;

  @HostListener('keydown', ['$event']) onKeyDown(event) {
    let e = <KeyboardEvent> event;

    if (this.OnlyNumber) {
        console.log('e->', e.target)
        if (e.which == 64 || e.which == 16) {  
            // to allow numbers  
            return false;  
        } else if (e.which == 46) {
            // allow dot
            return true;
        }
        else if (e.which >= 48 && e.which <= 57) {  
        // to allow numbers  
        return true;  
        } else if (e.which >= 96 && e.which <= 105) {  
            // to allow numpad number  
            return true;  
        } else if ([8, 13, 27, 37, 38, 39, 40].indexOf(e.which) > -1) {  
            // to allow backspace, enter, escape, arrows  
            return true;  
        } else {  
            e.preventDefault();  
            // to stop others  
            return false;  
        }  
  }
}