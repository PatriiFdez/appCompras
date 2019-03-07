import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProveedoresService } from '../../servicios/proveedores.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addprovee',
  templateUrl: './addprovee.component.html',
  styleUrls: ['./addprovee.component.css']
})
export class AddproveeComponent implements OnInit {

  proveedorForm: FormGroup;
  proveedor: any;

  provincias: string[] = [ 'A Coruña', 'Álava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Ávila', 'Badajoz',
  'Baleares', 'Barcelona', 'Burgos', 'Cáceres', 'Cádiz', 'Cantabria', 'Castellón', 'Ceuta', 'Ciudad Real', 'Córdoba',
  'Cuenca', 'Extranjero', 'Girona', 'Granada', 'Guadalajara', 'Guipúzcoa', 'Huelva', 'Huesca', 'Jaén', 'La rioja',
  'Las palmas', 'León', 'Lleida', 'Lugo', 'Madrid', 'Málaga', 'Melilla', 'Murcia', 'Navarra', 'Ourense', 'Palencia',
  'Pontevedra', 'Salamanca', 'Santa cruz de tenerife', 'Segovia', 'Sevilla', 'Soria', 'Tarragona', 'Teruel', 'Toledo',
  'Valencia', 'Valladolid', 'Vizcaya', 'Zamora', 'Zaragoza'
  ];

  constructor(private pf: FormBuilder,
              private router: Router,
              private proveedorService: ProveedoresService) { }

  ngOnInit() {
    this.proveedorForm = this.pf.group({
      nombre: ['', [Validators.required, Validators.minLength(2)] ],
      cif: ['', [Validators.required, Validators.maxLength(9), Validators.minLength(9)] ],
      direccion: ['', [Validators.required, Validators.minLength(3)]],
      cp: ['', [Validators.required, Validators.min(0), Validators.max(99999)] ],
      localidad: ['', [Validators.required, Validators.minLength(3)]],
      provincia: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', Validators.required],
      contacto: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit() {
    this.proveedor = this.saveProveedor();
    this.proveedorService.postProveedor(this.proveedor)
      .subscribe( newprov => {
        this.router.navigate(['/proveedores']);
      });
      this.proveedorForm.reset();
  }

  saveProveedor() {
    const saveProveedor = {
      nombre: this.proveedorForm.get('nombre').value,
      cif: this.proveedorForm.get('cif').value,
      direccion: this.proveedorForm.get('direccion').value,
      cp: this.proveedorForm.get('cp').value,
      localidad: this.proveedorForm.get('localidad').value,
      provincia: this.proveedorForm.get('provincia').value,
      telefono: this.proveedorForm.get('telefono').value,
      email: this.proveedorForm.get('email').value,
      contacto : this.proveedorForm.get('contacto').value
    };
    return saveProveedor;
  }

}
