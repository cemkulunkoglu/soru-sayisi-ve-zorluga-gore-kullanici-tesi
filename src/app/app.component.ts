import { Component } from '@angular/core';
import { PuzzleDisplayComponent } from './components/puzzle-display/puzzle-display.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PuzzleDisplayComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bulmacalar';
}
