import { createSelector } from '@ngrx/store';
import { usersFeature } from './user.reducer';

export const selectUsers = createSelector(usersFeature.selectUsersState, state => state.users);
