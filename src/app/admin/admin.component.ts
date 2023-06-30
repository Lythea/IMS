
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
  selectedDetail: any; 
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
  deleteDashboardReply: any =[];
  defectiveQuantity: any;
  info : any = ['Defective Products','Personel','Category','Location','Project']
  myForm: any = FormGroup;
  qrForm: any = FormGroup;
  itemlistForm: any = FormGroup;
  dashboard: any = FormGroup;
  isOpen:boolean = false;
  selectedValue: any;
  productValue : any;
defectiveName : any;
defectiveValue : any;
personelValue : any;
personelLocation : any;
personelPosition : any;
categoryValue : any;
locationfullValue : any;
projectLocation : any;
floorValue : any;
locationValue : any;
projectValue : any;
defectiveForm: any = FormGroup;
personelForm: any = FormGroup;
categoryForm: any = FormGroup;
locationForm: any = FormGroup;
projectForm: any = FormGroup;
currentPopupContent: any;
  constructor(private sanitizer: DomSanitizer,private fb: FormBuilder) {  }

  ngOnInit(): void{
    for(let i =1; i<7;i++){
      this.subcontainer2_content[i] == false;
    }
    this.myForm = this.fb.group({
      myForm_information:['',Validators.required],
      
    });
    this.dashboard = this.fb.group({
      label: ['', Validators.required],
    });
    this.defectiveForm = this.fb.group({
      defectiveForm_itemcode: ['', Validators.required],
      defectiveForm_location: ['', Validators.required],
      defectiveForm_quantity: ['', Validators.required],
      defectiveForm_name:['', Validators.required],
    });
    this.personelForm = this.fb.group({
      personelForm_name: ['', Validators.required],
      personelForm_location: ['', Validators.required],
      personelForm_position: ['', Validators.required],
    });
    this.categoryForm = this.fb.group({
      categoryForm_name: ['', Validators.required],
      categoryForm_location: ['', Validators.required],
      
    });
    this.locationForm = this.fb.group({
      locationForm_location: ['', Validators.required],
      locationForm_acronym: ['', Validators.required],
      locationForm_name: ['', Validators.required],
      locationForm_floor: ['', Validators.required],
    });
    this.projectForm = this.fb.group({
      projectForm_name: ['', Validators.required],
      projectForm_location: ['', Validators.required],
      projectForm_sponsor: ['', Validators.required],
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
   
   fetch('http://localhost:8080/IMS/src/backend/infodashboard.php', {
     method: 'POST',
     body: formData
   })
   .then(response => response.json())
   .then(value => {
    
    for (let i = 0; i < value.result1.length; i++) {
      this.productValue = value.result1[i];
      this.productData[i] = {
        productName:  this.productValue ,

      };
    }
    for (let i = 0; i < value.result2.length; i++) {
      this.defectiveName = value.result2[i];
      this.defectiveValue = value.result11[i];
      this.defectiveData[i] = {
        defectiveName:  this.defectiveName ,defectiveValue : this.defectiveValue

      };
    }
    for (let i = 0; i < value.count1; i++) {
      this.personelValue = value.result3[i];
      this.personelLocation = value.result10[i];
      this.personelPosition = value.result9[i];
      this.personelData[i] = {
        personelLocation: this.personelLocation, personelName:  this.personelValue , personelPosition: this.personelPosition

      };
    }
    for (let i = 0; i < value.result4.length; i++) {
      this.categoryValue = value.result4[i];
      this. categoryData[i] = {
        categoryName:   this.categoryValue ,

      };
    }

    for (let i = 0; i < value.count; i++) {
      this.locationfullValue = value.result7[i];
      this.floorValue = value.result6[i];
      this.locationValue = value.result5[i];
      this.locationData[i] = {
        floorName:this.floorValue,locationName:  this.locationValue , locationfullName:  this.locationfullValue 
      };
    }
  
    for (let i = 0; i < value.result8.length; i++) {
      this.projectValue = value.result8[i];
      this.projectLocation = value.result12[i];
      this.projectData[i] = {
        projectName: this.projectValue ,
        projectLocation: this.projectLocation,
      };
    }
    }
    );
  }
  togglePopup() {
    this.isOpen = !this.isOpen;
  }
 
  deletedefective(){
    
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

  neededinfoAddDashboard(){
    const value = localStorage.getItem('value');
    const location = localStorage.getItem('location');
      if(value=='Defective Products'){
        this.subcontainer2_content[1]=true;
        const formData = new FormData();
        const value: any = localStorage.getItem('value');
        const location : any = this.defectiveForm.value.defectiveForm_location
        formData.append('location',location)
        formData.append('value',value)
        console.log(value)  
        console.log(location)
        fetch('http://localhost:8080/IMS/src/backend/neededinfoAddDashboard.php', {
          method: 'POST',
          body: formData
        })
          .then(response => response.json())
          .then(value => {
            console.log(value.result1);

            this.defectiveData = [];
            for (let i = 0; i < value.result1.length; i++) {
              this.defectiveData.push({
                defectiveName: value.result1[i],
              });
            }
          });
      }


  }
 
 

  
  // Method to fetch defective data based on the selected location
  
 
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
  // DONE FUNCTIONS FOR RESPONSIVE AND BACKEND


  //FOR ADD DASHBOARD INSIDE PROPERTY

  onFormChangeAddDashboard(): void {
    const value = localStorage.getItem('value');
    const location = localStorage.getItem('location');

      if(value=='Defective Products'){
        this.subcontainer2_content[1]=true;
        const formData = new FormData();
        const value: any = localStorage.getItem('value');
        const location : any = this.defectiveForm.value.defectiveForm_location
        formData.append('location',location)
        formData.append('value',value)
        console.log(value)  
        console.log(location)
        fetch('http://localhost:8080/IMS/src/backend/formViewlistAdd.php', {
          method: 'POST',
          body: formData
        })
          .then(response => response.json())
          .then(value => {
            console.log(value.result1);

            this.defectiveData = [];
            for (let i = 0; i < value.result1.length; i++) {
              this.defectiveData.push({
                defectiveName: value.result1[i],
              });
            }
          });
      }else if(value=='Personel'){
        this.subcontainer2_content[2]=true;
        this.subcontainer2_content[1]=false;

        const formData = new FormData();
        const value: any = localStorage.getItem('value');
        const location : any = this.personelForm.value.personelForm_location
        formData.append('location',location)
        formData.append('value',value)
        console.log(value)
        console.log(location)
        fetch('http://localhost:8080/IMS/src/backend/formViewlistAdd.php', {
          method: 'POST',
          body: formData
        })
          .then(response => response.json())
          .then(value => {
            console.log(value.result2);
            console.log(value.result3);
            this.personelData = []
            for (let i = 0; i < value.result2.length; i++) {
              this.personelValue = value.result2[i];
              this.personelPosition = value.result3[i];
              this.personelData.push({
                personelName: this.personelValue,
                personelPosition: this.personelPosition
              });
            }
          });
      }
      else if(value=='Category'){
        this.subcontainer2_content[2]=false;
        this.subcontainer2_content[1]=false;
        this.subcontainer2_content[3]=true;
      
        const formData = new FormData();
        const value: any = localStorage.getItem('value');
        const location : any = this.categoryForm.value.categoryForm_location
        formData.append('location',location)
        formData.append('value',value)
        console.log(value)
        console.log(location)
        fetch('http://localhost:8080/IMS/src/backend/formViewlistAdd.php', {
          method: 'POST',
          body: formData
        })
          .then(response => response.json())
          .then(value => {
            console.log(value.result4);

            this.categoryData = []
            for (let i = 0; i < value.result4.length; i++) {
              this.categoryValue = value.result4[i];
              this. categoryData[i] = {
                categoryName:   this.categoryValue ,
        
              };
            }
          });
      }
      else if(value=='Location'){
        this.subcontainer2_content[2]=false;
        this.subcontainer2_content[1]=false; 
        this.subcontainer2_content[3]=false;
        this.subcontainer2_content[4]=true;

        const formData = new FormData();
        const value: any = localStorage.getItem('value');

        formData.append('value',value)
        fetch('http://localhost:8080/IMS/src/backend/formViewlistAdd.php', {
          method: 'POST',
          body: formData
        })
          .then(response => response.json())
          .then(value => {
            console.log(value.result4);

            this.locationData = []
            for (let i = 0; i < value.count; i++) {
      
              this.locationValue = value.result4[i];
              this.locationData[i] = {
                locationName:  this.locationValue
              };
            }
          });
  

      }
      else if(value=='Project'){
        this.subcontainer2_content[2]=false;
        this.subcontainer2_content[1]=false; 
        this.subcontainer2_content[3]=false;
        this.subcontainer2_content[5]=true; 
        this.subcontainer2_content[4]=false; 
      
        const formData = new FormData();
        const value: any = localStorage.getItem('value');
        const location : any = this.projectForm.value.projectForm_location
        formData.append('location',location)
        formData.append('value',value)
        console.log(value)
        console.log(location)
        fetch('http://localhost:8080/IMS/src/backend/formViewlistAdd.php', {
          method: 'POST',
          body: formData
        })
          .then(response => response.json())
          .then(value => {

            this.projectData = []
            for (let i = 0; i < value.result5.length; i++) {
              this.projectValue = value.result5[i];
              this.projectLocation = value.result6[i];
              this.projectData[i] = {
                projectName: this.projectValue ,
                projectLocation: this.projectLocation,
              };
            }
          });
      }
    
  }

  //FOR QR CODE

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

  //FOR DELETE DASHBOARD INSIDE PROPERTY

  onFormChangeDeleteDashboard(): void {
    const value = localStorage.getItem('value');

    const location = localStorage.getItem('location');

      if(value=='Defective Products'){
        this.subcontainer2_content[1]=true;

        const formData = new FormData();
        const value: any = localStorage.getItem('value');
        const location : any = this.defectiveForm.value.defectiveForm_location
        formData.append('location',location)
        formData.append('value',value)
        console.log(value)  
        console.log(location)
        fetch('http://localhost:8080/IMS/src/backend/formViewlistDelete.php', {
          method: 'POST',
          body: formData
        })
          .then(response => response.json())
          .then(value => {
            console.log(value.result1);

            this.defectiveData = [];
            for (let i = 0; i < value.result1.length; i++) {
              this.defectiveData.push({
                defectiveName: value.result1[i],
              });
            }
          });
      }else if(value=='Personel'){
        this.subcontainer2_content[2]=true;
        this.subcontainer2_content[1]=false;

        const formData = new FormData();
        const value: any = localStorage.getItem('value');
        const location : any = this.personelForm.value.personelForm_location
        formData.append('location',location)
        formData.append('value',value)
        console.log(value)
        console.log(location)
        fetch('http://localhost:8080/IMS/src/backend/formViewlistDelete.php', {
          method: 'POST',
          body: formData
        })
          .then(response => response.json())
          .then(value => {
            console.log(value.result2);
            console.log(value.result3);
            this.personelData = []
            for (let i = 0; i < value.result2.length; i++) {
              this.personelValue = value.result2[i];
              this.personelPosition = value.result3[i];
              this.personelData.push({
                personelName: this.personelValue,
                personelPosition: this.personelPosition
              });
            }
          });
      }
      else if(value=='Category'){
        this.subcontainer2_content[2]=false;
        this.subcontainer2_content[1]=false;
        this.subcontainer2_content[3]=true;
      
        const formData = new FormData();
        const value: any = localStorage.getItem('value');
        const location : any = this.categoryForm.value.categoryForm_location
        formData.append('location',location)
        formData.append('value',value)
        console.log(value)
        console.log(location)
        fetch('http://localhost:8080/IMS/src/backend/formViewlistDelete.php', {
          method: 'POST',
          body: formData
        })
          .then(response => response.json())
          .then(value => {
            console.log(value.result4);

            this.categoryData = []
            for (let i = 0; i < value.result4.length; i++) {
              this.categoryValue = value.result4[i];
              this. categoryData[i] = {
                categoryName:   this.categoryValue ,
        
              };
            }
          });
      }
      else if(value=='Location'){
        this.subcontainer2_content[2]=false;
        this.subcontainer2_content[1]=false; 
        this.subcontainer2_content[3]=false;
        this.subcontainer2_content[4]=true;

        const formData = new FormData();
        const value: any = localStorage.getItem('value');
 
        formData.append('value',value)
        fetch('http://localhost:8080/IMS/src/backend/formViewlistDelete.php', {
          method: 'POST',
          body: formData
        })
          .then(response => response.json())
          .then(value => {
            console.log(value.result4);

            this.locationData = []
            for (let i = 0; i < value.count; i++) {
       
              this.locationValue = value.result4[i];
              this.locationData[i] = {
                locationName:  this.locationValue
              };
            }
          });
   

      }
      else if(value=='Project'){
        this.subcontainer2_content[2]=false;
        this.subcontainer2_content[1]=false; 
        this.subcontainer2_content[3]=false;
        this.subcontainer2_content[5]=true; 
        this.subcontainer2_content[4]=false; 
       
        const formData = new FormData();
        const value: any = localStorage.getItem('value');
        const location : any = this.projectForm.value.projectForm_location
        formData.append('location',location)
        formData.append('value',value)
        console.log(value)
        console.log(location)
        fetch('http://localhost:8080/IMS/src/backend/formViewlistDelete.php', {
          method: 'POST',
          body: formData
        })
          .then(response => response.json())
          .then(value => {

            this.projectData = []
            for (let i = 0; i < value.result5.length; i++) {
              this.projectValue = value.result5[i];
              this.projectLocation = value.result6[i];
              this.projectData[i] = {
                projectName: this.projectValue ,
                projectLocation: this.projectLocation,
              };
            }
          });
      }
    
  }

  //FOR DELETE DASHBOARD PROPERTY

  onSelectionChange(){
    this.currentPopupContent = this.myForm.value.myForm_information === 'Defective Products' ? 'defectiveForm' :
    this.myForm.value.myForm_information === 'Personel' ? 'personelForm' :   
    this.myForm.value.myForm_information === 'Category' ? 'categoryForm' :
    this.myForm.value.myForm_information === 'Location' ? 'locationForm' :
    this.myForm.value.myForm_information === 'Project' ? 'projectForm' :
    null;
 
    this.selectedDetail = this.myForm.get('myForm_information')?.value;
    localStorage.setItem('value',this.selectedDetail)

    console.log(this.selectedDetail)
   if(this.myForm.value.myForm_information=='Defective Products'){
      this.subcontainer2_content[1]=true;
      this.ngOnInit()
   
    }
    else if(this.myForm.value.myForm_information=='Personel'){
      this.subcontainer2_content[2]=true;
      this.subcontainer2_content[1]=false;
      this.ngOnInit()
    
    }
    else if(this.myForm.value.myForm_information=='Category'){
      this.subcontainer2_content[2]=false;
      this.subcontainer2_content[1]=false;
      this.subcontainer2_content[3]=true;
   
    }
    else if(this.myForm.value.myForm_information=='Location'){
      this.subcontainer2_content[2]=false;
      this.subcontainer2_content[1]=false; 
      this.subcontainer2_content[3]=false;
      this.subcontainer2_content[4]=true;
 
    }
    else if(this.myForm.value.myForm_information=='Project'){
      this.subcontainer2_content[2]=false;
      this.subcontainer2_content[1]=false; 
      this.subcontainer2_content[3]=false;
      this.subcontainer2_content[5]=true; 
      this.subcontainer2_content[4]=false; 
    }
  
    this.isHidden = false;
  }

  //FOR DELETE DASHBOARD SUBMIT BUTTON
  
  AddDashboardSubmit(){
    const value = localStorage.getItem('value')
    console.log(value)
  
    if(value=='Defective Products'){
      const formData = new FormData();
      console.log(this.defectiveForm.value.defectiveForm_name);
      formData.append('property',value)
      formData.append('defectiveForm_name',this.defectiveForm.value.defectiveForm_name)
      formData.append('defectiveForm_location',this.defectiveForm.value.defectiveForm_location)
      formData.append('defectiveForm_quantity',this.defectiveForm.value.defectiveForm_quantity)
      fetch('http://localhost:8080/IMS/src/backend/addDashboard.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(value => {
        console.log(value)
  
       });
    }
    else if(value=='Personel'){
      const formData = new FormData();

      formData.append('property',value)
      formData.append('personelForm_name',this.personelForm.value.personelForm_name)
      formData.append('personelForm_location',this.personelForm.value.personelForm_location)
      formData.append('personelForm_position',this.personelForm.value.personelForm_position)
    
      fetch('http://localhost:8080/IMS/src/backend/addDashboard.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(value => {
        console.log(value)
       });
    }
    else if(value=='Category'){
      const formData = new FormData();
      console.log(this.categoryForm.value.categoryForm_name)
      console.log(this.categoryForm.value.categoryForm_location)
      console.log(value);
      formData.append('property',value)
      formData.append('categoryForm_name',this.categoryForm.value.categoryForm_name)
      formData.append('categoryForm_location',this.categoryForm.value.categoryForm_location)
    
      fetch('http://localhost:8080/IMS/src/backend/addDashboard.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(value => {
        console.log(value)
       });
    }
    else if(value=='Location'){
      const formData = new FormData();
      formData.append('property',value)
      formData.append('locationForm_acronym',this.locationForm.value.locationForm_acronym)
      formData.append('locationForm_name',this.locationForm.value.locationForm_name)
      formData.append('locationForm_floor',this.locationForm.value.locationForm_floor)

      fetch('http://localhost:8080/IMS/src/backend/addDashboard.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(value => {
        console.log(value)
       });
    }
    else if(value=='Project'){
      const formData = new FormData();
      console.log(value);
      formData.append('property',value)
      console.log(this.projectForm.value.projectForm_name)
      console.log(this.projectForm.value.projectForm_location)
     
      formData.append('projectForm_name',this.projectForm.value.projectForm_name)
      formData.append('projectForm_location',this.projectForm.value.projectForm_location)
    
      fetch('http://localhost:8080/IMS/src/backend/addDashboard.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(value => {
       console.log(value)
       });
    }
  
  }
  //FOR DELETE DASHBOARD SUBMIT BUTTON
  
  DeleteDashboardSubmit(){
    const value = localStorage.getItem('value')
    console.log(value)
  
    if(value=='Defective Products'){
      const formData = new FormData();
      console.log(value);
      formData.append('property',value)
      console.log(this.defectiveForm.value.defectiveForm_itemcode)
      console.log(this.defectiveForm.value.defectiveForm_location)
      console.log(this.defectiveForm.value.defectiveForm_quantity)
      formData.append('defectiveForm_itemcode',this.defectiveForm.value.defectiveForm_itemcode)
      formData.append('defectiveForm_location',this.defectiveForm.value.defectiveForm_location)
      formData.append('defectiveForm_quantity',this.defectiveForm.value.defectiveForm_quantity)
      fetch('http://localhost:8080/IMS/src/backend/deleteDashboard.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(value => {
     console.log(value)
       });
    }
    else if(value=='Personel'){
      const formData = new FormData();
      console.log(this.personelForm.value.personelForm_name)
      console.log(this.personelForm.value.personelForm_location)
      console.log(value);
      formData.append('property',value)
      formData.append('personelForm_name',this.personelForm.value.personelForm_name)
      formData.append('personelForm_location',this.personelForm.value.personelForm_location)
    
      fetch('http://localhost:8080/IMS/src/backend/deleteDashboard.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(value => {
        console.log(value)
       });
    }
    else if(value=='Category'){
      const formData = new FormData();
      console.log(this.categoryForm.value.categoryForm_name)
      console.log(this.categoryForm.value.categoryForm_location)
      console.log(value);
      formData.append('property',value)
      formData.append('categoryForm_name',this.categoryForm.value.categoryForm_name)
      formData.append('categoryForm_location',this.categoryForm.value.categoryForm_location)
    
      fetch('http://localhost:8080/IMS/src/backend/deleteDashboard.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(value => {
        console.log(value)
       });
    }
    else if(value=='Location'){
      const formData = new FormData();
  
      console.log(this.locationForm.value.personelForm_location)
      console.log(value);
      formData.append('property',value)
      formData.append('locationForm_location',this.locationForm.value.locationForm_location)
    
      fetch('http://localhost:8080/IMS/src/backend/deleteDashboard.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(value => {
        console.log(value)
       });
    }
    else if(value=='Project'){
      const formData = new FormData();
      console.log(this.projectForm.value.projectForm_name)
      console.log(this.projectForm.value.projectForm_location)
      console.log(value);
      formData.append('property',value)
      formData.append('projectForm_name',this.projectForm.value.projectForm_name)
      formData.append('projectForm_location',this.projectForm.value.projectForm_location)
    
      fetch('http://localhost:8080/IMS/src/backend/deleteDashboard.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(value => {
        console.log(value)
       });
    }
  
  }

  //FOR DASHBOARD ON QUANTITY CHANGING DROPDOWN

  onDashboardChange() {
    const selectedValue = this.dashboard.get('label').value;
    const formData = new FormData();
    formData.append('companyownership', selectedValue.locationName);
  
    fetch('http://localhost:8080/IMS/src/backend/changingquantityDashboard.php', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(value => {
        this.products = value.result1;
        this.defective = value.result2;
        this.personel = value.result3;
        this.category = value.result4;
        this.project = value.result6;
  
        // Clear the existing data arrays
        this.productData = [];
        this.defectiveData = [];
        this.personelData = [];
        this.categoryData = [];
        this.projectData = [];
  
        // Fetch and update the popup information
        fetch('http://localhost:8080/IMS/src/backend/changinginfoDashboard.php', {
          method: 'POST',
          body: formData
        })
          .then(response => response.json())
          .then(value => {
            for (let i = 0; i < value.result1.length; i++) {
              this.productValue = value.result1[i];
              this.productData.push({
                productName: this.productValue,
              });
            }
            for (let i = 0; i < value.result2.length; i++) {
              this.defectiveName = value.result2[i];
              this.defectiveValue = value.result11[i];
              this.defectiveData.push({
                defectiveName: this.defectiveName,
                defectiveValue: this.defectiveValue
              });
            }
            for (let i = 0; i < value.count1; i++) {
              this.personelValue = value.result3[i];
              this.personelLocation = value.result10[i];
              this.personelPosition = value.result9[i];
              this.personelData.push({
                personelLocation: this.personelLocation,
                personelName: this.personelValue,
                personelPosition: this.personelPosition
              });
            }
            for (let i = 0; i < value.result4.length; i++) {
              this.categoryValue = value.result4[i];
              this.categoryData.push({
                categoryName: this.categoryValue,
              });
            }
  
            for (let i = 0; i < value.result8.length; i++) {
              this.projectValue = value.result8[i];
              this.projectLocation = value.result12[i];
              this.projectData.push({
                projectName: this.projectValue,
                projectLocation: this.projectLocation
              });
            }
  
            // Call togglePopup() to update the popup information
            this.togglePopup();
          });
      });
  }

  //USED FOR ANY POP UP FEATURES

  popupactivation(){
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
      const myForm = document.getElementById('myForm') as HTMLInputElement;
      myForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission
        // Here, you can perform further actions like sending the form data to a server
  
  });
  }
  //USED FOR ANY POP UP FEATURES

  popupactivation1(){
    const openFormButton = document.getElementById('openFormButton1') as HTMLInputElement;
    const popupFormContainer = document.getElementById('popupFormContainer1') as HTMLInputElement;
    const closeButton1 = document.querySelector('.closeButton1') as HTMLInputElement;
    
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
      const myForm = document.getElementById('myForm') as HTMLInputElement;
      myForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission
        // Here, you can perform further actions like sending the form data to a server
  
  });
  }
}



