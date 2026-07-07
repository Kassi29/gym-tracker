import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {TemplateStore} from '../../services/template.store';
import {TEMPLATE_ROUTES} from '@core/constants/routes.constants';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.html',
  styleUrl: './template-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  host: {
    class: 'template-list'
  }
})
export class TemplateList {
  readonly #templateStore = inject(TemplateStore);
  readonly #router = inject(Router);

  readonly templates = this.#templateStore.templates;

  addNewTemplate(): void {
    this.#router.navigate([TEMPLATE_ROUTES.CREATE]);
  }

  seeTemplateDetails(templateId: string): void {
    this.#router.navigate(['/', TEMPLATE_ROUTES.LIST, templateId]);
  }
}
