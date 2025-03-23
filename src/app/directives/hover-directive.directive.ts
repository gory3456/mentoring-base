import { Directive, HostBinding, HostListener } from '@angular/core';
@Directive({
  selector: '[appHoverDirective]',
  standalone: true
})
export class HoverDirectiveDirective {
  @HostBinding('style.background') backgroundColor = '';
  @HostListener('mouseenter') onMouseEnter() {
    this.backgroundColor = '#ff7538';
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.backgroundColor = '';
  }
}
