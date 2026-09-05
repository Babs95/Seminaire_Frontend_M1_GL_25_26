import { Component, inject, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { APP_CONFIG } from '../../config/app-config.token';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header {
  private config = inject(APP_CONFIG);
  protected readonly appName = this.config.appName;
  protected readonly pageSize = this.config.defaultPageSize;
  totalTasksCount = input(0);
}
