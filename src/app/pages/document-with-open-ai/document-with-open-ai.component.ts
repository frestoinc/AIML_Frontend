import { Component, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OpenAiService } from '../../services/open-ai.service';
import { PopUpBoxComponent } from '../../components/pop-up-box/pop-up-box.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';

@Component({
  selector: 'app-document-with-open-ai',
  standalone: true,
  imports: [FormsModule, CommonModule, PopUpBoxComponent, SpinnerComponent],
  templateUrl: './document-with-open-ai.component.html',
  styleUrl: './document-with-open-ai.component.css'
})
export class DocumentWithOpenAIComponent implements AfterViewChecked
{
  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('chatContainer') private chatContainer!: ElementRef;
  @ViewChild(PopUpBoxComponent) popUpBoxComponent!: PopUpBoxComponent;
  @ViewChild(SpinnerComponent) spinnerComponent!: SpinnerComponent;
  modalTitle = '';
  modalBody = '';
  
  prompt: string = '';
  deploymentName: string = 'gpt35';
  useDocumentIntelligence: boolean = false;
  useAdditionalSelfCheck: boolean = false;
  selectedFile: File | null = null;

  stringOutput: string = '';
  messages: Array<{content: string, type: 'user' | 'gpt'}> = [];

  constructor(private openAiService : OpenAiService) {

  }

  ngAfterViewChecked() 
  {
    this.scrollToBottom();
  }

  scrollToBottom(): void 
  {
    if (this.chatContainer && this.chatContainer.nativeElement) 
      {
      try 
      {
        this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
      } 
      catch (err) 
      {
        console.log('Error scrolling:', err);
      }
    }
  }

  getDeploymentName(): string 
  {
    switch(this.deploymentName) 
    {
      case 'gpt35': 
        return 'GPT-3.5';
      case 'gpt4': 
        return 'GPT-4';
      case 'gpt4-v': 
        return 'GPT-4-Vision';
      default: 
        return 'Unknown Model'; // or throw an error, or handle it appropriately
    }
  }

  removeFile(fileInput: HTMLInputElement): void 
  {
    this.selectedFile = null;
    fileInput.value = '';
  }
  
  selectedOption(event: any): void 
  {
    this.deploymentName = event.target.value;
    this.useDocumentIntelligence = (this.deploymentName === 'gpt4-v' || this.selectedFile == null ? false : true);
  }
  
  onFileSelected(event: any): void 
  {
    this.selectedFile = event.target.files[0];
    if(this.deploymentName != 'gpt4-v')
    {
      this.useDocumentIntelligence = (this.selectedFile == null ? false : true);
    }
  }

  selectUseAdditionalSelfCheck(event: any): void
  {

  }

  selectUseDocumentIntelligence(event: any): void
  {
    if(this.selectedFile == null && this.deploymentName !== 'gpt4-v') 
    {
      this.useDocumentIntelligence = false;
      event.target.checked = false;
      
      this.modalTitle = 'Unable to Enable Document Intelligence';
      this.modalBody = 'Please uploaded a file to enable Document Intelligence.';
      this.popUpBoxComponent.showModal();
      this.spinnerComponent.hideSpinner();
    }
    else
    {
      if(this.deploymentName === 'gpt4-v')
      {
        // If deployment model is GPT-4 Vision, User can
        // use choose to use document intelligence or simply
        // use the model without document intelligence.
        return;
      }
      this.useDocumentIntelligence = true;
      event.target.checked = true;
            
      this.modalTitle = 'Unable to Disable Document Intelligence';
      this.modalBody = 'Document Intelligence is required to read pdf and images.';
      this.popUpBoxComponent.showModal();
      this.spinnerComponent.hideSpinner();
    }
  }

  onFileSubmit(event: Event): void 
  {
    event.preventDefault();
    this.spinnerComponent.showSpinner();

    const formData = new FormData();
    formData.append('deploymentName', this.deploymentName);
    formData.append('prompt', this.prompt);
    formData.append('file', this.selectedFile || new Blob(), this.selectedFile?.name || '');    
    // if(this.selectedFile == null)
    // {
    //   formData.append('file', new Blob(), '');
    // }
    // else
    // {
    //   formData.append('file', this.selectedFile, this.selectedFile.name);
    // }
    
    formData.append('useDocumentIntelligence', this.useDocumentIntelligence.toString());
    formData.append('useAdditionalSelfCheck', this.useAdditionalSelfCheck.toString());

    const promptMessage: string = `<strong>User:</strong>\n${this.prompt}`;
    this.messages.push({content: promptMessage, type: 'user'});

    this.openAiService.sendPrompt(formData)
    .subscribe({
      next: (res: any) => 
      {
        const message: string = `<strong>${this.getDeploymentName()}</strong>:\n${res.message}\n\n<strong>Response Time:</strong> ${res.duration}ms\n<strong>Total Tokens:</strong> ${res.totalTokens}\n<strong>Estimated Price:</strong> ${res.estimatedPrice}`;
        this.messages.push({content: message, type: 'gpt'});
        this.prompt = '';
        this.selectedFile = null;
        this.fileInput.nativeElement.value = ''; // Clear the file input
        this.useDocumentIntelligence = false;
        this.useAdditionalSelfCheck = false;
        console.log(res);
      },
      error: (err: any) => 
      {
        this.modalTitle = 'Error';
        this.modalBody = 'Error: ' + err.error.message;
        this.popUpBoxComponent.showModal();
        this.spinnerComponent.hideSpinner();
      },
      complete: () => {
        this.spinnerComponent.hideSpinner();
      }
    });
  }

  clearChat(): void 
  {
    this.messages = [];
    this.scrollToBottom();
  }

  copyMessageToClipboard(index: number): void {
    const messageToCopy = this.messages[index].content.replace(/<br>/g, '\n').replace(/<[^>]+>/g, ''); // Remove HTML tags and replace <br> with newlines
    navigator.clipboard.writeText(messageToCopy).then(() => {
      this.modalTitle = 'Copied to Clipboard';
      this.modalBody = 'The text has been copied to the clipboard.';
      this.popUpBoxComponent.showModal(); 
    }).catch(err => {
      this.modalTitle = 'Error';
      this.modalBody = 'Error: ' + err.message;
      this.popUpBoxComponent.showModal();
    });
  }

  copyToClipboard(): void {
    const textToCopy = this.messages.map(msg => msg.content.replace(/<br>/g, '\n').replace(/<[^>]+>/g, '')).join('\n');
    navigator.clipboard.writeText(textToCopy).then(() => {
      this.modalTitle = 'Copied to Clipboard';
      this.modalBody = 'The text has been copied to the clipboard.';
      this.popUpBoxComponent.showModal(); 
    }).catch(err => {
      this.modalTitle = 'Error';
      this.modalBody = 'Error: ' + err.message;
      this.popUpBoxComponent.showModal();
    });
  }

  // copyToClipboard(): void 
  // {
  //   const element = this.stringText.nativeElement;
  //   navigator.clipboard.writeText(element.innerText).then(() => {
  //     this.modalTitle = 'Copied to Clipboard';
  //     this.modalBody = 'The text has been copied to the clipboard.';
  //     this.popUpBoxComponent.showModal(); 
  //   }).catch(err => {
  //     this.modalTitle = 'Error';
  //     this.modalBody = 'Error: ' + err.message;
  //     this.popUpBoxComponent.showModal();
  //   });
  // }
}