import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TemplateStore} from '../../services/template.store';
import {TEMPLATE_ROUTES} from '@core/constants/routes.constants';
import {BottomSheet} from '@shared/bottom-sheet/bottom-sheet';

@Component({
  selector: 'app-template-details',
  imports: [BottomSheet],
  templateUrl: './template-details.html',
  styleUrl: './template-details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  host: {
    class: 'template-details'
  }
})
export class TemplateDetails {
  readonly #templateStore = inject(TemplateStore);
  readonly #route = inject(ActivatedRoute);
  readonly #router = inject(Router);

  readonly #templateId = String(this.#route.snapshot.paramMap.get('id'));

  readonly isMenuOpen = signal<boolean>(false);
  readonly isDeleteDialogOpen = signal<boolean>(false);

  readonly selectedTemplate = computed(() => {
    return this.#templateStore.templates().find(template => template.id === this.#templateId);
  });

  onBackClicked(): void {
    this.#router.navigate([TEMPLATE_ROUTES.LIST]);
  }

  onMenuClicked(): void {
    this.isMenuOpen.set(true);
  }

  onMenuClosed(): void {
    this.isMenuOpen.set(false);
  }

  onEditClicked(): void {
    this.isMenuOpen.set(false);
    this.#router.navigate(['/', TEMPLATE_ROUTES.LIST, this.#templateId, 'edit']);
  }

  onDeleteClicked(): void {
    this.isMenuOpen.set(false);
    this.isDeleteDialogOpen.set(true);
  }

  onCloseDelete(): void {
    this.isDeleteDialogOpen.set(false);
  }

  onConfirmDelete(): void {
    this.#templateStore.deleteTemplate(this.#templateId);
    this.onCloseDelete();
    this.#router.navigate([TEMPLATE_ROUTES.LIST]);
  }
}
