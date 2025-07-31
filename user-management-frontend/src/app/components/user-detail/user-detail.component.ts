import { HttpClient } from '@angular/common/http';
import { Component, numberAttribute, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { WebsocketService } from '../../services/web-socket.service';
import { NgZone } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-detail',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css',
})
export class UserDetailComponent implements OnInit, OnDestroy {
  private wwSub!: Subscription;

  userId!: number;
  isViewForm = false;
  user: any;
  isAddParamForm = false;
  isEditing = false;
  isUpdateForm = false;
  output_param: any[] = [];
  parameter_data = {
    paramName: '',
    paramValue: '',
  };

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private wsService: WebsocketService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadUser(this.userId);
    this.loadParameters(this.userId);
    this.wsService.connect();
    this.wwSub = this.wsService.messages.subscribe((message) => {
      if (message.startsWith('user_user_deleted:')) {
        const deletedId = +message.split(':')[1];
        if (deletedId === this.userId) {
          setTimeout(() => {
            this.ngZone.run(() => {
              alert('This user has been deleted in another tab.');
              this.redirectToTable();
            });
          });
        }
      } else if (message.startsWith('user_user_edited')) {
        const editedId = +message.split(':')[1];
        if (editedId === this.user.id) {
          // alert('This user has been modified');
        }
        this.loadUser(this.userId);
      } else {
        this.loadParameters(this.userId);
      }
    });
  }
  ngOnDestroy(): void {
    this.wwSub.unsubscribe();
    this.wsService.disconnect();
  }
  loadUser(id: number) {
    this.http.get(`http://localhost:8080/api/users/${id}`).subscribe({
      next: (data) => {
        this.user = { ...data };
        console.log(data);
      },
      error: (err) => {
        if (err.status === 404) {
          this.ngZone.run(() => {
            alert('User not found.');
            this.router.navigate(['/users']);
          });
        }
      },
    });
  }

  view() {
    this.isAddParamForm = false;
    this.isUpdateForm = false;
    this.isViewForm = !this.isViewForm;
  }
  openParameterForm() {
    this.isViewForm = false;
    this.isAddParamForm = !this.isAddParamForm;
    this.isUpdateForm = false;
  }

  addParameter(form: NgForm) {
    this.isUpdateForm = false;
    console.log(this.parameter_data);
    let parExists = false;
    if (!['name', 'email', 'role'].includes(this.parameter_data.paramName)) {
      for (let parameter of this.output_param) {
        console.log('This is in db' + parameter);
        console.log('This is input' + this.parameter_data.paramName);
        if (parameter.paramName === this.parameter_data.paramName) {
          parExists = true;
          break;
        }
      }
      if (parExists) {
        alert('The same parameter is already exist for this user ');
      } else {
        this.http
          .put(
            `http://localhost:8080/api/users/${this.user.id}/parametres`,
            this.parameter_data,
            { responseType: 'text' }
          )
          .subscribe((response) => {
            console.log('ksenickin response', response);
            this.loadParameters(this.user.id);
            this.openParameterForm();
            alert('Added sucesfully');
          });
      }
    } else {
      alert("You can't change the basic info about user on detail page");
    }
    this.parameter_data = {
      paramName: '',
      paramValue: '',
    };
  }
  loadParameters(id: number) {
    this.http
      .get(`http://localhost:8080/api/users/${id}/parametres`)
      .subscribe((data) => {
        console.log('Came', data);
        this.output_param = data as any[];
      });
  }
  openUpdateParameterForm() {
    this.isAddParamForm = false;
    this.isViewForm = false;

    this.isUpdateForm = !this.isUpdateForm;
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
      .subscribe(() => {
        console.log('edited');
      });
  }

  editUserParametres() {
    if (this.parameter_data.paramName) {
      this.http
        .put(
          `http://localhost:8080/api/users/${this.user.id}/parametres`,
          this.parameter_data,
          { responseType: 'text' }
        )
        .subscribe((response) => {
          console.log('ksenickin response', response);
          this.loadParameters(this.user.id);
          this.openParameterForm();
          alert('Added sucesfully');
        });
      this.parameter_data = {
        paramName: '',
        paramValue: '',
      };
    } else {
      alert('Specify name of the parameter');
    }
  }

  updateParameter(form: NgForm) {
    this.editUser();
    console.log(this.output_param);
    for (let param of this.output_param) {
      this.http
        .put(
          `http://localhost:8080/api/users/${this.user.id}/parametres/updateparameters`,
          param,
          { responseType: 'text' }
        )
        .subscribe((response) => {
          console.log('Updated param:', response);
        });
    }

    this.isUpdateForm = false;
  }
  redirectToTable() {
    this.router.navigate(['/user-table']);
  }
}
