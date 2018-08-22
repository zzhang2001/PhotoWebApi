import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { PhotoViewModel, CommentViewModel } from '../viewmodels';
import { PhotoService } from '../photo.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  // Object has to be initialized to prevent property undefined or null reference error
  // in browser console.
  photoViewModel: PhotoViewModel = new PhotoViewModel();
  errMsg: string;
  updateErrMsg: string;
  commentErrMsg: string;
  id: number;
  updatePhotoForm: FormGroup = new FormGroup({
    newTitle: new FormControl('', Validators.required),
    newDescription: new FormControl('', Validators.required)
  });
  addCommentForm: FormGroup = new FormGroup({
    newComment: new FormControl('', Validators.required)
  });

  constructor(public userService: UserService, private route: ActivatedRoute, private router: Router, private photoService: PhotoService) {
  }

  ngOnInit() {
    // Any view property with its properties referenced in template has to be initialized to prevent undefined error.
    this.route.params.subscribe(params => this.id = params['id']);
    this.LoadPhotoAndComments();
  }

  LoadPhotoAndComments(): void {
    this.photoService.GetPhotoAndComments(this.id).subscribe(
      (result: PhotoViewModel) => {
        this.photoViewModel = result;
      },
      (err: HttpErrorResponse) => {
        // Provide description error message based on http response status code.
        if (err.status == 404) {
          this.errMsg = err.error;
        }
        else {
          this.errMsg = err.message;
        }
      });
  }

  UpdatePhoto(): void {
    let p: PhotoViewModel = new PhotoViewModel();
    p.photoId = this.id;
    p.title = this.updatePhotoForm.value.newTitle;
    p.description = this.updatePhotoForm.value.newDescription;
    this.photoService.UpdatePhotoData(p).subscribe(
      (result: PhotoViewModel) => {
        this.photoViewModel = result;
      },
      (err: HttpErrorResponse) => {
          this.errMsg = err.message;
      });
  }

  DeletePhoto(): void {
    this.photoService.DeletePhotoAndComments(this.id).subscribe(
      (result: Object) => {
        this.router.navigate(['/home']);
      },
      (err: HttpErrorResponse) => {
        // Provide description error message based on http response status code.
        if (err.status == 404) {
          this.errMsg = err.error;
        }
        else {
          this.errMsg = err.message;
        }
      });
  }

  AddComment(): void {
    let comment: CommentViewModel = new CommentViewModel();
    comment.body = this.addCommentForm.value.newComment;
    comment.photoId = this.photoViewModel.photoId;
    this.photoService.AddComment(comment).subscribe(
      (result: Array<CommentViewModel>) => {
        this.photoViewModel.relatedComments = result;
      },
      (err: HttpErrorResponse) => {
        // Provide description error message based on http response status code.
        if (err.status == 404) {
          this.errMsg = err.error;
        }
        else {
          this.errMsg = err.message;
        }
      });
  }

  get newTitle(): AbstractControl { return this.updatePhotoForm.get('newTitle'); }
  get newDescription(): AbstractControl { return this.updatePhotoForm.get('newDescription'); }
  get newComment(): AbstractControl { return this.addCommentForm.get('newComment'); }

  // TODO: Remove this after disgnosis.
  // get diagnostic() { return JSON.stringify(this.photoViewModel.relatedComments); }
}
