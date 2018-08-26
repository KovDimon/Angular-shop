import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private counter: number = 0;

  private profile: any;

  private isShow: boolean = false;

  private isLoaded: boolean = false;

  constructor(
    private cartService: CartService,
    private authService: AuthService, 
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if(localStorage.getItem('id_token')){
      this.authService.getUser().subscribe(
        profile => {
          this.profile = profile;
          this.isLoaded = true;
        },
        err => console.log("ERROR: data profile don't come in Header")
      );
    }
  }

  public count(): number{
    return this.cartService.count();
  }

  public search(form: NgForm){

    /*this.route.params.subscribe(
      params => console.log(params)
    );*/

    this.router.navigate(['./search'], {
      queryParams: {
        query: form.value.search,
       }
    });
  }

  public navigate(event, string){
    event.preventDefault();
    this.isShow = false;
    this.router.navigate([`${string}`]);
  }

  public login(event){
    event.preventDefault();
    this.authService.login();
    //this.authService.getProfile();
  }

  public logout(event){
    this.isShow = !this.isShow;
    event.preventDefault();
    this.authService.logout();
  }

  public getUserName(): string{
    let userProfile;
    /*this.authService.getUser((err, profile) => {
      userProfile = profile;
    });*/
    return userProfile.nickname;
  }

  private dropDown(event){
    event.preventDefault();
    this.isShow = !this.isShow;
  }


}
