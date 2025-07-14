import { Component } from '@angular/core';
import { CommonModule, PRECONNECT_CHECK_BLOCKLIST } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  title = 'got it';
  constructor(private titleService: Title) {
    this.titleService.setTitle($localize`${this.title}`);
  }
}
