import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  currentLang: 'EN' | 'SVK' = 'EN';

  toggleLanguage(){
if (this.currentLang === 'EN') {
  this.currentLang = 'SVK';
} else {
  this.currentLang = 'EN';
}
  }
}
