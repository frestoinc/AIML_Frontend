import { Component, ViewChild } from '@angular/core';
import { TestService } from '../../services/test.service';
import { PopUpBoxComponent } from '../../components/pop-up-box/pop-up-box.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [PopUpBoxComponent, SpinnerComponent],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
  @ViewChild(PopUpBoxComponent) popUpBoxComponent!: PopUpBoxComponent;
  @ViewChild(SpinnerComponent) spinnerComponent!: SpinnerComponent;
  modalTitle = '';
  modalBody = '';

  constructor(private testService: TestService) {}

  testConnection() {
    this.spinnerComponent.showSpinner();
    this.testService.testConnection().subscribe({
      next: (res: any) => {
        this.modalTitle = 'Success';
        this.modalBody = res.message;
        this.popUpBoxComponent.showModal();  // Open the modal with the response message
      },
      error: (err: any) => {
        this.modalTitle = 'Error';
        this.modalBody = 'Error: ' + err.message;
        this.popUpBoxComponent.showModal();  // Open the modal with the error message
      },
      complete: () => {
        this.spinnerComponent.hideSpinner();
      }
    });
  }
}
