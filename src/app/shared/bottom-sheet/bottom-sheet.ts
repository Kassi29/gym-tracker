import {ChangeDetectionStrategy, Component, input, output, signal} from '@angular/core';

const DRAG_THRESHOLD = 100;
const MAX_DRAG_DISTANCE = 240;

@Component({
  selector: 'app-bottom-sheet',
  standalone: true,
  templateUrl: './bottom-sheet.html',
  styleUrl: './bottom-sheet.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'bottom-sheet',
    '[class.bottom-sheet--open]': 'isOpen()'
  }
})
export class BottomSheet {
  isOpen = input.required<boolean>();
  title = input<string>('');

  closed = output<void>();

  readonly #dragStartY = signal(0);
  readonly #dragOffsetY = signal(0);
  readonly #isDragging = signal(false);

  dragOffset = this.#dragOffsetY.asReadonly();
  isDragging = this.#isDragging.asReadonly();

  onClose(): void {
    this.closed.emit();
  }

  onDragStart(event: TouchEvent): void {
    if (!this.isOpen()) return;

    const touch = event.touches[0];

    if (!touch) return;

    this.#dragStartY.set(touch.clientY);
    this.#isDragging.set(true);
  }

  onDragMove(event: TouchEvent): void {
    if (!this.#isDragging()) return;

    const touch = event.touches[0];

    if (!touch) return;

    const rawDelta = touch.clientY - this.#dragStartY();
    const clampedDelta = Math.max(0, Math.min(rawDelta, MAX_DRAG_DISTANCE));

    this.#dragOffsetY.set(clampedDelta);
  }

  onDragEnd(): void {
    if (!this.#isDragging()) return;

    this.#isDragging.set(false);

    const shouldDismiss = this.#dragOffsetY() > DRAG_THRESHOLD;

    this.#dragStartY.set(0);
    this.#dragOffsetY.set(0);

    if (shouldDismiss) {
      this.closed.emit();
    }
  }
}
