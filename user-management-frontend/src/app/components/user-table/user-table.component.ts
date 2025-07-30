import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterLink, RouterModule } from '@angular/router';

interface User {
  id: number;
  name: string;
  email: string;
  isAdmin: string;
}

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterModule],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css',
})
export class UserTableComponent implements OnInit {
  isAddForm = false;
  isEditForm = false;
  isInspectForm = false;

  users: User[] = [];

  user = {
    id: 0,
    name: '',
    email: '',
    isAdmin: '',
  };
  totalUsers = 0;
  pageIndex = 0;
  pageSize = 3;

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.loadUsers();
  }

  addUser() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!this.user.name || !this.user.email) {
      alert('Please fill in all required fields.');
      return;
    }
    if (!emailRegex.test(this.user.email)) {
      alert('Please enter a valid email address.');
      return;
    }
    const userExists = this.users.some((u) => u.email === this.user.email);

    if (userExists) {
      alert('This email is already added to the list!');
      return;
    }

    const userToSend = {
      name: this.user.name,
      email: this.user.email,
      isAdmin: this.user.isAdmin,
    };

    console.log(userToSend);
    this.http
      .post('http://localhost:8080/api/users', userToSend)
      .subscribe((response) => {
        console.log('User added:', response);
        this.user = {
          id: 0,
          name: '',
          email: '',
          isAdmin: '',
        };
        this.isAddForm = false;
        this.loadUsers(this.pageIndex, this.pageSize);
      });
  }

  showAddForm() {
    this.isEditForm = false;
    this.isInspectForm = false;
    this.isAddForm = !this.isAddForm;
    this.user = {
      id: 0,
      name: '',
      email: '',
      isAdmin: '',
    };
  }

  showEditForm() {
    this.isEditForm = !this.isEditForm;
  }

  showInspectForm() {
    this.isInspectForm = !this.isInspectForm;
  }

  loadUsers(pageIndex: number = 0, pageSize: number = 3) {
    this.http
      .get<{ content: User[]; totalElements: number }>(
        `http://localhost:8080/api/users?page=${pageIndex}&size=${pageSize}`
      )
      .subscribe(
        (data) => {
          console.log('Fetched users:', data);
          this.users = data.content;

          this.totalUsers = data.totalElements;
          console.log(this.totalUsers);
        },
        (error) => {
          console.error('Error fetching users:', error);
        }
      );
  }
  deleteUser(userId: number) {
    this.isAddForm = false;
    this.isInspectForm = false;
    this.isEditForm = false;
    if (confirm('Are you sure you want to delete user?')) {
      this.http
        .delete('http://localhost:8080/api/users/' + userId)
        .subscribe(() => {
          console.log('User was deleted');

          this.http
            .get<{ content: User[]; totalElements: number }>(
              `http://localhost:8080/api/users?page=${this.pageIndex}&size=${this.pageSize}`
            )
            .subscribe((data) => {
              if (data.content.length === 0 && this.pageIndex > 0) {
                this.pageIndex = this.pageIndex - 1;
                this.loadUsers(this.pageIndex, this.pageSize);
              } else {
                this.loadUsers(this.pageIndex, this.pageSize);
              }
              this.user = {
                id: 0,
                name: '',
                email: '',
                isAdmin: '',
              };
            });
        });
    }
  }
  nextPage() {
    if ((this.pageIndex + 1) * this.pageSize < this.totalUsers) {
      this.pageIndex++;
      this.loadUsers(this.pageIndex, this.pageSize);
    }
  }

  prevPage() {
    if (this.pageIndex > 0) {
      this.pageIndex--;
      this.loadUsers(this.pageIndex, this.pageSize);
    }
  }
  openEditForm(id: number) {
    this.isAddForm = false;
    this.isInspectForm = false;
    this.showEditForm();
    this.http
      .get<User>(`http://localhost:8080/api/users/${id}`)
      .subscribe((userFromDB: User) => {
        this.user = { ...userFromDB };
      });
  }
  editUser() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let editedUser = this.user;
    if (!emailRegex.test(this.user.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    this.http
      .put(`http://localhost:8080/api/users/${this.user.id}`, editedUser)
      .subscribe({
        next: (response) => {
          console.log('edited');
          this.isEditForm = false;
          this.loadUsers(this.pageIndex, this.pageSize);
        },
        error: (err) => {
          if (err.status === 409) {
            alert('User has been edited by another user');
            setTimeout(
              () => this.loadUsers(this.pageIndex, this.pageSize),
              2000
            );
            this.isEditForm = false;
            this.user = {
              id: 0,
              name: '',
              email: '',
              isAdmin: '',
            };
          } else {
            alert('An error ocured');
            console.log(err);
          }
        },
      });
  }
  inspect(id: number) {
    this.isEditForm = false;
    this.isAddForm = false;
    this.showInspectForm();
    console.log('tried to inspect');
    this.http
      .get<User>(`http://localhost:8080/api/users/${id}`)
      .subscribe((userFromDB: User) => {
        this.user = { ...userFromDB };
      });
  }
}
