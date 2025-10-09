import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({
  imports: [RouterModule, NzBreadCrumbModule, NzIconModule, NzMenuModule, NzLayoutModule],
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
    this.keycloakService.logout(window.location.origin + '/');
  }
}
