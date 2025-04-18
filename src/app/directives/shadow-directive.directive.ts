import { Directive, HostBinding, HostListener } from '@angular/core';
@Directive({
  selector: '[appShadowDirective]',
  standalone: true
})
export class ShadowDirectiveDirective {
  @HostBinding('style.boxShadow') boxShadow: string = '';
  @HostBinding('style.transition') transition: string = 'box-shadow 0.3s ease';

  @HostListener('mouseenter') onMouseEnter() {
    this.boxShadow = '0 0 7px 7px rgba(0, 0, 0, 0.25)';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.boxShadow = 'none';
  }
}
