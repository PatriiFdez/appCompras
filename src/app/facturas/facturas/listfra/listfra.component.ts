import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FacturasService } from '../../facturas.service';
import swal from 'sweetalert2';
import * as Lodash from 'lodash';

@Component({
  selector: 'app-listfra',
  templateUrl: './listfra.component.html',
  styleUrls: ['./listfra.component.css']
})
export class ListfraComponent implements OnInit {

  campoBusqueda: FormControl;
  busqueda: string;

  facturas: any[] = [];
  noresultados = false;

  cargando = false;

  codigo: string;
  fecha: string;
  concepto: string;
  proveedor: string;
  total: string;

  filteredFacturas: any[] = [];
  filters: {} = {};

  constructor(private facturasService: FacturasService) {
    // this.facturasService.getFacturas()
    //   .subscribe( facturas => {
    //     for(const id$ in facturas) {
    //       const f = facturas[id$];
    //       f.id$ = id$;
    //       this.facturas.push(facturas[id$]);
    //     }
    //   });
  }

  ngOnInit() {
    this.cargando = true;
    this.facturasService.getFacturas()
      .subscribe(facturas => {
        this.facturas = [];

        for (const id$ in facturas) {
          const p = facturas[id$];
          p.id$ = id$;
          this.facturas.push(facturas[id$]);
        }
        this.applyFilters();
        if(this.facturas.length < 1) {
          this.noresultados = true;
          this.cargando = true;
        } else {
          this.noresultados = false;
          // this.resultados = true;
          this.cargando = false;
        }
      });
//     this.campoBusqueda = new FormControl();
//     this.campoBusqueda.valueChanges
//       .subscribe( term => {
//         this.busqueda = term;
//         if ( this.busqueda.length !== 0 ) {
//           this.facturasService.getFacturasSearch(this.busqueda)
//             .subscribe( facturas => {
//               this.facturas = [];
//               for (const id$ in facturas) {
//                 const fra = facturas[id$];
//                 fra.id$ = id$;
//                 this.facturas.push(facturas[id$]);
//               }
//               if ( this.facturas.length < 1 && this.busqueda.length >= 1) {
//                 this.noresultados = true;
//               } else {
//                 this.noresultados =  false;
//               }
//             });
//        } else {
//         this.noresultados =  false;
//         this.facturas = [];

//         this.facturasService.getFacturas()
//           .subscribe( facturas => {
//             for (const id$ in facturas) {
//               const fra = facturas[id$];
//               fra.id$ = id$;
//               this.facturas.push(facturas[id$]);
//             }
//           });
// /*           this.resultados = false;
//  */        }
//       });
  }

  private applyFilters() {
    this.filteredFacturas = Lodash.filter(this.facturas, Lodash.conforms(this.filters));

    console.log(this.filteredFacturas);
    console.log(this.facturas);
  }

  filterValue(property: string, rule: string) {
    this.filters[property] = val => Lodash.includes(val, rule);
    this.applyFilters();
  }
  eliminarFactura(id$) {
    swal({
      title: '¿Estás seguro?',
      text: `¿Seguro que deseas eliminar la factura?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.facturasService.delFactura(id$)
      .subscribe( red => {
        this.facturas = [];
        this.facturasService.getFacturas()
          .subscribe( facturas => {
            for (const id$ in facturas) {
              const f = facturas[id$];
              f.id$ = id$;
              this.facturas.push(facturas[id$]);
            }
          });
      });
        swal(
          'Factura eliminada!',
          `Factura eliminada con éxito`,
          'success'
        );
      }
    });
  }

}
