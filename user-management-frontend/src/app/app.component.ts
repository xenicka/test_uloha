import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, UserDetailComponent, UserTableComponent],
  template: `<app-navbar /> <app-user-table /> <app-user-detail /> `,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'user-management-frontend';
  constructor(private titleService: Title) {
    this.titleService.setTitle($localize`${this.title}`);
  }
}
