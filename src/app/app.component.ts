import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {HeaderComponent} from "./header/header.component";
import {UsersListComponent} from "./users-list/users-list.component";

const pages =[5,4,3,2,1]
let newPages= pages.reverse()



// const upperCaseMenuItems = menuItems.map(
//   (item) => {
//     return item.toUpperCase();
//   }
// )



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgOptimizedImage, NgForOf, NgIf, HeaderComponent, UsersListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mentoring-first-project';
  readonly newPages = newPages
  isShowImg:boolean = true;

}
