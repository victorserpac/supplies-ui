import { RouterModule, Routes } from '@angular/router';
import { SupplyRegistrationComponent } from './supply-registration/supply-registration.component';

const appRoutes = [
  // { path: '', component: ListagemComponent },
  { path: 'cadastro', component: SupplyRegistrationComponent },
  // { path: 'cadastro/:id', component: CadastroComponent },
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot( appRoutes );
