import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
  output_param: any[] = [];
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
    this.isViewForm = !this.isViewForm;
  }
  openParameterForm() {
    this.isViewForm = false;
    this.isAddParamForm = !this.isAddParamForm;
  }

  parameter_data = {
    paramName: '',
    paramValue: '',
  };
  addParameter(form: NgForm) {
    console.log(this.parameter_data);

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
      });
  }
  loadParameters(id: number) {
    this.http
      .get(`http://localhost:8080/api/users/${id}/parametres`)
      .subscribe((data) => {
        console.log('Came', data);
        this.output_param = data as any[];
      });
  }
}
