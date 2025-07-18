import { Routes } from '@angular/router';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserTableComponent } from './components/user-table/user-table.component';

export const routes: Routes = [
  { path: '', redirectTo: 'user-table', pathMatch: 'full' },
  { path: 'user-table', component: UserTableComponent },
  { path: 'user/:id/user-detail', component: UserDetailComponent },
];
