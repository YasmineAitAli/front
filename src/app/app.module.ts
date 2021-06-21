import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./shared/layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';

import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./shared/components/components.module";
import { LoginClientComponent } from "./components/login-client/login-client.component";
import { AccountSummaryComponent } from "./components/account-summary/account-summary.component";
import { VirementsTabComponent } from "./components/virements-tab/virements-tab.component";
import { VirementMultipleComponent } from "./components/virement-multiple/virement-multiple.component";
import { BasicAuthHtppInterceptorService } from "./login/basic-auth-htpp-interceptor-service.service";


import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { MatNativeDateModule } from '@angular/material/core';
import { InterceptorService } from "./components/loading/interceptor.service";
import { AppointmentComponent } from "./components/appointment/appointment.component";
import { VirementMultipleTableComponent } from './components/virement-multiple-table/virement-multiple-table.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

@NgModule({

  declarations: [
    AppComponent, 
    AdminLayoutComponent, 
    AuthLayoutComponent,
  
    LoginClientComponent,
    AccountSummaryComponent,
    VirementsTabComponent,
    VirementMultipleComponent,
    AppointmentComponent,
    VirementMultipleTableComponent,
    NotfoundComponent,

  ],

  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot(),

    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    Ng2SmartTableModule, 

    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatCardModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatNativeDateModule,
  ],

  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: BasicAuthHtppInterceptorService,
    multi: true,
    },{provide:HTTP_INTERCEPTORS,useClass:InterceptorService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule {}
