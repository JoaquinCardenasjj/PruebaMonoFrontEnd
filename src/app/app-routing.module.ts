import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FacturasListComponent } from './Facturas/facturas-list/facturas-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'factura', pathMatch: 'full' },
  { path: 'factura', component: FacturasListComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
