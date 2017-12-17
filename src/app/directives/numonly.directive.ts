import { 
    Directive,
    ElementRef,
    HostListener,
    Input } from '@angular/core';

@Directive({
  selector: '[numbersOnly]'
})
export class NumbersOnlyDirective {

  constructor(private el: ElementRef) { }

  @Input('numbersOnly') NumbersOnly: boolean;

  @HostListener('keydown', ['$event']) onKeyDown(event) {
    let e = <KeyboardEvent> event;
    if (this.NumbersOnly) {
      console.log(event.target.value, this.el);
      if(new RegExp(/^[0-9]\d*(\.\d+)?$/).test(this.el.nativeElement.value)){   
        return;
      } else {
        return false;
      }
    }
  }
}