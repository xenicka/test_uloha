import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserTableComponent } from './components/user-table/user-table.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NavbarComponent,UserDetailComponent,UserTableComponent],
  template:`<app-navbar />  <app-user-table /> <app-user-detail /> `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'user-management-frontend';
}
