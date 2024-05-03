import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private router = inject(Router);

  name = '';
  localItems = '';

  ngOnInit() {
    const itemData = localStorage.getItem('User') || '';

    if (itemData) {
      const dataArray = JSON.parse(itemData);

      const userObject = dataArray[0];
      //console.log(userObject);

      const { id, name, username } = userObject;
      this.name = name;

      //console.log('ID:', id);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
