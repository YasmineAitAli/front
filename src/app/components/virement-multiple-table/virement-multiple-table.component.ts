import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { VirementMultiple } from 'src/app/virements/module/virement-multiple';
import { VirementMultipleService } from 'src/app/virements/service/virement-multiple.service';
import { LoadingService } from '../loading/loading.service';

@Component({
  selector: 'app-virement-multiple-table',
  templateUrl: './virement-multiple-table.component.html',
  styleUrls: ['./virement-multiple-table.component.scss']
})
export class VirementMultipleTableComponent implements OnInit {

  settings = {
    columns: {
      virementMultipleId: {
        title: 'Id',
        editable:false,
        addable:false,
        sortDirection:'desc'
      },
      debiteur: {
        title: 'compte debiteur',
        valuePrepareFunction: (value: any,row:any,cell:any) => {
          value = cell.newValue.numero
          return value
      },
      },
      vmb: {
        title: 'Montant',

        valuePrepareFunction: (value: any,row:any,cell:any) => {
          var arr = []
          cell.newValue.map(v=>{
            arr.push(v.montant)
            value = arr
          })
          return value+' MAD'
      },

      },   
      beneficiaire: {
        title: 'beneficiaires',
        valuePrepareFunction: (value: any,row:any,cell:any) => {
          var arr = []
          row.vmb.map(v=>{
            arr.push(v.beneficiaire.compteOwner.proprietaire.nom)
            value = arr
          })
          return value
      },
      },
      sommeEnv: {
        title: 'Somme Envoyée'
      },
      
      date:{
        title:'date',
        editable:false,
        addable: false
      },


    },
    pager: {
      display: true,
      perPage: 12,
    },
    actions: {
      add: false,
      edit:false,
      delete:false,
      
      
    },
    attr: {
      class: 'table'
    },

  };


  loading$ = this.loader.loading$;

  constructor(private virementMultipleService : VirementMultipleService, public loader:LoadingService) { }

  ngOnInit(): void {
    this.getVirementMultiple()
  }
  clientId:string=sessionStorage.getItem('currentClientId')

  vmb:VirementMultiple[]
  getVirementMultiple(){
    this.virementMultipleService.getVirementById(this.clientId).subscribe(
      (response:VirementMultiple[]) => {
        this.vmb = response
      },
      (error:HttpErrorResponse)=>{
        console.log(error)
      }
    )
  }

}
