import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'repo_host';

  constructor(
    private keycloakService: KeycloakService
  ) {

  }

  logout() {
    this.keycloakService.logout();
  }
}
