import { Component, OnInit } from '@angular/core';

import { AuthService } from '../shared/services/auth.service';
import { Profile } from '../shared/models/profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  private profile: Profile;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    
    if(localStorage.getItem('id_token')){
      this.authService.getUser((err, profile) => this.profile = profile);
    }
      console.log(this.profile);

  }

  public save(){
    this.authService.modifyLocalStorage();
  }

}
