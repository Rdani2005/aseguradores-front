import { Routes } from '@angular/router';

import { CieltsTableComponent } from './cielts-table/cielts-table.component';
import { InsuranceTableComponent } from './insurance-table/insurance-table.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { InsuranceViewComponent } from './insurance-view/insurance-view.component';
import { InsuredViewComponent } from './insured-view/insured-view.component';

export const routes: Routes = [
    { path: 'clients', component: CieltsTableComponent },
    { path: 'insurances', component: InsuranceTableComponent },
    { path: 'insurances/:uuid', component: InsuranceViewComponent },
    { path: 'clients/:uuid', component: InsuredViewComponent },
    { path: '**', component: NotFoundComponent },
];
