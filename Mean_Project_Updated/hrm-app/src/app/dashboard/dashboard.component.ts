import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, CommonModule, RouterLink, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  private _collapsed = false;
  private _sidenavWidth: string = '250px';
  private _profilePicSize = '100';

  get collapsed(): boolean {
    return this._collapsed;
  }

  set collapsed(value: boolean) {
    this._collapsed = value;
    this._sidenavWidth = value ? '60px' : '250px';
    this._profilePicSize = value ? '32' : '100';
  }

  get sidenavWidth(): string {
    return this._sidenavWidth;
  }

  get profilePicSize() {
    return this._profilePicSize;
  }

  deactivateOtherLinks(): void {
    const links = document.querySelectorAll('mat-list-item a');
    links.forEach((link: Element) => {
      if (link !== event?.target && link.classList.contains('active')) {
        link.classList.remove('active');
      }
    });
  }

  // Logged user check //
  authService = inject(AuthService);
  isLoggedin: boolean = this.authService.isLoggedIn();


  logout() {
    localStorage.removeItem("employee_id");
  }
}
