import { HttpClient } from '@angular/common/http';
import { Component, numberAttribute, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-detail',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css',
})
export class UserDetailComponent implements OnInit {
  userId!: number;
  isViewForm = false;
  user: any; // or your User interface type
  isAddParamForm = false;
  isEditing = false;
  isUpdateForm = false;
  output_param: any[] = [];
  parameter_data = {
    paramName: '',
    paramValue: '',
  };

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadUser(this.userId);
    this.loadParameters(this.userId);
  }

  loadUser(id: number) {
    this.http.get(`http://localhost:8080/api/users/${id}`).subscribe((data) => {
      this.user = { ...data };
      console.log(data);
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
}
