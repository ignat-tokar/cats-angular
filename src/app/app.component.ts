import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cats-angular';
  catsArray: any;
  breedsArray: any;
  breedsIdArray: any;
  imagesArray = ['','','','',''];
  isUpload = false;
  selectedId: any;

  name = new FormControl('');
  
  constructor (private http: HttpClient){}

  ngOnInit (): void {
    this.http.get('https://api.thecatapi.com/v1/breeds', {
      headers: 
        {'x-api-key': '4a5498bc-cbe8-42c6-ad97-b6cccd69cca0'}
    })
      .subscribe((response: any) => {
        this.breedsArray = response.map((breed: any) => [breed.name, breed.id]);
        // this.breedsIdArray = response.map((breed: any) => breed.id);
        // for (let i = 0; i < 5; i++){
        //   this.http.get(`https://api.thecatapi.com/v1/images/search?breed_id=${this.breedsIdArray[10]}`, {
        //     headers:
        //       { 'x-api-key': '4a5498bc-cbe8-42c6-ad97-b6cccd69cca0' }
        //   })
        //     .subscribe((response: any) => {
        //       this.imagesArray[i] = response[0].url;
        //     });
          
        // }
        // this.catsArray = response.map((breed: any) => {
        //   return breed.url;
        // })
        // this.catsArray = response.data[0].url;
        this.getRandomImagesArray();
        this.isUpload = true;
      });
    let obs$ = this.name.valueChanges;
    obs$.subscribe(value => {
      if(value === 'all'){
        this.getRandomImagesArray();
      }else{
        this.selectedId = value;
        this.updateImagesArray();
      }
    });
  }
  updateImagesArray(): void {
    for (let i = 0; i < 5; i++){
      this.http.get(`https://api.thecatapi.com/v1/images/search?breed_id=${this.selectedId}`, {
        headers:
          { 'x-api-key': '4a5498bc-cbe8-42c6-ad97-b6cccd69cca0' }
      })
        .subscribe((response: any) => {
          this.imagesArray[i] = response[0].url;
        });
    }
  }
  getRandomImagesArray(): void {
    for (let i = 0; i < 5; i++){
      this.http.get(`https://api.thecatapi.com/v1/images/search`, {
        headers:
          { 'x-api-key': '4a5498bc-cbe8-42c6-ad97-b6cccd69cca0' }
      })
        .subscribe((response: any) => {
          this.imagesArray[i] = response[0].url;
        });
    }    
  }
}

// https://api.thecatapi.com/v1/images/search?limit=10&page=1
