import { Component, OnInit } from '@angular/core';

import { AuthService } from '../shared/services/auth.service';
import { Profile } from '../shared/models/profile.model';
import { ToastrService } from 'ngx-toastr';

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
    
    if(localStorage.getItem('id_token')){
      //this.authService.getUser((err, profile) => this.profile = profile);
      this.authService.getUser().subscribe(data => { console.log(data); this.profile = data; this.isLoaded = true;});
    }
      console.log(this.profile);

  }

  public save(){
    this.toastr.success('Profile update', 'Success!');
    this.authService.modifyLocalStorage();
  }

}
