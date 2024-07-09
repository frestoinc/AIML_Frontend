import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent {
  @Input() isSpinning: boolean = false;

  // Method to show the spinner
  showSpinner(): void {
    this.isSpinning = true;
  }

  // Method to hide the spinner
  hideSpinner(): void {
    this.isSpinning = false;
  }
}
