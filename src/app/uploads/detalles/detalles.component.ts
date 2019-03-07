import { Component, OnInit, Input } from '@angular/core';
import { Archivo } from './../file.modal';
import { LoadfileService } from '../../servicios/loadfile.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {

  ext: string;
  point: number;

  @Input() upload: Archivo;

  constructor(private loadfileService: LoadfileService) {
    // this.point = this.upload.name.indexOf(".");
    // this.ext = this.upload.name.substr(this.point + 1, this.upload.name.length - this.point);
    // console.log(this.ext);
    // console.log(this.upload.name);
   }

  ngOnInit() {
    this.point = this.upload.name.indexOf(".");
    this.ext = this.upload.name.substr(this.point + 1, this.upload.name.length - this.point);
    // console.log(this.ext);
    // console.log(this.upload.name);
  }

  deleteUpload(upload) {
    swal({
      title: '¿Estás seguro?',
      text: `¿Seguro que deseas eliminar el archivo?`,
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
        this.loadfileService.deleteUpload(this.upload);
        swal(
          'Archivo eliminado!',
          `Archivo eliminado con éxito`,
          'success'
        );
      }
    });


    // this.loadfileService.deleteUpload(this.upload);
  }

}
