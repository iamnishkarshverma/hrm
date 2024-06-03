import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './dashboard/pages/settings/settings.component';
import { DashHomeComponent } from './dashboard/pages/dash-home/dash-home.component';
import ForgetPasswordComponent from './forgot-password/forgot-password.component';
import { authGuard } from './services/auth.guard';
import { AttendanceComponent } from './dashboard/pages/attendance/attendance.component';

export const routes: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'forgotPassword', component: ForgetPasswordComponent },
    { path: 'reset/:token', component: ResetPasswordComponent },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard],
        children: [
            { path: 'dashhome', component: DashHomeComponent },
            { path: '', pathMatch: 'full', redirectTo: 'dashhome' },
            { path: 'attendance', component: AttendanceComponent },
            { path: 'settings', component: SettingsComponent }
        ]
    }, { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Default route
    { path: '**', redirectTo: '/login' } // Wildcard route
];