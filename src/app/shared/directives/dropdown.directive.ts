import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  constructor() { }

  @HostBinding('class.header-dropdown-menu-hide') isHide = true;

  @HostListener('click', ['$event']) userClick(event){
    event.preventDefault();
    this.isHide = !this.isHide;
  }

}
