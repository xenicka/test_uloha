import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface User {
  id: number;
  name: string;
  email: string;
  isAdmin: string;
  departmentId: number;
  telephone: number;
  workStartDate: string;
  workEndDate: string;
}

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
    departmentId: 0,
    telephone: 0,
    workStartDate: '',
    workEndDate: '',
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

    if (
      !this.user.name ||
      !this.user.email ||
      !this.user.departmentId ||
      !this.user.telephone
    ) {
      alert('Please fill in all required fields.');
      return;
    }
    if (!emailRegex.test(this.user.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (
      isNaN(Number(this.user.telephone)) ||
      this.user.telephone.toString().length !== 12
    ) {
      alert('Please enter a valid telephone number.');
      return;
    }

    const userToSend = {
      name: this.user.name,
      email: this.user.email,
      isAdmin: this.user.isAdmin,
      departmentId: Number(this.user.departmentId),
      telephone: Number(this.user.telephone),
      workStartDate: this.user.workStartDate,
      workEndDate: this.user.workEndDate,
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
          departmentId: 0,
          telephone: 0,
          workStartDate: '',
          workEndDate: '',
        };
        this.hideAddForm();
        this.loadUsers();
      });
  }

  showAddForm() {
    this.hideEditForm();
    this.hideInspectForm();
    this.isAddForm = true;
  }
  hideAddForm() {
    this.isAddForm = false;
  }
  showEditForm() {
    this.hideInspectForm;
    this.hideAddForm;
    this.isEditForm = true;
  }
  hideEditForm() {
    this.isEditForm = false;
  }
  showInspectForm() {
    this.hideEditForm();
    this.hideAddForm();
    this.isInspectForm = true;
  }
  hideInspectForm() {
    this.isInspectForm = false;
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
    this.http
      .get<User>(`http://localhost:8080/api/users/${id}`)
      .subscribe((userFromDB: User) => {
        this.user = { ...userFromDB };
        this.showEditForm();
      });
  }
  editUser() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let editedUser = this.user;
    if (!emailRegex.test(this.user.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (
      isNaN(Number(this.user.telephone)) ||
      this.user.telephone.toString().length !== 12
    ) {
      alert('Please enter a valid telephone number.');
      return;
    }
    this.http
      .put(`http://localhost:8080/api/users/${this.user.id}`, editedUser)
      .subscribe(() => {
        console.log('edited');
        this.isEditForm = false;
        this.loadUsers(this.pageIndex, this.pageSize);

        this.hideAddForm();
      });
  }
  inspect(id: number) {
    console.log('tried to inspect');
    this.http
      .get<User>(`http://localhost:8080/api/users/${id}`)
      .subscribe((userFromDB: User) => {
        this.user = { ...userFromDB };
      });
    this.showInspectForm();
  }
  detailInfo(id: number) {}
}
