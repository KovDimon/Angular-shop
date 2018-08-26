import { Injectable } from '@angular/core';
import * as auth0 from 'auth0-js';
import { Router } from '@angular/router';
import { Profile } from '../models/profile.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
//import { Observer } from 'rxjs/Observer';
import { map } from 'rxjs/operators';
import { Address } from '../models/address.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth0 = new auth0.WebAuth({

    clientID: 'vBUxfgSUCN9KxDY3POEgo9flo2XJBE6y',
    domain: 'dimon-shop.auth0.com',
    responseType: 'token id_token',
    audience: 'https://dimon-shop.auth0.com/userinfo',
    redirectUri: 'http://localhost:4200/callback',
    scope: 'openid profile'

  });

  /*private headers = new HttpHeaders({
    'Authorization': `Bearer 5wc2kq-4xrFEHvpJeNRLQgoOcO4gAQ_Y`,
    'Content-Type': 'application/json'
  });*/

  private userProfile: Profile;

  private userName: string;

  public isLoaded: boolean = false;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  public login(){
    this.auth0.authorize();
  }

  public handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.getUser();
        this.router.navigate(['/main-page']);
      } else if (err) {
        this.router.navigate(['/main-page']);
        console.log(err);
      }
    });
  }

  private setSession(authResult) {
   
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout() {
    
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.router.navigate(['/main-page']);
  }

  public isAuthenticated(): boolean {
    
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }

  public getUser(): Observable<any> {

    return Observable.create((observer: Observer<any>) =>{
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access Token must exist to fetch profile');
    }
  
    this.auth0.client.userInfo(accessToken, (err, profile) => {

      console.log(profile);
      if (profile) {
        this.isLoaded = false;
        this.userName = profile.name;

        if(JSON.parse(localStorage.getItem(`${this.userName}`))){
          this.userProfile = JSON.parse(localStorage.getItem(`${this.userName}`));
          //observer.next(JSON.parse(localStorage.getItem(`${this.userName}`)));
        }else{
          let newProfile = new Profile();
        newProfile.firstName = profile.name;
        newProfile.email = profile.name;
        newProfile.nickName = profile.nickname;
        newProfile.picture = profile.picture;
        newProfile.currency = 'USD';
        newProfile.phone = '';
        newProfile.mobile = '';
        newProfile.address = [];
        newProfile.lastName = '';
        newProfile.country = '';
        
        this.userProfile = newProfile;
        this.modifyLocalStorage();
        observer.next(newProfile);
        }
        observer.next(this.userProfile);
        this.isLoaded = true;

        //console.log(this.userProfile);
      }
      //cb(err, this.userProfile);
    });
    
  });
  }

  /*public getUser(){
    this.headers.set('Authorization', `Bearer {${localStorage.getItem('access_token')}}`);
    this.headers.set('Content-Type', 'application/json');
    console.log(this.headers);
    this.http.get('auth0_api/userinfo', {
      headers: this.headers
    }).pipe(map( (profile: any): Profile => {
      let newProfile = new Profile();
      console.log(profile);
      newProfile.id = profile.user_id;
      newProfile.firstName = profile.name;
      newProfile.nickName = profile.nickname;
      for(let key in profile){
        if(profile[key]=='email_verified' || 'updated_at'|| 'created_at'|| 'sub'){
          continue;
        }
       newProfile[key] = profile[key];
      }
      return newProfile;
    })).subscribe(
      dataUser => {this.userProfile = dataUser;  console.log(this.userProfile);},
      error => console.log("ERROR: data user don't got")
     
    );
  }*/

  public getAdresses(): Address[]{
    return this.userProfile.address;
  }

  public getProfile(): Profile{
    return this.userProfile;
  }

  public getUserName(): string{
    return this.userProfile.nickName;
  }

  public modifyLocalStorage(){
    localStorage.setItem(`${this.userName}`,JSON.stringify(this.userProfile));
  }

  public addAddress(address){
    this.userProfile.address.push(address);
    this.modifyLocalStorage();
  }

  public removeAddress(address){
    let index = this.userProfile.address.findIndex(obj => address.id === obj.id);
    this.userProfile.address.splice(index, 1);
    this.modifyLocalStorage();
  }

  public editAddress(address){
    let index = this.userProfile.address.findIndex(obj => address.id === obj.id);
    this.userProfile.address[index] = address;
    this.modifyLocalStorage();
  }
  
}

/*.subscribe(
          profile => {
            this.userProfile = profile;
            this.isLoaded = true;
          });*/
