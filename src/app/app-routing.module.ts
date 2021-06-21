import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { AdminLayoutComponent } from "./shared/layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { LoginClientComponent } from "./components/login-client/login-client.component";
import { AuthGuardGuard } from "./components/login-client/auth-guard.guard";
import { AppointmentComponent } from "./components/appointment/appointment.component";
import { NotfoundComponent } from "./components/notfound/notfound.component";

const routes: Routes = [
  {
    path: 'login',
    component: LoginClientComponent,
},
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  { 
    path: '',
     component: LoginClientComponent, 
     canActivate: [AuthGuardGuard] 
  },
  
  {
    path: "",
    component: AdminLayoutComponent,
    canActivate: [AuthGuardGuard], 
    children: [
      {
        path: "",
        loadChildren:
          "./shared/layouts/admin-layout/admin-layout.module#AdminLayoutModule"
      },
      {path: '404', component: NotfoundComponent},
      {path: '**', redirectTo: '/404'},
    ]
  },

  /*{
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full"
  },
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: "",
        loadChildren:
          "./shared/layouts/admin-layout/admin-layout.module#AdminLayoutModule"
      }
    ]
  }, {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './shared/layouts/auth-layout/auth-layout.module#AuthLayoutModule'
      }
    ]
  },
  {
    path: "**",
    redirectTo: "dashboard"
  }*/
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
