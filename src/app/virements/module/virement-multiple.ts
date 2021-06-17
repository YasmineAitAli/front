import { BeneficiaireModule } from "src/app/beneficiaire/module/beneficiaire/beneficiaire.module";
import { Vmb } from "./vmb";

export interface VirementMultiple {
    
    
        debiteur: {
            id: number,
            numero: string,
            solde: number,
        },
        sommeEnv: number,
        vmb: [
            {
                beneficiaire: BeneficiaireModule
                montant: number
            }
        ]
    }

