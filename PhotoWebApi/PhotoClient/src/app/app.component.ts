import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  values: Array<string>;

  constructor(public http: HttpClient) {
    //http.get<Array<string>>('api/value').subscribe(
    //  (res: Array<string>) => {
    //    console.log('Angular: values:' + JSON.stringify(res));
    //    this.values = res;
    //  },
    //  (err: any) => {
    //    console.log('Angular: GET api/value throws an error.');
    //    console.log(err);
    //  }
    //);
  }
}
