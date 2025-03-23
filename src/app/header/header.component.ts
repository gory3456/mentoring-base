import { authGuard } from '../guards/auth.guard';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DelTelLinePipe } from '../pipes/del-tel-line.pipe';
import { HoverDirectiveDirective } from '../directives/hover-directive.directive';
import { MatDialog } from '@angular/material/dialog';
import { AuthComponent } from '../auth/auth.component';
import { UserService } from '../services/user.service';

const menuItems = ['Каталог', 'Стройматериалы', 'Инструменты', 'Электрика', 'Интерьер и одежда'];

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgForOf, NgIf, NgOptimizedImage, RouterLink, DatePipe, DelTelLinePipe, HoverDirectiveDirective, AsyncPipe, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  public readonly menuItems = menuItems;
  public isShowImg: boolean = true;
  public readonly today = new Date().toDateString();
  private readonly dialog = inject(MatDialog);
  public readonly userService = inject(UserService);

  public openDialog(): void {
    const dialogRef = this.dialog.open(AuthComponent, {
      width: '400px',
      height: '200px'
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result === 'admin') {
        this.userService.loginAsAdmin();
      } else if (result === 'user') {
        this.userService.loginAsUser();
      }
    });
  }

  public logout() {
    if (confirm('Вы точно хотите выйти?')) {
      return this.userService.logout();
    } else {
      return false;
    }
  }
}
