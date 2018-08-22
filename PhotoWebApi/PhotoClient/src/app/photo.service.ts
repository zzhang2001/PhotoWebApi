import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { PhotoViewModel, CommentViewModel } from './viewmodels';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { PhotosComponent } from 'src/app/photos/photos.component';

@Injectable()
export class PhotoService {
  public static readonly ALL_PHOTO_URL: string = 'api/Photo/GetAllPhotos';
  public static readonly ADD_PHOTO_URL: string = 'api/Photo/AddPhoto';
  public static readonly GET_PHOTO_URL: string = 'api/Photo/GetPhoto';
  public static readonly UPDATE_PHOTO_URL: string = 'api/Photo/UpdatePhoto';
  public static readonly DELETE_PHOTO_URL: string = 'api/Photo/DeletePhoto';
  public static readonly ADD_COMMENT_URL: string = 'api/Photo/AddComment';
  public heads: HttpHeaders;

  constructor(private http: HttpClient, private userService: UserService) {
  }

  SetRequestOptions() {
    this.heads = new HttpHeaders();
    // An object of HttpHeaders class is immutable. Any of its method returns a new object
    // but does not modify the original object.
    this.heads = this.heads.set('Content-Type', 'application/json; charset=utf-8');
    let token: string | null = this.userService.sessStorage.getItem(UserService.TOKEN_KEY);
    if (token !== null) {
      this.heads = this.heads.set('Authorization', 'Bearer ' + token);
    }
  }

  SetAuthorizationOption() {
    this.heads = new HttpHeaders();
    let token: string | null = this.userService.sessStorage.getItem(UserService.TOKEN_KEY);
    if (token !== null) {
      this.heads = this.heads.set('Authorization', 'Bearer ' + token);
    }
  }

  // Get all photos.
  GetAllPhotos(): Observable<Array<PhotoViewModel>> {
    this.SetRequestOptions();
    return this.http.get<Array<PhotoViewModel>>(PhotoService.ALL_PHOTO_URL, { headers: this.heads });
  }

  // Add a photo.
  AddPhoto(body: FormData): Observable<Object> {
    this.SetAuthorizationOption();
    // Set Content-Type as multipart/form-data does not work. Angular automatically set the right Content-Type header based on FormData.
    // this.heads = this.heads.set('Content-Type', 'multipart/form-data');
    return this.http.post(PhotoService.ADD_PHOTO_URL, body, { headers: this.heads });
  }

  // Get photo object and related comments array from a photo id.
  GetPhotoAndComments(id: number): Observable<PhotoViewModel> {
    this.SetRequestOptions();
    return this.http.get<PhotoViewModel>(PhotoService.GET_PHOTO_URL + '/' + id, { headers: this.heads });
  }

  // Update title and description of photo data.
  UpdatePhotoData(photo: PhotoViewModel): Observable<PhotoViewModel> {
    this.SetRequestOptions();
    return this.http.post<PhotoViewModel>(PhotoService.UPDATE_PHOTO_URL, photo, { headers: this.heads });
  }

  // Delete photo object and related comments based on a photo id.
  DeletePhotoAndComments(id: number): Observable<Object> {
    this.SetRequestOptions();
    return this.http.post(PhotoService.DELETE_PHOTO_URL + '/' + id, null, { headers: this.heads });
  }

  // Add a new comment.
  AddComment(comment: CommentViewModel): Observable<Array<CommentViewModel>> {
    this.SetRequestOptions();
    return this.http.post<Array<CommentViewModel>>(PhotoService.ADD_COMMENT_URL, comment, { headers: this.heads });
  }
}
