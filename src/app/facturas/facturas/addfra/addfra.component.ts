import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FacturasService } from '../../facturas.service';
import { ProveedoresService } from '../../../servicios/proveedores.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addfra',
  templateUrl: './addfra.component.html',
  styleUrls: ['./addfra.component.css']
})
export class AddfraComponent implements OnInit {

  facturaForm: FormGroup;
  factura: any;

  currentDate: Date = new Date();
  minDate: Date = new Date(1970, 1, 1);
  maxDate: Date = new Date();

  proveedores: any[] = [];

  constructor(private ff: FormBuilder,
              private facturaService: FacturasService,
              private proveedoresService: ProveedoresService,
              private router: Router) {
                this.proveedoresService.getProveedores()
                  .subscribe( proveedores => {
                    for (const id$ in proveedores) {
                      const p = proveedores[id$];
                      p.id$ = id$;
                      this.proveedores.push(proveedores[id$]);
                    }
                  });
               }

  ngOnInit() {
    this.facturaForm = this.ff.group({
      codigo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
      fecha: ['', Validators.required],
      concepto: ['', [Validators.required, Validators.minLength(10)] ],
      proveedor: ['', [Validators.required, Validators.minLength(3)] ],
      total: ['', Validators.required]
    });
  }

  onSubmit() {
    this.factura = this.saveFactura();
    this.facturaService.postFactura(this.factura)
          .subscribe(newfra => {
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
