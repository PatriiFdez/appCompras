import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProveedoresService } from '../../servicios/proveedores.service';
import swal from 'sweetalert2';
import * as Lodash from 'lodash';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  // campoBusqueda: FormControl;
  // busqueda: string;

  proveedores: any[] = [];
  cargando = false;
 /*  resultados = false; */
  noresultados = false;

  nombre: string;
  cif: string;
  cp: string;
  localidad: string;
  provincia: string;
  telefono: string;
  email: string;
  contacto: string;

  filteredProveedores: any[] = [];
  filters: {} = {};

  provincias: string[] = [ 'Álava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Ávila', 'Badajoz',
     'Barcelona', 'Burgos', 'Cáceres', 'Cádiz', 'Cantabria', 'Castellón', 'Ciudad Real', 'Córdoba',
     'La Coruña', 'Cuenca', 'Gerona', 'Granada', 'Guadalajara', 'Guipúzcoa', 'Huelva', 'Huesca',
     'IslasBaleares', 'Jaén', 'León', 'Lérida', 'Lugo', 'Madrid', 'Málaga', 'Murcia', 'Navarra', 'Orense',
     'Palencia', 'Las Palmas', 'Pontevedra', 'La Rioja', 'Salamanca', 'Segovia', 'Sevilla', 'Soria',
     'Tarragona', 'Santa Cruz de Tenerife', 'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya',
     'Zamora', 'Zaragoza' ];

  constructor(private proveedoresService: ProveedoresService) {
    // this.proveedoresService.getProveedores()
    //   .subscribe( proveedores => {
    //     for (const id$ in proveedores) {
    //       const p = proveedores[id$];
    //       p.id$ = id$;
    //       this.proveedores.push(proveedores[id$]);
    //     }
    //     this.cargando = false;
    //   });
  }

  ngOnInit() {
    this.cargando = true;
    this.proveedoresService.getProveedores()
      .subscribe(proveedores => {
        this.proveedores = [];

        for (const id$ in proveedores) {
          const p = proveedores[id$];
          p.id$ = id$;
          this.proveedores.push(proveedores[id$]);
        }
        this.applyFilters();
        if(this.proveedores.length < 1) {
          this.noresultados = true;
          this.cargando = true;
        } else {
          this.noresultados = false;
          // this.resultados = true;
          this.cargando = false;
        }
      });
    // this.campoBusqueda = new FormControl();
    // this.campoBusqueda.valueChanges
    //   .subscribe( term => {
    //     this.busqueda = term;
    //     this.cargando = true;
    //     if ( this.busqueda.length !== 0 ) {
    //       this.proveedoresService.getProveedoresSearch(this.busqueda)
    //         .subscribe( proveedores => {
    //           this.proveedores = [];
    //           for (const id$ in proveedores) {
    //             const p = proveedores[id$];
    //             p.id$ = id$;
    //             this.proveedores.push(proveedores[id$]);
    //           }
    //           if ( this.proveedores.length < 1 && this.busqueda.length >= 1) {
    //             this.noresultados = true;
    //           } else {
    //             this.noresultados =  false;
    //           }
    //         });
    //       this.cargando = false;
    //     } else {
    //       this.noresultados =  false;
    //       this.proveedores = [];

    //       this.proveedoresService.getProveedores()
    //         .subscribe( proveedores => {
    //           for (const id$ in proveedores) {
    //             const p = proveedores[id$];
    //             p.id$ = id$;
    //             this.proveedores.push(proveedores[id$]);
    //           }
    //         });
    //       this.cargando = false;
    //     }
    // });
  }

  // Funciones para filtrado

  private applyFilters() {
    this.filteredProveedores = Lodash.filter(this.proveedores, Lodash.conforms(this.filters));

    console.log(this.filteredProveedores);
    console.log(this.proveedores);
  }

  filterValue(property: string, rule: string) {
    this.filters[property] = val => Lodash.includes(val, rule);
    this.applyFilters();
  }

  filterProvincia(property: string, rule: string){
    this.filters[property] = val => Lodash.includes(val, rule);
    this.applyFilters();
  }

  eliminarProveedor(id$) {
    swal({
      title: '¿Estás seguro?',
      text: `¿Seguro que deseas eliminar el proveedor?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.proveedoresService.delProveedor(id$)
          .subscribe( res => {
            this.proveedores = [];
            this.filteredProveedores = [];
            this.proveedoresService.getProveedores()
              .subscribe( proveedores => {
                for( const id$ in proveedores ) {
                  const p = proveedores[id$];
                  p.id$ = id$;
                  this.proveedores.push(proveedores[id$]);
                  this.filteredProveedores.push(proveedores[id$]);
                }
              });
          });
          this.applyFilters();
        swal(
          'Proveedor eliminado!',
          `Proveedor eliminado con éxito`,
          'success'
        );
      }
    });
  }

}
