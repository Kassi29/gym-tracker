import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CALENDAR_ROUTES, TEMPLATE_ROUTES} from '@core/constants/routes.constants';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-main-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './main-nav.html',
  styleUrl: './main-nav.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'main-nav'
  }
})
export class MainNav {
  readonly TEMPLATE_PATH = `/${TEMPLATE_ROUTES.LIST}`;
  readonly CALENDAR_PATH = `/${CALENDAR_ROUTES.CALENDAR}`;
}
