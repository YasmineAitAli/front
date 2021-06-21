import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Accounts } from 'src/app/account/module/account.module';
import { ClientService } from 'src/app/client/service/client.service';
import {AccountService} from 'src/app/account/service/account.service';

import { VirementsModule } from 'src/app/virements/module/virements.module';
import { VirementsService } from 'src/app/virements/service/virements.service';

import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { LoadingService } from '../loading/loading.service';

@Component({
  selector: 'app-account-summary',
  templateUrl: './account-summary.component.html',
  styleUrls: ['./account-summary.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class AccountSummaryComponent implements OnInit {
  

  currentClientId: string;
  currentClientName: string;
  accounts: Accounts[];
  // dkche tlvirements
  modalReference: NgbModalRef;
  modalReference2: NgbModalRef;
  accountNotFound = false;
  virement : VirementsModule;
  form: FormGroup;
  debiteur:Accounts;
  creancier:Accounts;
  sommeenvoye:string;
  confirm = false;
  
  loading$ = this.loader.loading$;

  constructor(private clientService: ClientService,public loader:LoadingService,

    private accountservice : AccountService,
    private virementservice : VirementsService,
    config: NgbModalConfig, private modalService: NgbModal,private modalService2: NgbModal
    ) {config.backdrop = 'static';
    config.keyboard = false;
    this.virement= new VirementsModule();
    this.creancier=new Accounts();
    this.debiteur=new Accounts();
  }

  successAlertNotification(){

    Swal.fire('Hi', 'Congrats! operation successfull', 'success')
  }


  swalConfirmation(){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes !'
    }).then((result) => {
      if (result.isConfirmed) {
        
      }
    })
  }
  onSubmit(viremeent : any) {
    

      console.log("blablo  " +viremeent.creancier);
      this.accountservice.findAccountNum(viremeent.creancier).subscribe(
        (data) => {
          
          //get l account lash bghit nsift
          this.creancier = data;
          console.log(this.creancier);
         
          this.accountservice.findAccountNum(viremeent.debiteur).subscribe(
            (data) => {
              // 3mr transfer
              this.debiteur=data;
              console.log("test");
              this.virement.creancier = this.creancier;
              console.log(this.virement.creancier);
              this.virement.debiteur = this.debiteur;
              this.virement.sommeEnv = parseInt(viremeent.somme);
              this.virement.sommeRecu =
                parseInt(viremeent.somme) ;
  
              console.log('le virement', this.virement);
              this.virementservice.save(this.virement).subscribe(
                (response: VirementsModule) => {
                  console.log(response);
       
                  this.currentClientId = sessionStorage.getItem('currentClientId');
                  this.currentClientName = sessionStorage.getItem('name');
                  this.clientService.findClientAccounts(this.currentClientId).subscribe(
                    (data) => {
                      this.accounts = data;
                    },
                    (error) => console.log(error)
                  );                  this.modalReference.close();
                  this.successAlertNotification();
                  
                },
                (error: HttpErrorResponse) => {
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Montant insufisant',
                    
                  })
                
                
                }
              );
              
            },
            (error) => console.log(error)
          );
        },
        (error) => {
          this.modalReference2.close();
          this.accountNotFound = true;
          console.log('accfound', this.accountNotFound);
          this.form['creancier'].setErrors({ incorrect: true });
        }
      );
    }
  ngOnInit(): void {
    this.currentClientId = sessionStorage.getItem('currentClientId');
    this.currentClientName = sessionStorage.getItem('name');
    this.clientService.findClientAccounts(this.currentClientId).subscribe(
      (data) => {
        this.accounts = data;
      },
      (error) => console.log(error)
    );
    

    
    
     
  }

    viree(virement : Form){
      console.log(virement);
    }
    open(content) {
     
      this.accountNotFound = false;
          
      this.modalReference = this.modalService.open(content);


    }

  
}
