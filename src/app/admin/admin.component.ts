
import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit{
  myAngularxQrCode: any='Empty';
  showContent1 = true;
  showContent2 = false;
  showContent3 = false;
  subcontainer2_content: any =[];
  defectiveHidden = false;
 hidden: any = ['Defective Products','Personel','Category','Location','Project'];
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
  defectiveQuantity: any;
  info : any = ['Itemlist','Defective Products','Personel','Category','Location','Project']
  myForm: any = FormGroup;
  qrForm: any = FormGroup;
  itemlistForm: any = FormGroup;
  constructor(private sanitizer: DomSanitizer,private fb: FormBuilder) {  }

  ngOnInit(): void{
    for(let i =1; i<7;i++){
      this.subcontainer2_content[i] == false;
    }
    this.myForm = this.fb.group({
      myForm_information:['',Validators.required],
  
    });
    this.defective = this.fb.group({
      defective_itemcode:['',Validators.required],
      defective_staff:['',Validators.required],
      defective_location:['',Validators.required],
      defective_quantity:['',Validators.required],
    });
    this.qrForm = this.fb.group({
      qrForm_itemcode:['',Validators.required],
    });
    this.itemlistForm = this.fb.group({
      itemlistForm_itemcode:['',Validators.required],
      itemlistForm_category:['',Validators.required],
      itemlistForm_specificlocation:['',Validators.required],
      itemlistForm_project:['',Validators.required],
      itemlistForm_location:['',Validators.required],
    });
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
      const defectiveName = value.result2[i];
      const defectiveValue = value.result11[i];
      this.defectiveData[i] = {
        defectiveName:  defectiveName ,defectiveValue : defectiveValue

      };
    }
    for (let i = 0; i < value.count1; i++) {
      const personelValue = value.result3[i];
      const personelLocation = value.result10[i];
      const personelPosition = value.result9[i];
      this.personelData[i] = {
        personelLocation: personelLocation, personelName:  personelValue , personelPosition: personelPosition

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
        floorName:floorValue,locationName:  locationValue , locationfullName:  locationfullValue 
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
    const openFormButton = document.getElementById('openFormButton') as HTMLInputElement;
    const popupFormContainer = document.getElementById('popupFormContainer') as HTMLInputElement;
    const closeButton1 = document.querySelector('.closeButton') as HTMLInputElement;
    
     let isFormVisible = false; // Flag to track form visibility
    
      openFormButton.addEventListener('click', () => {
        isFormVisible = true; // Set the flag to true when opening the form
        updateFormDisplay();
      });
    
      closeButton1.addEventListener('click', () => {
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
    
    
  
  }
  addDashboard(){
    this.add()
  }
  additemlist(){
    const openFormButton = document.getElementById('openFormButton3') as HTMLInputElement;
    const popupFormContainer = document.getElementById('popupFormContainer3') as HTMLInputElement;
    const closeButton1 = document.querySelector('.closeButton3') as HTMLInputElement;
    
     let isFormVisible = false; // Flag to track form visibility
    
      openFormButton.addEventListener('click', () => {
        isFormVisible = true; // Set the flag to true when opening the form
        updateFormDisplay();
      });
    
      closeButton1.addEventListener('click', () => {
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
      const myForm = document.getElementById('myForm5') as HTMLInputElement;
      myForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission
        // Here, you can perform further actions like sending the form data to a server
  
  });
    
  
  }
  deleteDashboard(){
    const openFormButton = document.getElementById('openFormButton2') as HTMLInputElement;
    const popupFormContainer = document.getElementById('popupFormContainer2') as HTMLInputElement;
    const closeButton1 = document.querySelector('.closeButton2') as HTMLInputElement;
    
     let isFormVisible = false; // Flag to track form visibility
    
      openFormButton.addEventListener('click', () => {
        isFormVisible = true; // Set the flag to true when opening the form
        updateFormDisplay();
      });
    
      closeButton1.addEventListener('click', () => {
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
      const myForm = document.getElementById('myForm5') as HTMLInputElement;
      myForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission
        // Here, you can perform further actions like sending the form data to a server
  
  });
  }
  deleteItemlist(){
    const openFormButton = document.getElementById('openFormButton4') as HTMLInputElement;
    const popupFormContainer = document.getElementById('popupFormContainer4') as HTMLInputElement;
    const closeButton1 = document.querySelector('.closeButton4') as HTMLInputElement;
    
     let isFormVisible = false; // Flag to track form visibility
    
      openFormButton.addEventListener('click', () => {
        isFormVisible = true; // Set the flag to true when opening the form
        updateFormDisplay();
      });
    
      closeButton1.addEventListener('click', () => {
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
      const myForm = document.getElementById('myForm5') as HTMLInputElement;
      myForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission
        // Here, you can perform further actions like sending the form data to a server
  
  });
  }
  generate(){
  
  }
  qrcode(){
   this.add()
    // Handle form submission
  
  }

  defectiveSubmit(){
    alert( this.defective.value.itemcode + '\n ' + this.defective.value.location )
  }
  go(){
    if(this.myForm.value.myForm_information=='Itemlist'){
      this.toggleContent2()
    }else if(this.myForm.value.myForm_information=='Defective Products'){
      this.subcontainer2_content[1]=true;
      this.ngOnInit()
    }
    else if(this.myForm.value.myForm_information=='Personel'){

    }
    else if(this.myForm.value.myForm_information=='Category'){

    }
    else if(this.myForm.value.myForm_information=='Location'){

    }
    else if(this.myForm.value.myForm_information=='Project'){

    }
  
    this.isHidden = false;
  }
  submit(){
   
    const formData = new FormData();
    formData.append('code',this.qrForm.value.qrForm_itemcode)
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

