import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  myAngularxQrCode: any;
  showContent1 = true;
  showContent2 = false;
  qrValue: string = 'Hello, World!'; 
  showContent3 = false;
  name: any;
  profile: any;
  isHidden: boolean = true;
  tableData:any = [];

  fileUrl: any;
  constructor(private sanitizer: DomSanitizer) {  }
  ngOnInit(): void{
    this.myAngularxQrCode = 'Item Code: 20-06186 \n Name:Accent Chair \n Category:Furniture \n Project: N/A \n Location: CTI \n Specific: Co-Working Space \n Condition: Working \n Image Url: https://drive.google.com/file/d/1AXRE19U2k9bZW459wVJfeCPPra8ecbtZ/view?usp=sharing \n FAR Url: https://drive.google.com/file/d/1Ao9jpjNE0gWD4AW3ig1WUSXH2Om6VB-a/view';
    const data = 'ewqewqeqw';
    const blob = new Blob([data], { type: 'application/octet-stream' });
    
    // saves the text from qr
    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
    
    const labels = document.querySelectorAll('.label');
    labels.forEach(label => {
      label.addEventListener('click', function() {
        labels.forEach(l => {
          l.classList.remove('active');
          l.classList.add('inactive');
        });
        label.classList.remove('inactive');
        label.classList.add('active');
      });
    });
    this.name = localStorage.getItem('name')
    this.profile = localStorage.getItem('position')?.toUpperCase();
   
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    // Do further processing with the selected file
  }
  toggleContent(contentId: string): void {
    if (contentId === 'content1') {
      this.showContent1 = true;
      this.showContent2 = false;
      this.showContent3 = false;
    } else if (contentId === 'content2') {
      this.showContent1 = false;
      this.showContent2 = true;
      this.showContent3 = false;
      const formData = new FormData();
   
      fetch('http://localhost:8080/IMS/src/backend/itemlist.php', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(value => {
      console.log(value.data[0]);
      for (let i = 0; i < value.data.length; i++) {
        const codeValue = value.data[i].item_id !== '' ? value.data[i].item_id : 'N/A';
        const productValue = value.data[i].item_name !== '' ? value.data[i].item_name  : 'N/A';
        const categoryValue = value.data[i].category !== '' ? value.data[i].category : 'N/A';
  
        const locationValue = value.data[i].location !== '' ? value.data[i].location : 'N/A';
  
        const projectValue = value.data[i].project !== '' ? value.data[i].project : 'N/A';
  
        const conditionValue = value.data[i].state !== '' ? value.data[i].state : 'N/A';

        this.tableData[i] = {
          code:  codeValue ,
          productname: productValue,
          category: categoryValue,
          location: locationValue,
          project: projectValue,
          condition: conditionValue
        };
   // Access and log the "code" property
      }
 
     });
    }
    else if (contentId === 'content3') {
      this.showContent1 = false;
      this.showContent2 = false;
      this.showContent3 = true;
    }
  }
  add(){
    alert('Wala pa chill kalang')
  }
  delete(){
    alert('Wala pa chill kalang')
  }
  alert(){

  }
  qrcode(){
    const openFormButton = document.getElementById('openFormButton') as HTMLInputElement;
const popupFormContainer = document.getElementById('popupFormContainer') as HTMLInputElement;
const closeButton = document.querySelector('.closeButton') as HTMLInputElement;

openFormButton.addEventListener('click', () => {
  popupFormContainer.style.display = 'block';
});

closeButton.addEventListener('click', () => {
  popupFormContainer.style.display = 'none';
});

    // Handle form submission
    const myForm = document.getElementById('myForm') as HTMLInputElement;
    myForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent default form submission
      // Here, you can perform further actions like sending the form data to a server
      console.log('Form submitted');
});
  }
  submit(){
    const itemcode = document.getElementById('itemcode') as HTMLInputElement;
    console.log(itemcode.value);
    this.isHidden = !this.isHidden;
  }
  refresh(){
    const formData = new FormData();
    fetch('http://localhost:8080/IMS/src/backend/itemlist.php', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(value => {
      console.log(value.data[0]);
      for (let i = 0; i < value.data.length; i++) {
        const codeValue = value.data[i].item_id !== '' ? value.data[i].item_id : 'N/A';
        const productValue = value.data[i].item_name !== '' ? value.data[i].item_name  : 'N/A';
        const categoryValue = value.data[i].category !== '' ? value.data[i].category : 'N/A';
  
        const locationValue = value.data[i].location !== '' ? value.data[i].location : 'N/A';
  
        const projectValue = value.data[i].project !== '' ? value.data[i].project : 'N/A';
  
        const conditionValue = value.data[i].state !== '' ? value.data[i].state : 'N/A';
  
        this.tableData[i] = {
          code:  codeValue ,
          productname: productValue,
          category: categoryValue,
          location: locationValue,
          project: projectValue,
          condition: conditionValue
        };
   // Access and log the "code" property
      }
 
     });
    location.reload();
    
  }
}
