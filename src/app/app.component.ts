import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'appCompras';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyDdCPtXO8lpQm6EI9E-TxltvjQa2fcevf0",
      authDomain: "comprasapp-5cebc.firebaseapp.com",
      databaseURL: "https://comprasapp-5cebc.firebaseio.com",
      projectId: "comprasapp-5cebc",
      storageBucket: "comprasapp-5cebc.appspot.com",
      messagingSenderId: "83952032573"
    });
  }
}

