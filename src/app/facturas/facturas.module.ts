import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddfraComponent } from './facturas/addfra/addfra.component';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { EditfraComponent } from './facturas/editfra/editfra.component';
import { ListfraComponent } from './facturas/listfra/listfra.component';
import { FacturasService } from './facturas.service';
import { GuardService } from '../servicios/guard.service';

const routes: Routes = [
  { path: 'facturas', component: ListfraComponent, canActivate: [GuardService] },
  { path: 'addfra', component: AddfraComponent, canActivate: [GuardService] },
  { path: 'editfra/:id', component: EditfraComponent, canActivate: [GuardService] }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
  ],
  declarations: [AddfraComponent, EditfraComponent, ListfraComponent],
  providers: [FacturasService, GuardService]
})
export class FacturasModule { }

