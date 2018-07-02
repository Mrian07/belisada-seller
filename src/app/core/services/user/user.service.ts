
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  SignupResponse, SignupData, SigninRequest, ResetPasswdResponse, SendEmailRequest, SendEmailResponse,
  SigninResponse, ActivationRequest, ActivationResponse, EmailChecking, UserLocalStorage, UserData,
  ResetPasswdRequest, Profile, EditProfileResponse, EditProfileRequest, User, UserSignupGuest
} from '@belisada-seller/core/models';

import { JWTUtil } from '@belisada-seller/core/util';

import { Configuration } from '@belisada-seller/core/config';

import { LocalStorageEnum } from '@belisada-seller/core/enum';

import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient,
    private config: Configuration,
    private jwtUtil: JWTUtil
  ) { }

  create1(user: User) {
    return this.http.post('/api/users', user);
  }

  /*
    with Model User
    check email is using by signUp Components for checking email if
    email is existing from backend
  */
  checkEmail(data: EmailChecking): Observable<EmailChecking> {
    return this.http.post(this.config.apiURL + '/account/checkemail', data)
      .pipe(
        map(resp => resp as EmailChecking)
      );
  }

  /*
    with Model User
    signUp is using by SignUp Components For signUP to back end
  */

  signup(data: SignupData): Observable<SignupResponse> {
    return this.http.post(this.config.apiURL + '/account/create', data)
      .pipe(
        map(response => response as SignupResponse)
      );
  }

  /*
    with Model User
    SignIn is using by signIn Components For SignIn To web
  */

  signin(request: SigninRequest): Observable<SigninResponse> {
    request.userType = 'seller';
    return this.http.post(this.config.apiURL + '/account/login', request)
      .pipe(
        map(response => response as SigninResponse)
      );
  }

  /*
    With Model User
    Activation Is using by signUp-Activation
  */

  activation(request: ActivationRequest): Observable<ActivationResponse> {
    return this.http.post(this.config.apiURL + '/account/activation', request)
      .pipe(
        map(response => response as ActivationResponse)
      );
  }

  /*
    setUserToLocalStorage is using by SignIn Components for saving User to Local Storage
  */

  setUserToLocalStorage(token) {
    localStorage.setItem(LocalStorageEnum.TOKEN_KEY, token);
  }

  setRemember(key) {
    localStorage.setItem('isRemember', key);
  }

  /*
    setUserToSessionStorage is using by SignIn Components for saving User to Session Storage
  */

  setUserToSessionStorage(token) {
    sessionStorage.setItem(LocalStorageEnum.TOKEN_KEY, token);
  }

  /*
    getUserData is using by 2 components ( header components and signin components )
    to get user data from localstorage
  */

  getUserData(token) {
    let userData: UserData = new UserData();
    userData = this.jwtUtil.parseJwt(token).UserData;
    return userData;
  }

  /*
    sendEmail is using by SignUp Activation and Forgot Password to sendemail
  */

  sendEmail(data: SendEmailRequest) {
    return this.http.post(this.config.apiURL + '/account/sendemail', data)
      .pipe(
        map(res => res as SendEmailResponse)
      );
  }

  /*
    with model User and class ResetPasswdResponse
    resetPasswd is using by reset password components

  */

  resetPasswd(data) {
    return this.http.post(this.config.apiURL + '/account/resetpassword', data)
      .pipe(
        map(res => res as ResetPasswdResponse)
      );
  }

  /*
    with model User And class Profile
    getProfile is using by 2 Components ( Profile Edit and Profile Components )
  */

  getProfile() {
      return this.http.get(this.config.apiURL + '/profile/')
        .pipe(
          map(resp => resp as Profile)
        );
  }

  createFormGuest(data: SignupData): Observable<UserSignupGuest> {
    return this.http.post(this.config.apiURL + '/store/create', data)
      .pipe(
        map(response => response as UserSignupGuest)
      );
  }

    /*
      updateProfile is using by Profile Edit components
    */

  updateProfile(updateData: EditProfileRequest) {
      return this.http.put(this.config.apiURL + '/profile/update/', updateData)
        .pipe(
          map(resp => resp as EditProfileResponse)
        );
  }

  getIpAddress(): Observable<UserSignupGuest> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'
  });
    return this.http
      .get(this.config.apiURL + '/global/ip')
        .pipe(
          map(response => response as UserSignupGuest)
        );
  }
  private handleError(error: HttpErrorResponse): Observable<any> {
    console.error('observable error: ', error);
    return observableThrowError(error);
  }

}
