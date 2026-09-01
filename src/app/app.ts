import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { ProjectList } from './pages/project-list/project-list';

@Component({
  imports: [RouterOutlet, Header, ProjectList],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected ti = "test";
  protected readonly title = signal('taskflow'); // .set() .update()
}
