export class RegisterViewModel {
  email: string;
  password: string;
  confirmPassword: string;
}

export class LoginViewModel {
  email: string;
  password: string;
}

export class PhotoViewModel {
  photoId: number;
  title: string;
  fileName: string;
  imageMimeType: string;
  description: string;
  userName: string;
  createdDate: Date;
  modifiedDate: Date;
  relatedComments: Array<CommentViewModel>;
}

export class CommentViewModel {
  commentId: number;
  photoId: number;
  userName: string;
  body: string;
  createdDate: Date;
}
