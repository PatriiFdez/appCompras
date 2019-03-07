import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule} from 'angularfire2/auth';
import { enviroment } from './config/firebase.config';

import { AppComponent } from './app.component';
import { ProveedoresService} from './servicios/proveedores.service';
import { ProveedoresComponent } from './proveedores/proveedores/proveedores.component';
import { InicioComponent } from './inicio/inicio.component';
import { HeaderComponent } from './header/header.component';
import { AddproveeComponent } from './proveedores/addprovee/addprovee.component';
import { AddpresComponent } from './presupuestos/addpres/addpres.component';
import { PresupuestosService } from './servicios/presupuestos.service';
import { PresupuestosComponent } from './presupuestos/presupuestos/presupuestos.component';
import { EditpresComponent } from './presupuestos/editpres/editpres.component';
import { RegistroComponent } from './autentication/registro/registro.component';
import { AutenticacionService } from './servicios/autenticacion.service';
import { InisesComponent } from './autentication/inises/inises.component';
import { GuardService } from './servicios/guard.service';

import { FacturasModule } from './facturas/facturas.module';
import { AddfraComponent } from './facturas/facturas/addfra/addfra.component';
import { UploadComponent } from './uploads/upload/upload.component';

import { LoadfileService } from './servicios/loadfile.service';
import { ContratosComponent } from './uploads/contratos/contratos.component';
import { DetallesComponent } from './uploads/detalles/detalles.component';
import { EditproveeComponent } from './proveedores/editprovee/editprovee.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'proveedores', component: ProveedoresComponent,
    canActivate: [GuardService] },
  { path: 'addprov', component: AddproveeComponent,
  canActivate: [GuardService] },
  { path: 'editprov/:id', component: EditproveeComponent,
  canActivate: [GuardService] },
  { path: 'addpres', component: AddpresComponent,
  canActivate: [GuardService] },
  { path: 'presupuestos', component: PresupuestosComponent,
  canActivate: [GuardService] },
  { path: 'editpres/:id', component: EditpresComponent,
  canActivate: [GuardService] },
  { path: 'registro', component: RegistroComponent },
  { path: 'inises', component: InisesComponent },
  { path: 'uploads', component:  UploadComponent },
  { path: 'addfra', component: AddfraComponent },
  { path: 'contratos', component: ContratosComponent },
  { path: '**', component: InicioComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ProveedoresComponent,
    InicioComponent,
    HeaderComponent,
    AddproveeComponent,
    AddpresComponent,
    PresupuestosComponent,
    EditpresComponent,
    RegistroComponent,
    InisesComponent,
    UploadComponent,
    ContratosComponent,
    DetallesComponent,
    EditproveeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    FacturasModule,
    AngularFireModule.initializeApp(enviroment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [ProveedoresService, PresupuestosService, AutenticacionService, GuardService, LoadfileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
