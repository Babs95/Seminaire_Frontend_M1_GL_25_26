import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { ProjetsService } from '../../shared/services/projets';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header {
  private projectService = inject(ProjetsService);
  protected readonly totalTasksCount = this.projectService.totalTasksCount;
}
