import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-tracker',
  imports: [],
  templateUrl: './tracker.html',
  styleUrl: './tracker.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tracker {

}
