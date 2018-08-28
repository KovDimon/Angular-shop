import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../shared/services/auth.service';
import { Profile } from '../shared/models/profile.model';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  private profile: Profile;

  private isLoaded: boolean = false;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
      this.authService.getUser().subscribe(
        profile => { 
          if(!profile){
            return;
          }
          this.profile = profile; 
          this.isLoaded = true;
        });
  }

  public save(){
    this.toastr.success('Profile update', 'Success!');
    this.authService.modifyLocalStorage();
  }

}
