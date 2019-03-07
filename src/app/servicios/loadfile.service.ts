// import { Injectable } from '@angular/core';
// import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
// import * as firebase from 'firebase';
// import { Archivo } from '../uploads/file.modal';

// @Injectable(
//  /*  {
//   providedIn: 'root'
// } */
// )
// export class LoadfileService {

//   private basePath = '/uploads';
//   uploads: AngularFireList<Archivo[]>;

//   constructor(public angularFireDatabase: AngularFireDatabase) { }

//   pushUpload(upload: Archivo) {
//     const storageRef = firebase.storage().ref();
//     const uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

//     uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
//       (snapshot) => {
//         upload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes * 100);
//       },
//       (error) => {
//         console.log(error);
//       },
//       () => {
//         console.log(upload.url);
//         if (upload.url === undefined) {
//           upload.url = null;
//           console.log(upload.url);
//         } else {
//           upload.url = uploadTask.snapshot.downloadURL;
//           console.log(upload.url);
//         }
//         upload.name = upload.file.name;
//         this.saveFileData(upload);
//       }
//       );
//   }

//   private saveFileData(upload: Archivo) {
//     this.angularFireDatabase.list(`${this.basePath}/`).push(upload);
//   }

//   getUploads() {
//     this.uploads = this.angularFireDatabase.list(this.basePath);
//     return this.uploads;
//   }

//   deleteUpload(upload: Archivo) {
//     this.deleteFileData(upload.$key)
//       .then(() => {
//         this.deleteFileStorage(upload.name);
//       })
//       .catch ( error => console.log(error));
//   }

//   private deleteFileData(key: string) {
//     return this.angularFireDatabase.list(`${this.basePath}/`).remove(key);
//   }

//   private deleteFileStorage (name: string) {
//     const storageRef = firebase.storage().ref();
//     storageRef.child(`${this.basePath}/${name}`).delete();
//   }

// }


//IMPORTS
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Archivo } from '../uploads/file.modal';

//LOADFILE SERVICE
@Injectable({
  providedIn: 'root'
})
export class LoadfileService{
  //ATTRIBUTES
  private basePath: string = "/uploads";
  public uploads: AngularFireList<Archivo[]>;

  //METHODS
  //CONSTRUCT
  public constructor(
    public angularFireDatabase: AngularFireDatabase
  ){

  }//END OF CONSTRUCT

  //PUSH UPLOAD METHOD
  public pushUpload( upload: Archivo ): any{
    //VARIABLES
    var storageRef: any = firebase.storage().ref();
    var uploadTask: any = storageRef.child( `${this.basePath}/${upload.file.name}` ).put( upload.file );

    //UPLOAD
    uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED, ( snapshot ) => {
        upload.progress = ( snapshot[ "bytesTransferred" ] / snapshot[ "totalBytes" ] * 100 );
      }, ( error ) => {
        console.log( error );
      }, () => {
        uploadTask.snapshot.ref.getDownloadURL().then( ( downloadURL ) => {
            upload.url = downloadURL;
            upload.name = upload.file.name;
            delete upload.progress;

            //SAVE
            this.angularFireDatabase.list( `${this.basePath}/` ).push( upload );
          }
        );
      });
  }//END OF PUSH UPLOAD METHOD

  //GET UPLOADS METHOD
  public getUploads(): any{
    //RETURN UPLOADS
    const uploads = this.angularFireDatabase.list<Archivo>( this.basePath ).snapshotChanges();
    return uploads;
  }//END OF GET UPLOADS METHOD

  //DELETE METHOD
  public deleteUpload( upload: Archivo ): void {
    this.deleteFileData( upload.$key )
        .then( () => {
          //VARIABLES
          var storageRef:any = firebase.storage().ref();

          //DELETE
          storageRef.child(`${this.basePath}/${upload.name}`).delete();
        })
        .catch( ( error ) => console.log( error ) );
  }//END OF DELETE METHOD

  //END OF DELETE FILE DATA METHOD
  private deleteFileData( key:string ): any{
    //RETURN
    return this.angularFireDatabase.list( `${this.basePath}/` ).remove( key );
  }//END OF DELETE FILE DATA METHOD
}//END OF LOADFILE SERVICE
