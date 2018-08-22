import { Component, OnInit } from '@angular/core';
import { PhotoViewModel } from '../viewmodels';
import { PhotoService } from '../photo.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
  itemsPerPage: number;
  numOfPages: number;
  currentPage: number;
  photoViewModels: Array<PhotoViewModel>;
  currentPhotoViewModels: Array<PhotoViewModel>;
  errMsg: string;

  constructor(private photoService: PhotoService) {
  }

  ngOnInit() {
    this.itemsPerPage = 3;
    this.photoViewModels = [];
    this.currentPhotoViewModels = [];
    this.LoadAllPhotos();
  }

  createRange(n: number): Array<number> {
    var items: Array<number> = [];
    for (var i = 0; i < n; i++) {
      items.push(i);
    }
    return items;
  }

  showPage(i: number): void {
    this.currentPage = i;
    if (this.currentPage == this.numOfPages) {
      this.currentPhotoViewModels = this.photoViewModels.slice((this.currentPage - 1) * this.itemsPerPage);
    } else {
      this.currentPhotoViewModels = this.photoViewModels.slice(
        (this.currentPage - 1) * this.itemsPerPage,
        (this.currentPage * this.itemsPerPage));
    }
  }

  LoadAllPhotos() {
    this.photoService.GetAllPhotos().subscribe(
      (result: Array<PhotoViewModel>) => {
        this.photoViewModels = result;
        this.numOfPages = Math.ceil(this.photoViewModels.length / this.itemsPerPage);
        this.currentPage = 1;
        this.showPage(this.currentPage);
      },
      (err: HttpErrorResponse) => {
        this.errMsg = err.message;
      });
  }
}
