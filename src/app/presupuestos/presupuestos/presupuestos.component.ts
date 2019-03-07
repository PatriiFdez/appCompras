import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PresupuestosService } from '../../servicios/presupuestos.service';
import swal from 'sweetalert2';
import * as Lodash from 'lodash';

@Component({
  selector: 'app-presupuestos',
  templateUrl: './presupuestos.component.html',
  styleUrls: ['./presupuestos.component.css']
})
export class PresupuestosComponent implements OnInit {

  campoBusqueda: FormControl;
  busqueda: string;

  presupuestos: any[] = [];
  noresultados = false;
  cargando = false;

  proveedor: string;
  fecha: string;
  concepto: string;
  importe: string;
  iva: string;
  total: string;

  filteredPresupuestos: any[] = [];
  filters: {} = {};

  constructor(private presupuestosService: PresupuestosService) {
    // this.presupuestosService.getPresupuestos()
    //   .subscribe(presupuestos => {
    //     for (const id$ in presupuestos) {
    //       const p = presupuestos[id$];
    //       p.id$ = id$;
    //       this.presupuestos.push(presupuestos[id$]);
    //     }
    //   });
   }

  ngOnInit() {
    this.cargando = true;
    this.presupuestosService.getPresupuestos()
      .subscribe(presupuestos => {
        this.presupuestos = [];

        for (const id$ in presupuestos) {
          const p = presupuestos[id$];
          p.id$ = id$;
          this.presupuestos.push(presupuestos[id$]);
        }
        this.applyFilters();
        if(this.presupuestos.length < 1) {
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
    //     if ( this.busqueda.length !== 0) {
    //       this.presupuestosService.getPresupuestosSearch(this.busqueda)
    //         .subscribe ( presupuestos => {
    //           this.presupuestos = [];
    //           for (const id$ in presupuestos) {
    //             const pres = presupuestos[id$];
    //             pres.id$ = id$;
    //             this.presupuestos.push(presupuestos[id$]);
    //           }
    //           if (this.presupuestos.length < 1 && this.busqueda.length >=1) {
    //             this.noresultados = true;
    //           } else {
    //             this.noresultados = false;
    //           }
    //         });
    //     } else {
    //       this.noresultados = false;
    //       this.presupuestos = [];

    //       this.presupuestosService.getPresupuestos()
    //       .subscribe(presupuestos => {
    //         for (const id$ in presupuestos) {
    //           const p = presupuestos[id$];
    //           p.id$ = id$;
    //           this.presupuestos.push(presupuestos[id$]);
    //         }
    //       });
    //     }
    //   });
  }

  private applyFilters() {
    this.filteredPresupuestos = Lodash.filter(this.presupuestos, Lodash.conforms(this.filters));

    console.log(this.filteredPresupuestos);
    console.log(this.presupuestos);
  }

  filterValue(property: string, rule: string) {
    this.filters[property] = val => Lodash.includes(val, rule);
    this.applyFilters();
  }

  eliminarPresupuesto(id$) {
    swal({
      title: '¿Estás seguro?',
      text: `¿Seguro que deseas eliminar el presupuesto?`,
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
        this.presupuestosService.delPresupuesto(id$)
        .subscribe( res => {
         this.presupuestos = [];
         this.filteredPresupuestos = [];
          this.presupuestosService.getPresupuestos()
          .subscribe(presupuestos => {
            for (const id$ in presupuestos) {
              const p = presupuestos[id$];
              p.id$ = id$;
              this.presupuestos.push(presupuestos[id$]);
            }
          });
        });
        this.applyFilters();
        swal(
          'Presupuesto eliminado!',
          `Presupuesto eliminado con éxito`,
          'success'
        );
      }
    });
  }
}
