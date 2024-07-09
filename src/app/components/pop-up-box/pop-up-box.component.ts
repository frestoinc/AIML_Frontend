import { Component, ElementRef, ViewChild, Input } from '@angular/core';
import { Modal } from 'bootstrap';

@Component({
  selector: 'pop-up-box',
  standalone: true,
  imports: [],  // Include necessary Angular modules or other standalone components
  templateUrl: './pop-up-box.component.html',
  styleUrls: ['./pop-up-box.component.css']  // Ensure this is `styleUrls` in an array form
})
export class PopUpBoxComponent {
  @ViewChild('popUpBoxModal', { static: false }) private modalRef!: ElementRef;
  private modalInstance: Modal | null = null;  // Change type to 'Modal'

  @Input() title: string = '';    // Title of the modal {{ title }}
  @Input() body: string = '';     // Body content of the modal {{ body }}

  showModal(): void {
    if (!this.modalInstance) {
      this.modalInstance = new Modal(this.modalRef.nativeElement, {
        keyboard: false
      });
    }
    this.modalInstance.show();
  }

  hideModal(): void {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }
}