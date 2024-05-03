import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorage } from '../../../util/local-storage';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  private router = inject(Router);
  private storage = inject(StorageService);

  ngOnInit() {}

  onLogout() {
    this.storage.clear();
    this.router.navigate(['/account', 'login']);
  }
}
