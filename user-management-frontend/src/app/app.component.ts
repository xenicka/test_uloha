import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';

import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, RouterOutlet],
  template: `<app-navbar /> <router-outlet /> `,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'user-management-frontend';
  constructor(private titleService: Title) {
    this.titleService.setTitle($localize`${this.title}`);
  }
}
