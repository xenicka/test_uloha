import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  imports: [CommonModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css',
})
export class UserDetailComponent implements OnInit {
  userId!: number;
  isViewForm = false;
  user: any; // or your User interface type

  constructor(private htttp: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadUser(this.userId);
  }

  loadUser(id: number) {
    this.htttp
      .get(`http://localhost:8080/api/users/${id}`)
      .subscribe((data) => {
        this.user = { ...data };
      });
  }
  view() {
    this.isViewForm = !this.isViewForm;
  }
}
