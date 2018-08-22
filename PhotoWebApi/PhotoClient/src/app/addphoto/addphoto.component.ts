import { Component, OnInit } from '@angular/core';
import { PhotoViewModel } from '../viewmodels';
import { PhotoService } from '../photo.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-addphoto',
  templateUrl: './addphoto.component.html',
  styleUrls: ['./addphoto.component.css']
})
export class AddphotoComponent implements OnInit {
  loading: boolean = false;
  errMsg: string;
  addPhotoForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  constructor(private router: Router, private photoService: PhotoService) { }

  ngOnInit() {
  }

  get title(): AbstractControl { return this.addPhotoForm.get('title'); }
  get description(): AbstractControl { return this.addPhotoForm.get('description'); }

  AddPhoto(file: HTMLInputElement): void {
    let files: FileList | null = file.files;
    if (files === null || files.length === 0) {
      this.errMsg = "File is not selected.";
      return;
    }
    if (this.addPhotoForm.invalid) {
      return;
    }

    // The form is valid. Post data and file.
    this.loading = true;
    let formData: FormData = new FormData();
    formData.append('title', this.addPhotoForm.value.title);
    formData.append('description', this.addPhotoForm.value.description);
    let fileContent: File = files[0];
    formData.append('file', fileContent, fileContent.name);
    this.photoService.AddPhoto(formData).subscribe(
      (result: Object) => {
        this.router.navigate(['/home']);
      },
      (err: HttpErrorResponse) => {
        // Provide description error message based on http response status code.
        if (err.status == 400) {
          this.errMsg = err.error;
        }
        else {
          this.errMsg = err.message;
        }
      });
  }
}
