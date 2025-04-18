import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DelTelLinePipe } from '../pipes/del-tel-line.pipe';
import { HoverDirectiveDirective } from '../directives/hover-directive.directive';
const menuItems = ['Каталог', 'Стройматериалы', 'Инструменты', 'Электрика', 'Интерьер и одежда'];

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgForOf, NgIf, NgOptimizedImage, RouterLink, DatePipe, DelTelLinePipe, HoverDirectiveDirective, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  public readonly menuItems = menuItems;
  public isShowImg: boolean = true;
  public readonly today = new Date().toDateString();
}
