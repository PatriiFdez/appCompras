import { Component, OnInit } from '@angular/core';
import { LoadfileService } from '../../servicios/loadfile.service';
import { Archivo } from './../file.modal';
import { AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.css']
})
export class ContratosComponent implements OnInit {

  // uploads: AngularFireList<Archivo[]>;
  uploads : Array<any> = [];

  constructor(private loadfileService: LoadfileService) { }

  // ngOnInit() {
  //   this.uploads = this.loadfileService.getUploads()
  // }

  ngOnInit() {
    this.loadfileService.getUploads()
        .subscribe(
      (element) => {
        this.uploads = [];
        // tslint:disable-next-line:forin
        for (const id$ in element) {
            const e = element[id$];
            const p = e.payload.val();
            this.uploads.push({
                $key: e.key,
                name: p.name,
                url: p.url
              });
            }
          });
        }

}
