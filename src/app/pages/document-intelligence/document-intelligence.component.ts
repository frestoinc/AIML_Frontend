import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DocumentIntelligenceService } from '../../services/document-intelligence.service';
import { PopUpBoxComponent } from '../../components/pop-up-box/pop-up-box.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';

@Component({
  selector: 'app-document-intelligence',
  standalone: true,
  imports: [FormsModule, CommonModule, PopUpBoxComponent, SpinnerComponent],
  templateUrl: './document-intelligence.component.html',
  styleUrls: ['./document-intelligence.component.css'] // Corrected property name
})
export class DocumentIntelligenceComponent {
  @ViewChild(PopUpBoxComponent) popUpBoxComponent!: PopUpBoxComponent;
  @ViewChild(SpinnerComponent) spinnerComponent!: SpinnerComponent;
  @ViewChild('jsonText') jsonText!: ElementRef<HTMLPreElement>;
  modalTitle = '';
  modalBody = '';
  uploadResponse: any = '';


  selectedFile: File | null = null;

  constructor(private documentIntelligenceService: DocumentIntelligenceService) {

  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onFileSubmit(event: Event): void 
  {
    event.preventDefault()

    if (!this.selectedFile) {
    this.modalTitle = 'Error';
    this.modalBody = 'No file selected.';
    this.popUpBoxComponent.showModal();
    return;  // Exit early if no file is selected
   }

    this.spinnerComponent.showSpinner();
    this.uploadResponse = '';

    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);

    formData.forEach(function(pair) {
      //Print form data key-value pairs
      console.log(pair);
    });

    this.documentIntelligenceService.uploadDocument(formData)
      .subscribe({
        next: (res: any) => {
          this.uploadResponse = JSON.parse(res.message);
        },
        error: (err: any) => {
          this.modalTitle = 'Error';
          this.modalBody = err.message;
          this.popUpBoxComponent.showModal();
          this.spinnerComponent.hideSpinner();
          console.log(err);
        },
        complete: () => {
          this.spinnerComponent.hideSpinner();
        }
      });
    
    this.resetForm();
  }

  resetForm(): void
  {
    (document.getElementById('file') as HTMLInputElement).value = '';
    this.selectedFile = null;
  }

  copyToClipboard(): void {
    const element = this.jsonText.nativeElement;
    navigator.clipboard.writeText(element.innerText).then(() => {
      this.modalTitle = 'Copied to Clipboard';
      this.modalBody = 'The text has been copied to the clipboard.'
      this.popUpBoxComponent.showModal(); 
    }).catch(err => {
      this.modalTitle = 'Error';
      this.modalBody = 'Error: ' + err.message;
      this.popUpBoxComponent.showModal();
    });
  }

}
