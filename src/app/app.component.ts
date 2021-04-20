import { Component } from '@angular/core';

import { OAuthService } from 'angular-oauth2-oidc';
import {authCodeFlowConfig} from './oauthConfig';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-oauth2';
  token = 'null';
  constructor(private oauthService: OAuthService) {
    this.oauthService.configure(authCodeFlowConfig);

    this.oauthService.setStorage(sessionStorage);

    this.oauthService.tryLogin({}).then(isLoggedIn => {
      if (this.oauthService.hasValidAccessToken()) {
        this.token = this.oauthService.getAccessToken();
      }
    });
  }

  // tslint:disable-next-line:typedef
  login() {
    this.oauthService.initCodeFlow();
  }
}

