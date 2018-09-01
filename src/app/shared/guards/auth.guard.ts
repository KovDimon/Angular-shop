import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Injectable } from "@angular/core";

@Injectable()

export class AuthGuard implements CanActivate{
    constructor(
        private authService: AuthService,
        private router: Router
    ){}

    public canActivate(){
        if(this.authService.isAuthenticated()){
            return true;
        }else{
            this.router.navigate(['/main-page']);
            return false;
        }
    }
}