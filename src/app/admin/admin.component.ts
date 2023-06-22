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
  showContent3 = false;
  name: any;
  profile: any;
  isHidden: boolean = true;
  isHidden1: boolean = true;
  tableData:any = [];
  productname: any | undefined;
  fileUrl: any;
  qrgenerate = 'GENERATE';
  productData: any = [];
  defectiveData: any = [];
  personelData: any = [];
  categoryData: any = [];
  locationData: any = [];
  projectData: any = [];
  floorData: any =[];
  fullnameData: any = [];
  products: any;
  defective: any;
  personel: any;
  category: any;
  project: any;
  location: any;
  constructor(private sanitizer: DomSanitizer) {  }

  ngOnInit(): void{
    this.name = localStorage.getItem('name')
    this.profile = localStorage.getItem('position')?.toUpperCase();
   this.refreshdashboard();
   
   const formData = new FormData();
   fetch('http://localhost:8080/IMS/src/backend/infodashboard.php', {
     method: 'POST',
     body: formData
   })
   .then(response => response.json())
   .then(value => {
    
    for (let i = 0; i < value.result1.length; i++) {
      const productValue = value.result1[i];
      this.productData[i] = {
        productName:  productValue ,

      };
    }
    for (let i = 0; i < value.result2.length; i++) {
      const defectiveValue = value.result2[i];
      this.defectiveData[i] = {
        defectiveName:  defectiveValue ,

      };
    }
    for (let i = 0; i < value.result3.length; i++) {
      const personelValue = value.result3[i];
      this.personelData[i] = {
        personelName:  personelValue ,

      };
    }
    for (let i = 0; i < value.result4.length; i++) {
      const categoryValue = value.result4[i];
      this. categoryData[i] = {
        categoryName:   categoryValue ,

      };
    }

    for (let i = 0; i < value.count; i++) {
      const locationfullValue = value.result7[i];
      const floorValue = value.result6[i];
      const locationValue = value.result5[i];
      this.locationData[i] = {
        locationName:  locationValue ,

      };
      this.floorData[i] = {
        floorName: floorValue ,

      };
      this.fullnameData[i] = {
        locationfullName:  locationfullValue ,

      };
    }
  
    for (let i = 0; i < value.result8.length; i++) {
      const projectValue = value.result8[i];
      this.projectData[i] = {
        projectName: projectValue ,

      };
    }
    }
    );
  }
  showPopup() {
    var popup = document.getElementById("popup") as HTMLInputElement;
    popup.classList.add("show");
  }
  
  hidePopup() {
    var popup = document.getElementById("popup")as HTMLInputElement;
    popup.classList.remove("show");
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    // Do further processing with the selected file
  }

  toggleContent1(): void {
    this.showContent1 = true;
    this.showContent2 = false;
    this.showContent3 = false;
  }

  toggleContent2(): void {
    this.showContent1 = false;
    this.showContent2 = true;
    this.showContent3 = false;
  }

  toggleContent3(): void {
    this.showContent1 = false;
    this.showContent2 = false;
    this.showContent3 = true;
  }

  toggleContent(contentId: string): void {
    if (contentId === 'content1') {
      this.toggleContent1();
    } else if (contentId === 'content2') {
      this.toggleContent2();
      const formData = new FormData();
   
      fetch('http://localhost:8080/IMS/src/backend/itemlist.php', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(value => {
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
      this.toggleContent3();
    }
  }
  add(){
    const openFormButton1 = document.getElementById('openFormButton1') as HTMLInputElement;
    const popupFormContainer1 = document.getElementById('popupFormContainer1') as HTMLInputElement;
    const closeButton1 = document.querySelector('.closeButton1') as HTMLInputElement;
    
     let isFormVisible1 = false; // Flag to track form visibility
    
      openFormButton1.addEventListener('click', () => {
        isFormVisible1 = true; // Set the flag to true when opening the form
        updateFormDisplay();
      });
    
      closeButton1.addEventListener('click', () => {
        isFormVisible1 = false; // Set the flag to false when closing the form
        updateFormDisplay();
    
      });
    
      function updateFormDisplay() {
        if (isFormVisible1) {
          popupFormContainer1.style.display = 'block'; // Show the form
          
        } else {
          popupFormContainer1.style.display = 'none'; // Hide the form
        }
      }
    
    
        // Handle form submission
        const myForm1 = document.getElementById('myForm1') as HTMLInputElement;
        myForm1.addEventListener('submit', (event) => {
          event.preventDefault(); // Prevent default form submission
          // Here, you can perform further actions like sending the form data to a server
    
    });

    const itemcode = document.getElementById('itemcode') as HTMLInputElement;
    console.log(itemcode.value);
    
    const formData = new FormData();
    formData.append('code',itemcode.value)
    fetch('http://localhost:8080/IMS/src/backend/qrgenerator.php', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(value => {
      }
     );
  }
  delete(){
    alert('Wala pa chill kalang')
  }

  generate(){
  
  }
  qrcode(){
    const openFormButton = document.getElementById('openFormButton') as HTMLInputElement;
    const popupFormContainer = document.getElementById('popupFormContainer') as HTMLInputElement;
    const closeButton = document.querySelector('.closeButton') as HTMLInputElement;

    let isFormVisible = false; // Flag to track form visibility

    openFormButton.addEventListener('click', () => {
      isFormVisible = true; // Set the flag to true when opening the form
      updateFormDisplay();
    });

    closeButton.addEventListener('click', () => {
      isFormVisible = false; // Set the flag to false when closing the form
      updateFormDisplay();

    });

    function updateFormDisplay() {
      if (isFormVisible) {
        popupFormContainer.style.display = 'block'; // Show the form
        
      } else {
        popupFormContainer.style.display = 'none'; // Hide the form
      }
    }
    // Handle form submission
    const myForm = document.getElementById('myForm') as HTMLInputElement;
    myForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent default form submission
      // Here, you can perform further actions like sending the form data to a server

});
  }
  submit(){
    const itemcode = document.getElementById('itemcode') as HTMLInputElement;
    console.log(itemcode.value);
    
    const formData = new FormData();
    formData.append('code',itemcode.value)
    fetch('http://localhost:8080/IMS/src/backend/qrgenerator.php', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(value => {
      if(value.data=='Not Found!'){
        this.isHidden = true;
        this.isHidden1 = false;
      }else{
        this.isHidden = false;
        this.isHidden1 = true;
      this.productname = value.data[0].item_name !== '' ? value.data[0].item_name : 'N/A';
      var category = value.data[0].category !== '' ? value.data[0].category : 'N/A';
      var location = value.data[0].location !== '' ? value.data[0].location : 'N/A';
      var specificlocation = value.data[0].specificlocation !== '' ? value.data[0].specificlocation : 'N/A';
      var project = value.data[0].project !== '' ? value.data[0].project : 'N/A';
      var par = value.data[0].par !== '' ? value.data[0].par : 'N/A';
      var image = value.data[0].image !== '' ? value.data[0].image : 'N/A';
      var condition = value.data[0].state !== '' ? value.data[0].state : 'N/A';
      
      this.myAngularxQrCode = 'Product: ' + this.productname + '\n Category: ' + category + '\n Location: '+ location + '\n Specific Location: ' + specificlocation + '\n Project by: ' + project + '\n Condition: ' + condition
      + '\n Image URL: '+ image + '\n PAR URL: ' + par;
      const data = 'ewqewqeqw';
      const blob = new Blob([data], { type: 'application/octet-stream' });
      
      // saves the text from qr
      this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
      }

     });
  }
  refreshdashboard(){
  
    // After the page reloads, navigate to specific content based on the provided contentId
    const formData = new FormData();
    fetch('http://localhost:8080/IMS/src/backend/quantitydashboard.php', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(value => {
      this.products = value.result1
      this.defective = value.result2
      this.personel = value.result3
      this.category = value.result4
      this.location = value.result5
      this.project = value.result6
     });
    
  }

  refreshinstock(){
    // After the page reloads, navigate to specific content based on the provided contentId
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
      location.reload()
     });
    
  }
}
function toggleContent1() {
  throw new Error('Function not implemented.');
}

