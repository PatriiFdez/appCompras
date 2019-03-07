import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FacturasService } from '../../facturas.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProveedoresService } from '../../../servicios/proveedores.service';

@Component({
  selector: 'app-editfra',
  templateUrl: './editfra.component.html',
  styleUrls: ['./editfra.component.css']
})
export class EditfraComponent implements OnInit {

  facturaForm: FormGroup;
  factura: any;
  base: any;
  tipo: any;
  iva: any = 0;
  total: any = 0;

  id: string;
  proveedores: any[] = [];

  constructor(private ff: FormBuilder,
              private facturaService: FacturasService,
              private proveedoresService: ProveedoresService,
              private router: Router,
              private activatedRouter: ActivatedRoute) {
                this.proveedoresService.getProveedores()
                  .subscribe( proveedores => {
                    for (const id$ in proveedores) {
                      const p = proveedores[id$];
                      p.id$ = id$;
                      this.proveedores.push(proveedores[id$]);
                    }
                  });
                this.activatedRouter.params
                .subscribe( parametros => {
                  this.id = parametros['id'];
                  this.facturaService.getFactura( this.id )
                    .subscribe( factura => this.factura = factura);
                });
              }

  ngOnInit() {
    this.facturaForm = this.ff.group({
      codigo: ['', [Validators.required, Validators.minLength(3)] ],
      fecha: ['', Validators.required],
      concepto: ['', [Validators.required, Validators.minLength(10)] ],
      proveedor: ['', [Validators.required, Validators.minLength(3)] ],
      total: ['', Validators.required]
    });
  }

  onSubmit() {
    this.factura = this.saveFactura();
    this.facturaService.putFactura(this.factura, this.id)
          .subscribe(newpres => {
            this.router.navigate(['/facturas']);
        });

        this.facturaForm.reset();
  }

  saveFactura() {
    const saveFactura = {
      codigo: this.facturaForm.get('codigo').value,
      fecha: this.facturaForm.get('fecha').value,
      concepto: this.facturaForm.get('concepto').value,
      proveedor: this.facturaForm.get('proveedor').value,
      total: this.facturaForm.get('total').value
    };
    return saveFactura;
  }
}
