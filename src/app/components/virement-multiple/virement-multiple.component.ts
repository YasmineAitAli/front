import {
  HttpErrorResponse
} from '@angular/common/http';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  LocalDataSource
} from 'ng2-smart-table';
import {
  Accounts
} from 'src/app/account/module/account.module';
import {
  AccountService
} from 'src/app/account/service/account.service';
import {
  BeneficiaireModule
} from 'src/app/beneficiaire/module/beneficiaire/beneficiaire.module';
import {
  BeneficiaireService
} from 'src/app/beneficiaire/service/beneficiaire.service';
import {
  ClientService
} from 'src/app/client/service/client.service';
import {
  VirementMultiple
} from 'src/app/virements/module/virement-multiple';
import {
  Vmb
} from 'src/app/virements/module/vmb';
import {
  VirementMultipleService
} from 'src/app/virements/service/virement-multiple.service';
import {
  VirementsService
} from 'src/app/virements/service/virements.service';
import Swal from 'sweetalert2';
import {
  LoadingService
} from '../loading/loading.service';


interface Compte {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-virement-multiple',
  templateUrl: './virement-multiple.component.html',
  styleUrls: ['./virement-multiple.component.css']
})
export class VirementMultipleComponent implements OnInit {
  beneficiare_id: any;
  beneficiare_nom: string;
  beneficiare_prenom: string;
  beneficiare_numeroCompte: number;


  beneficiaires: BeneficiaireModule[] = [];
  $: any;

  source: LocalDataSource;
  data = [{
    id: '',
    numeroCompte: '',
  }];
  currentClientId: string;
  currentClientName: string;
  benef: BeneficiaireModule[];
  currentClientUsername: string;
  loading$ = this.loader.loading$;

  constructor(public loader: LoadingService, private accountService: AccountService, private benefService: BeneficiaireService, private clientService: ClientService,
    private virementService: VirementsService,
    private vmService: VirementMultipleService) {
    this.source = new LocalDataSource(this.data);
  }

  ngOnInit(): void {
    this.currentClientId = sessionStorage.getItem('currentClientId');
    this.currentClientName = sessionStorage.getItem('name');
    this.currentClientUsername = sessionStorage.getItem('username');
    this.getCompteClient()
    this.getBenef();
  }

  tab1 = {

    actions: {
      edit: false,
      delete: true,
      custom: [{
          name: 'Add Account',
          title: 'Add beneficiary<br>'

        }

      ],
    },

    add: {
      createButtonContent: '<i class="fa fa-save" aria-hidden="true"></i>',
      cancelButtonContent: '<i class="fa fa-times-circle" aria-hidden="true"></i>',
      confirmCreate: true,
    },

    edit: {
      editButtonContent: '<i class="far fa-edit" aria-hidden="true"></i>',
      saveButtonContent: '<i class="fa fa-save" aria-hidden="true"></i>',
      cancelButtonContent: '<i class="fa fa-times-circle" aria-hidden="true"></i>',
      confirmSave: true,

    },
    delete: {
      deleteButtonContent: '<i class="fa fa-trash" aria-hidden="true"></i>',
      confirmDelete: true
    },
    columns: {
      numeroCompte: {
        title: 'Account number'
      },



      compteOwner: {
        valuePrepareFunction: (value: any, row: any, cell: any) => {

          value = cell.newValue.proprietaire.nom
          return value
        },
        title: 'Account owner',
        editable: false,
        addable: false
      }
    }
  };

  tab2 = {
    actions: {
      add: false,
      edit: false,
      delete: true,
    },
    edit: {
      editButtonContent: '<i class="far fa-edit" aria-hidden="true"></i>',
      saveButtonContent: '<i class="fa fa-save" aria-hidden="true"></i>',
      cancelButtonContent: '<i class="fa fa-times-circle" aria-hidden="true"></i>',
      confirmSave: true,

    },
    delete: {
      deleteButtonContent: '<i class="fa fa-trash" aria-hidden="true"></i>',
      confirmDelete: true
    },
    columns: {
      numeroCompte: {
        title: 'Account number',
        editable: false,
        addable: false
      },
      montant: {
        title: 'Amount'
      },
      compteOwner: {
        valuePrepareFunction: (value: any, row: any, cell: any) => {

          value = cell.newValue.proprietaire.nom
          return value
        },
        title: 'Account owner',
        editable: false,
        addable: false
      }
    }
  };




  serializedDate = new FormControl((new Date()).toISOString());
  compterfound = false;


  getBenef() {
    this.benefService.GetAllBenefOfClient(this.currentClientId).subscribe(
      (response: BeneficiaireModule[]) => {


        this.beneficiaires = response;

      },
      (error: HttpErrorResponse) => {


      }
    );
  }

  compteClient: Accounts[] = [];
  getCompteClient() {
    this.clientService.findClientAccounts(this.currentClientId).subscribe(
      (response: Accounts[]) => {
        this.compteClient = response;
        console.log(response)

      },
      (error: HttpErrorResponse) => {
        console.log(error)
      }
    );
  }
  selected: any;
  onChange(event) {
    console.log(this.selected)

  }

  clientObj = {
    id: 0
  }
  comptObj = {
    id: 0
  }

  onAddClient(event) {

    // this.onCreateConfirm(event)
    this.accountService.findAccountNum(event.newData.numeroCompte).subscribe(
      res => {
        console.log("res")
        console.log(res)

        this.comptObj.id = res.id
        event.newData.compteOwner = this.comptObj
        this.clientObj.id = parseInt(this.currentClientId)
        event.newData.client = this.clientObj
        console.log("event")
        console.log(event.newData)
        this.benefService.AddBenef(event.newData).subscribe(
          res => {
            console.log("succes")
            this.getBenef()
            Swal.fire(
              'Success!',
              'Beneficiary added successfully.',
              'success'
            )

          },
          (errorr: HttpErrorResponse) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Beneficiary already exists',

            })
            console.log(errorr)
          });

      },
      (errorr: HttpErrorResponse) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Account not found!',

        })
        this.getBenef();


      });


  }



  onDeleteClient(event) {
    console.log('deleeeeeeeeeete')
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.benefService.DeleteBenef(event.data.id).subscribe(
          res => {

            this.getBenef();
            Swal.fire(
              'Deleted!',
              'Your Beneficiary has been deleted.',
              'success'
            )
          },
          (error: HttpErrorResponse) => {
            console.log(error)

          });

      }
    })

  }

  onEditSolde(event) {

  }



  selectedData: BeneficiaireModule[] = []
  selectedBenef: BeneficiaireModule
  resultEmpty: boolean = true
  onCustomAction(event: any): void {
    Swal.fire({
      title: 'Enter amount',
      input: 'text',
      inputAttributes: {
        pattern: '^[0-9]*\.?[0-9]*'

      },
      showCancelButton: true,
      confirmButtonText: 'OK',


    }).then((valeur) => {
      if (valeur.isConfirmed && valeur.value != "") {


        console.log(valeur)
        this.selectedBenef = event.data
        this.selectedBenef.montant = valeur.value
        this.selectedData.push(this.selectedBenef)
        this.result = this.selectedData.reduce((unique, o) => {
          if (!unique.some(obj => obj.numeroCompte === o.numeroCompte)) {
            console.log(unique.some(obj => obj.numeroCompte === o.numeroCompte))
            unique.push(o);


          }

          return unique;

        }, []);
        console.log('resss')
        console.log(this.result);
        this.resultEmpty = false
        this.sourceTab2 = new LocalDataSource(this.result);
      }
    });

  }
  result: any[];
  sourceTab2: LocalDataSource
  deleteBenefTab2(event) {
    console.log("je mexecute")
    console.log(event.data)
    const index: number = this.selectedData.indexOf(event.data);
    console.log(index)
    if (index !== -1) {
      this.selectedData.splice(index, 1);
      this.sourceTab2 = new LocalDataSource(this.selectedData);
    }
  }

  formValue = new FormGroup({
    dateCre: new FormControl(new Date(), [
      Validators.required
    ]),
    dateExec: new FormControl(new Date(), [
      Validators.required,
    ]),
    motif: new FormControl('', [
      Validators.required,
    ]),
    montant: new FormControl('', [
      Validators.required,
    ]),
    select: new FormControl('', [
      Validators.required,
    ]),
    nombre: new FormControl('', [
      Validators.required,
    ]),

  });
  get dateCre() {
    return this.formValue.get('dateCre');
  }
  get dateExec() {
    return this.formValue.get('dateExec');
  }
  get nombre() {
    return this.formValue.get('nombre');
  }
  get motif() {
    return this.formValue.get('motif');
  }
  get select() {
    return this.formValue.get('select');
  }
  get montant() {
    return this.formValue.get('montant');
  }

  ifBenef = false
  ifMontant = false
  onSubmit() {
    if (!this.resultEmpty) {
      var sumMontant: number = this.result.map(a => parseFloat(a.montant)).reduce(function (a, b) {
        return a + b;
      });
      console.log(sumMontant)
      if (this.formValue.value.nombre != this.result.length) {
        this.ifBenef = true;
        console.log('warah mkhtalfin')
      } else {

        this.ifBenef = false;
      }
      if (this.formValue.value.montant != sumMontant) {
        this.ifMontant = true;
      } else {
        this.ifMontant = false;

        console.log(this.formValue.value)

      }
    }

  }
  swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })



  vm = {
    debiteur: {
      id: 0
    },
    sommeEnv: 0,
    vmb: [{
      beneficiaire: {
        numeroCompte: ''
      },
      montant: 0
    }]
  }

  CheckPass() {
    this.onSubmit()
    console.log(this.formValue.invalid)
    if (!this.ifBenef && !this.ifMontant) {
      Swal.fire({
        title: 'Confirm your password',
        input: 'password',
        showCancelButton: true,
        confirmButtonText: 'OK',


      }).then((valeur) => {

        if (valeur.value === atob(sessionStorage.getItem('cryptedPass')) && valeur.isConfirmed) {
          if (this.resultEmpty) {

            this.swalWithBootstrapButtons.fire(
              'Beneficiary transfer not found',
              '',
              'error'
            )
          } else {
            this.accountService.findAccountNum(this.formValue.value.select).subscribe(
              response => {
                this.vm.debiteur.id = response.id
                this.vm.sommeEnv = this.formValue.value.montant;
                this.vm.vmb = this.result.map(varr => ({
                  beneficiaire: {
                    numeroCompte: varr.numeroCompte
                  },
                  montant: parseFloat(varr.montant)
                }));
                console.log(this.vm)
                this.vmService.saveVirementMultiple(this.vm).subscribe(
                  res => {
                    console.log(res);
                    console.log('fkhaaaaaaaater j3iidii')
                    this.swalWithBootstrapButtons.fire(
                      'Transaction Sent !',
                      '',
                      'success'
                    )
                  },
                  (error: HttpErrorResponse) => {
                    console.log(error)
                    if(error.error.message === "Vous n'avez pas de solde suffisant !"){
                      this.swalWithBootstrapButtons.fire(
                        'Not enough money !',
                        '',
                        'error'
                      )
                    
                    }
                  }
                )

              },
              (error: HttpErrorResponse) => {
                console.log(error)
              }
            )
          }


        } else {
          this.swalWithBootstrapButtons.fire(
            'Wrong Password',
            '',
            'error'
          )
        }
      })
    }
  }





}
