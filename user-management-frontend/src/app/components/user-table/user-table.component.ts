import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css',
})
export class UserTableComponent implements OnInit {
  users: any[] = [];
  isForm = false;
  user = {
    name: '',
    email: '',
    isAdmin: '',
    departmentId: '',
    telephone: '',
    workStartDate: '',
    workEndDate: '',
  };

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.loadUsers();
  }

  addUser() {
    if (!this.user.name || !this.user.email) {
      alert('Please fill in all required fields.');
      return;
    }
    this.http
      .post('http://localhost:8080/api/users', this.user)
      .subscribe((response) => {
        console.log('User added:', response);
        this.user = {
          name: '',
          email: '',
          isAdmin: '',
          departmentId: '',
          telephone: '',
          workStartDate: '',
          workEndDate: '',
        };
        this.hideForm();
        this.loadUsers();
      });
  }

  showForm() {
    this.isForm = true;
  }
  hideForm() {
    this.isForm = false;
  }

  loadUsers() {
    this.http.get<any[]>('http://localhost:8080/api/users').subscribe(
      (data) => {
        console.log('Fetched users:', data);
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
}
