import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from "../users-list/users-list.component";

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
	@Input() user: User = {} as User;
	@Output() deleteUser = new EventEmitter();


	onDeleteUser(userId: number) {
		this.deleteUser.emit(userId);
	}
}
