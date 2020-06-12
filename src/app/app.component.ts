import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'csvupload';
  id: any;
  idBase64: any;

  constructor(private http:HttpClient){}
  getImageData(event) {
    // console.log("event",event)
    // this.IdURLs
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (true) {
        // if (file.size < 5000000) {
          // this.uploadingIdError['backId'] = { show: false, msg: '' };
          // this.id= event.target.files[0];
          const reader = new FileReader();
          reader.onload = (e: any) => {
            // this.idBase64= e.target.result;
          };
          reader.readAsDataURL(event.target.files[0]);
          let file = event.target.files;

          this.uploadImage(file.item(0));
        //}
      }
    }
  }
  uploadImage(imageData) {
    let fileData = new FormData();
    fileData.append('Ref',imageData);
   this.postFormService(fileData).subscribe(res=>{
     console.log('Image Res---->>>',res);
     if(res.code == 200){
        alert(res.message)
     }
   },err=>{
     alert(err.message)
    console.log('Image Err---->>>',err)
   })
  }

  /// Api Base Structure
  public postFormService(postObj): Observable<any> {
    let baseUrl = 'http://13.233.217.250:4000/api/v1/data/importdata';
    return this.http.post(baseUrl, postObj)
        .pipe(catchError(err => this.handleError(err)));
  }

  public handleError(error: Response | any) {
    console.error(error);
    let httpErrorCode = error.status;
    return Observable.throw(error);
  }
}
