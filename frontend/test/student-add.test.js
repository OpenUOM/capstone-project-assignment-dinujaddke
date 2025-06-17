import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  // ...
})
export class StudentListComponent implements OnInit {

  constructor(private router: Router, private service: AppServiceService) {}

  ngOnInit() {
    this.loadStudents();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (event.urlAfterRedirects === '/student') {
        this.loadStudents();
      }
    });
  }

  loadStudents() {
    this.service.getStudentData().subscribe(data => {
      this.studentData = data;
    });
  }
}
