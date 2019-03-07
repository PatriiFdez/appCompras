import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  provsURL = 'https://comprasapp-5cebc.firebaseio.com/proveedores.json';
  provURL = 'https://comprasapp-5cebc.firebaseio.com/proveedores';

  constructor(private http: Http) { }

  postProveedor(proveedor: any) {
    const newprov = JSON.stringify(proveedor);
    const headers = new Headers({
      'Content-Type' : 'application/json'
    });

    return this.http.post( this.provsURL, newprov, {headers})
    .pipe(map( res => {
      console.log(res.json());
      return res.json();
    }));
  }

  getProveedores() {
    return this.http.get( this.provsURL )
      .pipe(map(
        res => res.json()
      ));
  }

  getProveedor(id$: string) {
    const url = `${this.provURL}/${id$}.json`;
    return this.http.get(url)
    .pipe(map( res => res.json() ));
  }

  putProveedor(proveedor: any, id$: string) {
    const newprov = JSON.stringify(proveedor);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    const url = `${this.provURL}/${id$}.json`;

    return this.http.put( url, newprov, {headers})
    .pipe(map( res => {
      console.log(res.json());
      return res.json();
    }));
  }

  delProveedor ( id$: string ) {
    const url  = `${this.provURL}/${id$}.json`;
    return this.http.delete( url )
      .pipe(map( res => res.json() ));
  }

  getProveedoresSearch(busqueda: string) {
    const url = `${ this.provsURL }?orderBy="nombre"&startAt="${ busqueda }"&endAt="${ busqueda }\uf8ff"`;
    return this.http.get(url)
      .pipe( map ( res => res.json() ));
  }
}
