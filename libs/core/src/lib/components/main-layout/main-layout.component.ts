import { NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'lib-main-layout',
  imports: [RouterModule, NzBreadCrumbModule, NzIconModule, NzMenuModule, NzLayoutModule, NzInputModule, NgTemplateOutlet, NzButtonModule, NzBadgeModule, NzDropDownModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {
  constructor(
    private keycloakService: KeycloakService
  ) {
  }

  logout() {
    this.keycloakService.logout(window.location.origin + '/');
  }

  messageCount = 3;
  notificationCount = 12;

  menus = [
    {
      level: 1,
      title: 'Bạn bè',
      icon: 'mail',
      open: true,
      selected: false,
      disabled: false
    },
    {
      level: 1,
      title: 'Kỷ niệm',
      icon: 'team',
      open: false,
      selected: false,
      disabled: false,
    },
    {
      level: 1,
      title: 'Đã lưu',
      icon: 'team',
      open: false,
      selected: false,
      disabled: false,
    },
    {
      level: 1,
      title: 'Nhóm',
      icon: 'team',
      open: false,
      selected: false,
      disabled: false,
    },
    {
      level: 1,
      title: 'Video',
      icon: 'team',
      open: false,
      selected: false,
      disabled: false,
    },
    {
      level: 1,
      title: 'Marketplace',
      icon: 'team',
      open: false,
      selected: false,
      disabled: false,
    },
    {
      level: 1,
      title: 'Xem thêm',
      icon: 'team',
      open: false,
      selected: false,
      disabled: false
    }
  ];

}
