import { RouterModule, Routes } from '@angular/router';
import { SupplyRegistrationComponent } from './supply-registration/supply-registration.component';
import { SupplyListingComponent } from './supply-listing/supply-listing.component';

const appRoutes = [
  { path: '', component: SupplyListingComponent },
  { path: 'cadastro', component: SupplyRegistrationComponent },
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot( appRoutes );
