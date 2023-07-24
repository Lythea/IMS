
import { DomSanitizer } from '@angular/platform-browser';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder,Validators,FormGroup,FormControl} from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import * as jsPDF from 'jspdf';
import { toDataURL } from 'qrcode';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { PageOrientation, TDocumentDefinitions } from 'pdfmake/interfaces';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
import { Renderer2 } from '@angular/core';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit{

  @ViewChild('dropdown', { static: true }) dropdown: ElementRef = new ElementRef(null);
  isOpenProducts: boolean = false;
  isOpenDefective: boolean = false;
  isOpenPersonel: boolean = false;
  isOpenLocation: boolean = false;
  isOpenCategory: boolean = false;
  isOpenProject: boolean = false;
  productsPopupOpen: boolean = false;
  defectivePopupOpen: boolean = false;
  personelPopupOpen: boolean = false;
  categoryPopupOpen: boolean = false;
  locationPopupOpen: boolean = false;
  projectPopupOpen: boolean = false;
  activeContent: any;
  activeLabel: string = '';
  myAngularxQrCode: any='Empty';
  showContent1 = true;
  showContent2 = false;
  showContent3 = false;
  showCodeContent1 = true;
  showCodeContent2 = false;
  showCodeContent3 = false;
  state: any = ['WORKING','DEFECTIVE'];
  container_1 = true;
  container_2 = false;
  container1 = false;
  container2 = true;
  subcontainer2_content: any =[];
  defectiveHidden = false;
 hidden: any = ['Personel','Category','Location','Project','Others'];
  name: any;
  profile: any;
  isHidden: boolean = true;
  isHidden1: boolean = true;
  tableData:any = [];
  productname: any | undefined;
  serial: any | undefined;
  fileUrl: any;
  selectedDetail: any;
  qrgenerate = 'GENERATE';
  productData: any = [];
  defectiveData: any = [];
  personelData: any = [];
  categoryData: any = [];
  locationData: any = [];
  projectData: any = [];
  fetchApiResponse: any[] = [];
  floorData: any =[];
 qrspecificData: any =[];
  fullnameData: any = [];
  specificData : any = [];
  qrData: any =[];
  productDeleteInfo: any = [];
  productUpdateInfo: any = [];
  products: any;
  defective: any;
  personel: any;
  category: any;
  project: any;
  location: any;
  deleteDashboardReply: any =[];
  defectiveQuantity: any;
  account : any = ['Create Code','Create Account'];
  info : any = ['Personel','Category','Location','Project','Others']
  searchinfo : any = ['All','Sort ASC','Sort DESC','Item Code','Item Name','Quantity','Category','Location','Project','Specific','Defective']
  myForm: any = FormGroup;
  qrForm: any = FormGroup;
  addInstockForm: any = FormGroup;
  deleteInstockForm: any = FormGroup;
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
codeForm: any = FormGroup;
personelForm: any = FormGroup;
categoryForm: any = FormGroup;
locationForm: any = FormGroup;
projectForm: any = FormGroup;
accounts: any = FormGroup;
updateInstockForm : any = FormGroup;
currentPopupContent: any;
generatedInputs: string[] = [];
generatedInputs1: string[] = [];
disabled :boolean =true;
addInstockData : any = [];
totalQuantity: number = 0;
totalQuantity1: number = 0;
selectedValue1: any;
search: any = FormGroup;
searchdropdown: any = FormGroup;
othersData: any = [];
othersValue : any;
otherForm : any = FormGroup;
inventoryItems: any[] = [];
itemForm: any = FormGroup;

selectedFile: File | null = null;
  constructor(private sanitizer: DomSanitizer,private fb: FormBuilder,private http: HttpClient,private renderer: Renderer2) {
    window.addEventListener('click', this.closePopup.bind(this));
    }

  ngOnInit(): void{
    this.renderer.listen('document', 'click', () => {
      this.closeAllPopups();
    });
    this.container_1 = true;
    this.container_2 = false;
    this.accounts = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      position: ['', Validators.required],
      company: ['', Validators.required],
      code: ['', Validators.required]
    });

    this.myForm = this.fb.group({
      myForm_information:['',Validators.required],
    });
    this.otherForm = this.fb.group({
      otherForm_name:['',Validators.required],
    });
    this.updateInstockForm = this.fb.group({
      ownership: ['', Validators.required],
      quantity: ['', Validators.required],
      input: ['', Validators.required],
      updateInstockForm_sponsors:['',Validators.required],
      updateInstockForm_quantity:['',Validators.required],
      updateInstockForm_project:['',Validators.required],
      updateInstockForm_name :['',Validators.required],
      updateInstockForm_specificlocation :['',Validators.required],
      updateInstockForm_category:['',Validators.required],
      updateInstockForm_location:['',Validators.required],
      updateInstockForm_imgurl:['',Validators.required],
      updateInstockForm_parurl:['',Validators.required],
      updateInstockForm_code:['',Validators.required],
      updateInstockForm_newlocation:['',Validators.required],
    });
    this.searchdropdown = this.fb.group({
      value: ['', Validators.required],
    });
    this.search = this.fb.group({
      name: new FormControl({ value: '', disabled: true }, Validators.required),
    });
    this.dashboard = this.fb.group({
      label: new FormControl({ value: '', disabled: true }, Validators.required),
    });
    this.defectiveForm = this.fb.group({
      defectiveForm_itemcode: ['', Validators.required],
      defectiveForm_location: ['', Validators.required],
      defectiveForm_quantity: ['', Validators.required],
      defectiveForm_name: ['', Validators.required],
      defectiveForm_specific: ['', Validators.required], // Add this line
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
    this.codeForm = this.fb.group({
      codeForm_location:['',Validators.required],
      codeForm_admincode:['',Validators.required],
      codeForm_usercode:['',Validators.required],
    });
    this.qrForm = this.fb.group({
      qrForm_itemcode1:['',Validators.required],
      qrForm_itemcode2:['',Validators.required],
      qrForm_location:['',Validators.required],
      qrForm_specific:['',Validators.required],
    });
    this.addInstockForm = this.fb.group({
      ownership: ['', Validators.required],
      quantity: ['', Validators.required],
      addInstockForm_sponsors:['',Validators.required],
      addInstockForm_quantity:['',Validators.required],
      addInstockForm_project:['',Validators.required],
      addInstockForm_name :['',Validators.required],
      addInstockForm_category:['',Validators.required],
      addInstockForm_location:['',Validators.required],
      addInstockForm_imgurl:['',Validators.required],
      addInstockForm_parurl:['',Validators.required],
      addInstockForm_serial:['',Validators.required],
      addInstockForm_property:['',Validators.required],
    });
    this.deleteInstockForm = this.fb.group({
      deleteInstockForm_code:['',Validators.required],
      deleteInstockForm_location:['',Validators.required],
    });
    this.createQRForm();
    this.refreshDashboard()
  }
  createQRForm() {
    this.itemForm = this.fb.group({
      itemForm_location: ['', Validators.required],
      quantity: ['', Validators.required],
    });
  }

  onQuantityChange2() {
    const quantity = this.itemForm.get('quantity').value;
    // Clear previously generated form controls
    this.generatedInputs1.forEach((input) => {
      this.itemForm.removeControl(input);
    });
    this.generatedInputs1 = [];

    // Generate and add new form controls
    for (let i = 1; i <= quantity; i++) {
      const inputName = this.generateInputName(i);
      this.itemForm.addControl(inputName, new FormControl('', Validators.required));
      this.generatedInputs1.push(inputName);
    }
  }

  generateInputName(index: number): string {
    return `Item Code ${index}`;
  }

  trysubmit() {
    const formDataToSend = new FormData();
    const content:any = localStorage.getItem('content')

    let position : any = localStorage.getItem('position')
    if (position =='administrator'){
      formDataToSend.append('company', this.itemForm.value.itemForm_location);
    }else if(position ='moderator'){
      const company:any = localStorage.getItem('company')
      formDataToSend.append('company', company);
    }
    const generatedInputsData1: { [key: string]: any } = {};

    for (const inputName of this.generatedInputs1) {
      // Extract the numeric index from the input name
      const index = parseInt(inputName.replace('Item Code', '').trim(), 10);
      // Use the numeric index to generate the input name without the prefix
      const generatedInputName = this.generateInputName(index);
      const inputValue = this.itemForm.get(inputName).value;
      generatedInputsData1[generatedInputName] = inputValue;
    }

  // Now, generatedInputsData object contains the data from the dynamically generated input fields.
  // You can use this data as needed.

  // Example: Convert the object to JSON and send it to the server using Fetch API.
  const generatedInputsDataJSON = JSON.stringify(generatedInputsData1);


  formDataToSend.append('generatedInputsData', generatedInputsDataJSON);

  formDataToSend.append('content', content);


  fetch('http://localhost:8080/IMS/src/backend/qr1.php', {
    method: 'POST',
    body: formDataToSend
  })
    .then(response => response.json())
    .then(async value => {
      console.log(value.count)
    if(value.count>0){
      const qrCodeImages: string[] = []; // Array to collect QR code images

      for (let i = 0; i < value.count; i++) {
        if (value.data[i]) { // Add a condition to check if result2[i] exists
          var productname = value.data[i].item_name;
          var serial = value.data[i].Serial !== '' ? value.data[i].Serial : 'N/A';
          var property = value.data[i].Property !== '' ? value.data[i].Property : 'N/A';
          var category = value.data[i].category !== '' ? value.data[i].category : 'N/A';
          var location = value.data[i].location !== '' ? value.data[i].location : 'N/A';
          var specificlocation = value.data[i].specificlocation !== '' ? value.data[i].specificlocation : 'N/A';
          var project = value.data[i].project !== '' ? value.data[i].project : 'N/A';
          var par = value.data[i].par !== '' ? value.data[i].par : 'N/A';
          var image = value.data[i].image !== '' ? value.data[i].image : 'N/A';

          const qrCodeData = 'Product: ' + productname +
            '\nSerial: ' + serial +
            '\nProperty: ' + property +
            '\nCategory: ' + category +
            '\nLocation: ' + location +
            '\nSpecific Location: ' + specificlocation +
            '\nProject by: ' + project +
            '\nImage URL: ' + image +
            '\nPAR URL: ' + par;

          let qrCodeImage: string;
          try {
            qrCodeImage = await this.generateQRCode(qrCodeData);
            qrCodeImages.push(qrCodeImage); // Collect QR code image in the array
          } catch (error) {
            console.error('QR code generation failed:', error);
            return;
          }
        } else {
          console.warn('Item data missing for index:', i);
        }
      }
            interface QRCodeContent {
              image: string;
              width: number;
            }

            interface PDFDocumentDefinition {
              pageSize: string;
              pageOrientation: string;
              content: { columns: { width: string; stack: QRCodeContent[] }[] }[];
            }

            // ...

            const qrCodeContent: any[][] = qrCodeImages.map((image, index) => {
              const productname = value.data[index]?.item_name || 'N/A';

              return [
                { image: image, width: 100, alignment: 'center' },
                { text: productname, alignment: 'center' }
              ];
            });

            const qrCodePages: any[][][] = [];
            let qrCodePage: any[][] = [];

            qrCodeContent.forEach((qrCode, index) => {
              qrCodePage.push(qrCode);

              // Check if the page is complete or if it's the last QR code
              if (qrCodePage.length === 10 || index === qrCodeContent.length - 1) {
                qrCodePages.push(qrCodePage);
                qrCodePage = [];
              }
            });

            const documentDefinition: TDocumentDefinitions = {
              pageSize: 'A4',
              pageOrientation: 'portrait' as PageOrientation,
              content: qrCodePages.map((page) => ({
                columns: [
                  {
                    width: '50%',
                    stack: page.slice(0, 5)
                  },
                  {
                    width: '50%',
                    stack: page.slice(5)
                  }
                ]
              }))
            };

            const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
            pdfDocGenerator.download('qr_code_data.pdf');
    }else {
      alert('No Data')
    }


    this.updateFormDisplay()
    });

  }
  refreshDashboard(){
    this.name = localStorage.getItem('name')
    this.profile = localStorage.getItem('position')?.toUpperCase();

    const position = localStorage.getItem('position');
    const company = localStorage.getItem('company');

    if(position == 'administrator' ){
      this.toggleFormControl(false);
    }else if ( position == 'moderator'){
      this.toggleFormControl(true);
    }else if (position =='user' ){
      this.toggleFormControl(true);
    }

    for(let i =1; i<7;i++){
      this.subcontainer2_content[i] == false;
    }
   const formData = new FormData();

   if (position!== null && company!==null) {
    // Append the position field to the formData object
    formData.append('position', position);
    formData.append('company', company);
  }

  fetch('http://localhost:8080/IMS/src/backend/specific.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(value => {

   for (let i = 0; i < value.resultArray.length; i++) {
    this.othersValue = value.resultArray[i];
    this.othersData[i] = {
      specific:  this.othersValue ,
    };
  }
   });
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
  disableSelect() {
    this.dropdown.nativeElement.disabled = true;
  }
  togglePopup(popup: HTMLElement) {
    popup.classList.toggle('open');
  }
  // Function to close the popup when clicking outside
  closePopup(event: MouseEvent) {
    const popupContents = document.getElementsByClassName('popup-content');
    for (let i = 0; i < popupContents.length; i++) {
      const popupContent = popupContents[i];
      if (!popupContent.contains(event.target as Node)) {
        this.isOpenProducts = false;
        this.isOpenDefective = false;
        // Set other popup properties to false as well
      }
    }
  }
  closeAllPopups() {
    this.productsPopupOpen = false;
    this.defectivePopupOpen = false;
    this.categoryPopupOpen = false;
    this.personelPopupOpen = false;
    this.locationPopupOpen = false;
    this.projectPopupOpen = false;
    // Add similar logic for other popup properties
  }
  signup(){
    if (this.accounts.invalid) {
      alert('Sign Up Information Invalid')
      // Form is invalid, handle accordingly (display errors, prevent submission, etc.)
    } else {
      // Form is valid, continue with the signup process
      const formData = new FormData();
      formData.append('name',this.accounts.value.name)
      formData.append('email',this.accounts.value.email)
      formData.append('password',this.accounts.value.password)
      formData.append('position',this.accounts.value.position.toLowerCase())
      formData.append('company',this.accounts.value.company)
      formData.append('code',this.accounts.value.code)

      fetch('http://localhost:8080/IMS/src/backend/verifyaccount.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(value => {
      if (value.data == 'No Data'){
        alert('Code is incorrect')
      }else if(value.data=='Not Found!'){
        fetch('http://localhost:8080/IMS/src/backend/signup.php', {
          method: 'POST',
          body: formData
        })
        .then(response => response.json())
        .then(value => {
          value.data.toLowerCase()
          alert(value.data)
          this.updateFormDisplay()
          this.showContent1 = true;
          this.showContent2 = false;
        });
       }else if(value.data[0].name!='' || value.data[0].email!=''){
        alert(value.data[0].name + ' already in used and ' + value.data[0].email + ' already registered')
       }

      });
    }

}
  exportData() {
    const position: any = localStorage.getItem('position');
    const company : any =localStorage.getItem('company');
    if(position =='administrator' || position =='moderator'){
      const exportUrl = 'http://localhost:8080/IMS/src/backend/exportdata.php';

      // Create a new FormData object
      const formData = new FormData();

      // Append additional data based on conditions
      formData.append('position', position);
      formData.append('company', company);
      // Send the HTTP request with the FormData
      this.http.post(exportUrl, formData, { responseType: 'blob' }).subscribe((response: any) => {
        const blob = new Blob([response], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        if(position =='administrator'){
          a.download = 'STEERHUB_Itemlist.csv';
        }else if (position =='moderator'){
          a.download = company + '_Itemlist.csv';
        }
       // Specify the filename
        a.click();
      });
    }else if(position=='user'){
      alert('ACCESS DENIED!')
    }

  }
  handleFileInput(event: any) {
    this.selectedFile  = event.target.files[0];
  }

  uploadFile(event: Event) {
    let position: any = localStorage.getItem('position')
    if(position =='administrator'){
      event.preventDefault();

      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('file', this.selectedFile);

        this.http.post('http://localhost:8080/IMS/src/backend/importData.php', formData)
          .subscribe(
            response => {
              alert('File uploaded successfully')
            },
            error => {
              alert('An error occurred');
            }
          );
      }
    }else if(position =='moderator' || position =='user') {
      alert('ACCESS DENIED!')
    }

  }
  async generateQRCode(data: string): Promise<string> {
    try {
      return await new Promise<string>((resolve, reject) => {
        toDataURL(data, { errorCorrectionLevel: 'M' }, (error, url) => {
          if (error) {
            reject(error);
          } else {
            resolve(url);
          }
        });
      });
    } catch (error) {
      console.error('QR code generation failed:', error);
      throw error; // Rethrow the error to be caught in the outer catch block
    }
  }
  toggleCodeContentmema_1(): void {

    this.container_1 = true;
    this.container_2 = false;
  }
  toggleCodeContentmema_2(): void {
    this.container_1 = false;
    this.container_2 = true;
  }
  toggleCodeContentmema_3(contentId: string): void {
    this.activeContent = contentId;
    localStorage.setItem('content', contentId);

    if (contentId === 'content1') {
      this.toggleCodeContentmema_1();
    } else if (contentId === 'content2') {
      this.toggleCodeContentmema_2();
    }
  }
  newqrgenerate(){
const content: any = localStorage.getItem('content')
    const formData = new FormData();
    const position: any = localStorage.getItem('position')

    if (position =='administrator'){
      formData.append('company',this.qrForm.value.qrForm_location)
    } else if (position =='moderator'){
      const company: any = localStorage.getItem('company')
      formData.append('company',company.toUpperCase())
      }
      formData.append('position',position)
      formData.append('code1',this.qrForm.value.qrForm_itemcode1)
      formData.append('code2',this.qrForm.value.qrForm_itemcode2)
      formData.append('content',content)
    fetch('http://localhost:8080/IMS/src/backend/newqrgenerator.php', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(async value => {
      if(value.total_count>0){
        const qrCodeImages: string[] = []; // Array to collect QR code images

        for (let i = 0; i < value.total_count; i++) {
          if (value.result2[i]) { // Add a condition to check if result2[i] exists
            var productname = value.result2[i].item_name;
            var serial = value.result2[i].Serial !== '' ? value.result2[i].Serial : 'N/A';
            var property = value.result2[i].Property !== '' ? value.result2[i].Property : 'N/A';
            var category = value.result2[i].category !== '' ? value.result2[i].category : 'N/A';
            var location = value.result2[i].location !== '' ? value.result2[i].location : 'N/A';
            var specificlocation = value.result2[i].specificlocation !== '' ? value.result2[i].specificlocation : 'N/A';
            var project = value.result2[i].project !== '' ? value.result2[i].project : 'N/A';
            var par = value.result2[i].par !== '' ? value.result2[i].par : 'N/A';
            var image = value.result2[i].image !== '' ? value.result2[i].image : 'N/A';

            const qrCodeData = 'Product: ' + productname +
              '\nSerial: ' + serial +
              '\nProperty: ' + property +
              '\nCategory: ' + category +
              '\nLocation: ' + location +
              '\nSpecific Location: ' + specificlocation +
              '\nProject by: ' + project +
              '\nImage URL: ' + image +
              '\nPAR URL: ' + par;

            let qrCodeImage: string;
            try {
              qrCodeImage = await this.generateQRCode(qrCodeData);
              qrCodeImages.push(qrCodeImage); // Collect QR code image in the array
            } catch (error) {
              console.error('QR code generation failed:', error);
              return;
            }
          } else {
            console.warn('Item data missing for index:', i);
          }
        }
        interface QRCodeContent {
          image: string;
          width: number;
        }

        interface PDFDocumentDefinition {
          pageSize: string;
          pageOrientation: string;
          content: { columns: { width: string; stack: QRCodeContent[] }[] }[];
        }

        // ...

        const qrCodeContent: any[][] = qrCodeImages.map((image, index) => {
          const productname = value.result2[index]?.item_name || 'N/A';

          return [
            { image: image, width: 100, alignment: 'center' },
            { text: productname, alignment: 'center' }
          ];
        });

        const qrCodePages: any[][][] = [];
        let qrCodePage: any[][] = [];

        qrCodeContent.forEach((qrCode, index) => {
          qrCodePage.push(qrCode);

          // Check if the page is complete or if it's the last QR code
          if (qrCodePage.length === 10 || index === qrCodeContent.length - 1) {
            qrCodePages.push(qrCodePage);
            qrCodePage = [];
          }
        });

        const documentDefinition: TDocumentDefinitions = {
          pageSize: 'A4',
          pageOrientation: 'portrait' as PageOrientation,
          content: qrCodePages.map((page) => ({
            columns: [
              {
                width: '50%',
                stack: page.slice(0, 5)
              },
              {
                width: '50%',
                stack: page.slice(5)
              }
            ]
          }))
        };

        const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
        pdfDocGenerator.download('qr_code_data.pdf');

      }else {
        alert('No Data.')
      }


      this.updateFormDisplay()

     });
  }

  updateInstock(){
    const position : any = localStorage.getItem('position')
    const formData = new FormData();
    const sponsors : any = this.updateInstockForm.value.updateInstockForm_sponsors
    const category : any = this.updateInstockForm.value.updateInstockForm_category
    const code : any = this.updateInstockForm.value.updateInstockForm_code
    const quantity : any = this.updateInstockForm.value.updateInstockForm_quantity
    const imgurl : any = this.updateInstockForm.value.updateInstockForm_imgurl
    const parurl : any = this.updateInstockForm.value.updateInstockForm_parurl
    const location : any = this.updateInstockForm.value.updateInstockForm_location
    const specific : any = this.updateInstockForm.value.updateInstockForm_specificlocation
    const newlocation : any = this.updateInstockForm.value.updateInstockForm_newlocation

    if (position =='administrator'){
      formData.append('company',location)
      formData.append('position',position)
    } else if (position =='moderator'){
      const company: any = localStorage.getItem('company')
      formData.append('company',company.toUpperCase())
      formData.append('position',position)
      }
      formData.append('sponsors',sponsors)
      formData.append('category',category)
      formData.append('specific',specific)
      formData.append('quantity',quantity)
      formData.append('imgurl',imgurl)
      formData.append('parurl',parurl)
      formData.append('newlocation',newlocation)
      formData.append('code',code)
   fetch('http://localhost:8080/IMS/src/backend/updateInstock.php', {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(value => {
          alert(value.data)
          this.updateFormDisplay()
        });

  }

  handleSelectChange() {
    this.selectedValue1 = this.searchdropdown.value.value
    if(this.selectedValue1 !==''){
      this.toggleFormControl(true);
    }else{
      this.toggleFormControl(false);
    }
    if(this.selectedValue1 == 'All'){
      this.handleSearch()
    }else if(this.selectedValue1 == 'Sort ASC'){
      this.handleSearch()
    }else if(this.selectedValue1 == 'Sort DESC'){
      this.handleSearch()
    }else if(this.selectedValue1 == 'Defective'){
      this.handleSearch()
    }
  }
  handleSearch() {
    const formData = new FormData();
    const position: any | null = localStorage.getItem('position');
    const company: any | null = localStorage.getItem('company');
    formData.append('property', this.selectedValue1);
    formData.append('value', this.search.value.name);
    formData.append('position', position);
    formData.append('company', company);

     fetch('http://localhost:8080/IMS/src/backend/searchbar.php', {
     method: 'POST',
     body: formData
   })
   .then(response => response.json())
   .then(value => {
    this.tableData= [];
    for (let i = 0; i < value.data.length; i++) {
      const codeValue = value.data[i].itemid_company !== '' ? value.data[i].itemid_company : 'N/A';
      const serial= value.data[i].Serial !== '' ? value.data[i].Serial : 'N/A';
      const property= value.data[i].Property !== '' ? value.data[i].Property : 'N/A';
      const productValue = value.data[i].item_name !== '' ? value.data[i].item_name  : 'N/A';
      const quantityValue = value.data[i].quantity !== '' ? value.data[i].quantity : 'N/A';
      const specificValue = value.data[i].specificlocation !== '' ? value.data[i].specificlocation: 'N/A';
      const categoryValue = value.data[i].category !== '' ? value.data[i].category : 'N/A';
      const locationValue = value.data[i].location !== '' ? value.data[i].location : 'N/A';
      const projectValue = value.data[i].project !== '' ? value.data[i].project : 'N/A';
      const conditionValue = value.data[i].condition !== '' ? value.data[i].condition : 'N/A';
      const image = value.data[i].image !== '' ? value.data[i].image : 'N/A';
      const par = value.data[i].par !== '' ? value.data[i].par : 'N/A';


      this.tableData[i] = {
        itemid: locationValue + '-' +codeValue,
        code:  codeValue ,
        serial:serial,
        property:property,
        productname: productValue,
        quantity: quantityValue,
        specific: specificValue,
        category: categoryValue,
        location: locationValue,
        project: projectValue,
        condition: conditionValue,
        image: image,
        par: par,
      };
 // Access and log the "code" property
    }


    }
    );
  }
  handleDelete(){
    const location : any = this.deleteInstockForm.value.deleteInstockForm_location
    const code : any = this.deleteInstockForm.value.deleteInstockForm_code
    const position : any = localStorage.getItem('position')
    const formData = new FormData();
    if (position =='administrator'){
      formData.append('code',code)
      formData.append('location',location)
    } else if (position =='moderator'){
      const company: any = localStorage.getItem('company')
      formData.append('code',code)
      formData.append('location',company)
    }
    fetch('http://localhost:8080/IMS/src/backend/getdeleteInstock.php', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(value => {

        this.productDeleteInfo =[]

          const codeValue = value.result1[0].itemid_company !== '' ? value.result1[0].itemid_company : 'N/A';
          const serial= value.result1[0].Serial !== '' ? value.result1[0].Serial : 'N/A';
          const property= value.result1[0].Property !== '' ? value.result1[0].Property : 'N/A';
          const productValue = value.result1[0].item_name !== '' ? value.result1[0].item_name  : 'N/A';
          const quantityValue = value.result1[0].quantity !== '' ? value.result1[0].quantity : 'N/A';
          const specificValue = value.result1[0].specificlocation !== '' ? value.result1[0].specificlocation: 'N/A';
          const categoryValue = value.result1[0].category !== '' ? value.result1[0].category : 'N/A';
          const locationValue = value.result1[0].location !== '' ? value.result1[0].location : 'N/A';
          const conditionValue = value.result1[0].condition !== '' ? value.result1[0].condition : 'N/A';

          const projectValue = value.result1[0].project !== '' ? value.result1[0].project : 'N/A';
          const image = value.result1[0].image !== '' ? value.result1[0].image : 'N/A';
          const par = value.result1[0].par !== '' ? value.result1[0].par : 'N/A';

           this.productDeleteInfo[0] = {
            itemid: locationValue + '-' +codeValue,
            code:  codeValue ,
            serial:serial,
            property:property,
            productname: productValue,
            quantity: quantityValue,
            specific: specificValue,
            category: categoryValue,
            location: locationValue,
            project: projectValue,
            image: image,
            par: par,
            condition : conditionValue,
          };
      });


    }
handleUpdate(){
const location : any = this.updateInstockForm.value.updateInstockForm_location
const code : any = this.updateInstockForm.value.updateInstockForm_code
const position : any = localStorage.getItem('position')
const formData = new FormData();

if (position =='administrator'){
  formData.append('code',code)
  formData.append('location',location)
} else if (position =='moderator'){
  const company: any = localStorage.getItem('company')
  formData.append('code',code)
  formData.append('location',company)
}
fetch('http://localhost:8080/IMS/src/backend/getupdateInstock.php', {
  method: 'POST',
  body: formData
})
  .then(response => response.json())
  .then(value => {
    this.productUpdateInfo =[]

      const codeValue = value.result1[0].itemid_company !== '' ? value.result1[0].itemid_company : 'N/A';
      const serial= value.result1[0].Serial !== '' ? value.result1[0].Serial : 'N/A';
      const property= value.result1[0].Property !== '' ? value.result1[0].Property : 'N/A';
      const productValue = value.result1[0].item_name !== '' ? value.result1[0].item_name  : 'N/A';
      const quantityValue = value.result1[0].quantity !== '' ? value.result1[0].quantity : 'N/A';
      const specificValue = value.result1[0].specificlocation !== '' ? value.result1[0].specificlocation: 'N/A';
      const categoryValue = value.result1[0].category !== '' ? value.result1[0].category : 'N/A';
      const locationValue = value.result1[0].location !== '' ? value.result1[0].location : 'N/A';
      const conditionValue = value.result1[0].condition !== '' ? value.result1[0].condition : 'N/A';

      const projectValue = value.result1[0].project !== '' ? value.result1[0].project : 'N/A';
      const image = value.result1[0].image !== '' ? value.result1[0].image : 'N/A';
      const par = value.result1[0].par !== '' ? value.result1[0].par : 'N/A';

       this.productUpdateInfo[0] = {
        itemid: locationValue + '-' +codeValue,
        code:  codeValue ,
        serial:serial,
        property:property,
        productname: productValue,
        quantity: quantityValue,
        specific: specificValue,
        category: categoryValue,
        location: locationValue,
        project: projectValue,
        image: image,
        par: par,
        condition : conditionValue,
      };
  });


}
  toggleFormControl(disabled: boolean) {
    const control = this.dashboard.get('label');
    if (disabled) {
      control.disable();
    } else {
      control.enable();
    }
    const control1 = this.search.get('name');
    if (disabled) {
      control1.enable();
    } else {
      control1.disable();
    }
    const position = localStorage.getItem('position');
    if(position == 'moderator'){
      const control1 = this.defectiveForm.get('defectiveForm_location')

      if (disabled) {
        control1.disable();
      } else {
        control1.enable();
      }
      const control2 = this.personelForm.get('personelForm_location')

      if (disabled) {
        control2.disable();
      } else {
        control2.enable();
      }
      const control3 = this.categoryForm.get('categoryForm_location')

      if (disabled) {
        control3.disable();
      } else {
        control3.enable();
      }
      const control4 = this.projectForm.get('projectForm_location')

      if (disabled) {
        control4.disable();
      } else {
        control4.enable();
      }
      const control5= this.addInstockForm.get('addInstockForm_location')

      if (disabled) {
        control5.disable();
      } else {
        control5.enable();
      }
      const control6= this.updateInstockForm.get('updateInstockForm_location')

      if (disabled) {
        control6.disable();
      } else {
        control6.enable();
      }
      const control7= this.deleteInstockForm.get('deleteInstockForm_location')

      if (disabled) {
        control7.disable();
      } else {
        control7.enable();
      }
      const control8= this.qrForm.get('qrForm_location')

      if (disabled) {
        control8.disable();
      } else {
        control8.enable();
      }
      const control9= this.itemForm.get('itemForm_location')

      if (disabled) {
        control9.disable();
      } else {
        control9.enable();
      }
    }

  }
  code(){
    const add = document.getElementById('add') as HTMLButtonElement;
    const upd = document.getElementById('update') as HTMLButtonElement;
    const del = document.getElementById('delete') as HTMLButtonElement;
    if(add){
      const value= 'add';
      const val1 : any = this.codeForm.value.codeForm_admincode
      const val2 : any = this.codeForm.value.codeForm_usercode
      const val3 : any = this.codeForm.value.codeForm_location

      const formData = new FormData();
      formData.append('val',value)
      formData.append('val1',val1)
      formData.append('val2',val2)
      formData.append('val3',val3)
      fetch('http://localhost:8080/IMS/src/backend/code.php', {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(value => {
          alert(value.data)
          this.updateFormDisplay()

        });

    }else if(upd){
      const value= 'update';
      const val1 : any = this.codeForm.value.codeForm_admincode
      const val2 : any = this.codeForm.value.codeForm_usercode
      const val3 : any = this.codeForm.value.codeForm_location

      const formData = new FormData();
      formData.append('val',value)
      formData.append('val1',val1)
      formData.append('val2',val2)
      formData.append('val3',val3)
      fetch('http://localhost:8080/IMS/src/backend/code.php', {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(value => {
          alert(value.data)
          this.updateFormDisplay()

        });

    }else if (del){
      const value= 'delete';

      const val3 : any = this.codeForm.value.codeForm_location

      const formData = new FormData();
      formData.append('val',value)

      formData.append('val3',val3)
      fetch('http://localhost:8080/IMS/src/backend/code.php', {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(value => {
          alert(value.data)
          this.updateFormDisplay()

        });
    }

  }

  onQuantityChange() {
    const quantity = this.addInstockForm.get('quantity').value;
    // Clear previously generated form controls
    this.generatedInputs.forEach((input) => {
      this.addInstockForm.removeControl(input);
      this.addInstockForm.removeControl(input + 'quantity');
      this.addInstockForm.removeControl(input + 'condition');
    });
    this.generatedInputs = [];

    // Generate and add new form controls
    for (let i = 1; i <= quantity; i++) {
      const inputName = `${i}`;
      this.addInstockForm.addControl(inputName, new FormControl(''));
      this.addInstockForm.addControl(inputName + 'quantity', new FormControl(''));
      this.addInstockForm.addControl(inputName + 'condition', new FormControl(''));
      this.generatedInputs.push(inputName);
    }
  }

  getInputValue(inputName: string): string {
    return this.addInstockForm.get(inputName).value;
  }

  getAllInputValues(): string[] {
    return this.generatedInputs.map(input => this.getInputValue(input));
  }

  getTotalQuantity(): number {
    let total = 0;
    for (const input of this.generatedInputs) {
      const quantity = this.addInstockForm.get(input + 'quantity')?.value;
      if (quantity) {
        total += parseInt(quantity, 10);
      }
    }
    this.totalQuantity = total;
    return total;
  }

addInstock(){
  const position : any = localStorage.getItem('position')
  const formData = new FormData();
  const sponsors : any = this.addInstockForm.value.addInstockForm_sponsors
  const category : any = this.addInstockForm.value.addInstockForm_category
  const itemname : any = this.addInstockForm.value.addInstockForm_name
  const quantity: any = this.addInstockForm.value.quantity;
  const location : any = this.addInstockForm.value.addInstockForm_location
  const imgurl : any = this.addInstockForm.value.addInstockForm_imgurl
  const parurl : any = this.addInstockForm.value.addInstockForm_parurl
  const serial : any = this.addInstockForm.value.addInstockForm_serial
  const property : any = this.addInstockForm.value.addInstockForm_property

  const inputValues: {[key: string]: any} = {}; // Initialize inputValues as an empty object

  this.generatedInputs.forEach((input) => {
    const inputValue = this.addInstockForm.get(input).value;
    const quantityValue = this.addInstockForm.get(input + 'quantity').value;
    const conditionValue = this.addInstockForm.get(input + 'condition').value; // Get the condition value
    inputValues[input] = inputValue;
    inputValues[input + 'quantity'] = quantityValue;
    inputValues[input + 'condition'] = conditionValue; // Add the condition value to inputValues
  });

  const inputValuesJSON = JSON.stringify(inputValues);
  const blob = new Blob([inputValuesJSON], { type: 'application/json' });
  formData.append('inputValues', blob);
  if (position =='administrator'){
    formData.append('company',location)
    formData.append('position',position)
  } else if (position =='moderator'){

    const company: any = localStorage.getItem('company')
    formData.append('company',company.toUpperCase())
    formData.append('position',position)
    }
    formData.append('quantity', quantity);
    formData.append('serial',serial)
    formData.append('property',property)
    formData.append('sponsors',sponsors)
    formData.append('category',category)
    formData.append('itemname',itemname)
    formData.append('imgurl',imgurl)
    formData.append('parurl',parurl)

    fetch('http://localhost:8080/IMS/src/backend/addInstock.php', {
      method: 'POST',
      body: formData
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse the response as JSON
    })
    .then((data) => {
      alert(data.data)
      this.updateFormDisplay()// Handle the response data here (success case)
      // Check the data object for success or error message and perform appropriate actions
    })
    .catch((error) => {
      console.error('Error:', error); // Handle fetch or JSON parsing errors
      // Display a more user-friendly error message or take appropriate actions
      alert('Error Adding Item')
    });
    }
  deleteInstock(){
    const location : any = this.deleteInstockForm.value.deleteInstockForm_location
    const code : any = this.deleteInstockForm.value.deleteInstockForm_code
    const position : any = localStorage.getItem('position')
    const formData = new FormData();
    if (position =='administrator'){
      formData.append('code',code)
      formData.append('location',location)
      formData.append('position',position)
    } else if (position =='moderator'){
      const company: any = localStorage.getItem('company')
      formData.append('code',code)
      formData.append('location',company)
      formData.append('position',position)
    }
    fetch('http://localhost:8080/IMS/src/backend/deleteInstock.php', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(value => {
        alert(value.data)
        this.updateFormDisplay()
      });
  }

  onQuantityChange1() {
    const quantity = this.updateInstockForm.get('quantity').value;
    // Clear previously generated form controls
    this.generatedInputs.forEach((input) => {
      this.updateInstockForm.removeControl(input);
      this.updateInstockForm.removeControl(input + 'quantity');
    });
    this.generatedInputs = [];

    // Generate and update new form controls
    for (let i = 1; i <= quantity; i++) {
      const inputName = `${i}`;
      this.updateInstockForm.addControl(inputName, new FormControl(''));
      this.updateInstockForm.addControl(inputName + 'quantity', new FormControl(''));
      this.generatedInputs.push(inputName);
    }

  }
  getInputValue1(inputName: string): string {
    return this.updateInstockForm.get(inputName).value;

  }

  getTotalQuantity1(): number {
    let total = 0;

    for (const input of this.generatedInputs) {
      const quantity = this.updateInstockForm.get(input + 'quantity')?.value;
      if (quantity) {
        total += parseInt(quantity, 10);
      }
    }
    this.totalQuantity1 = total;
    return total;

  }
  getAllInputValues1(): string[] {
    return this.generatedInputs.map(input => this.getInputValue1(input));
  }
  updateInstockchange(){
    this.subcontainer2_content[1]=true;
    const formData = new FormData();
    const position = localStorage.getItem('position')
    const company: any = localStorage.getItem('company')

    if(position =='administrator'){
      const location : any = this.updateInstockForm.value.updateInstockForm_location
      formData.append('location',location)
      formData.append('position',position)

    }else if (position =='moderator'){
      formData.append('position',position)
      formData.append('location',company)
    }
    fetch('http://localhost:8080/IMS/src/backend/changingAddDashboard.php', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(value => {

        this.categoryData = []
        for (let i = 0; i < value.result1.length; i++) {
          this.categoryValue = value.result1[i];
          this. categoryData[i] = {
            categoryName:   this.categoryValue ,

          };
        }
        this.projectData = []
        for (let i = 0; i < value.result2.length; i++) {
          this.projectValue = value.result2[i];
          this.projectData[i] = {
            projectName: this.projectValue ,
          };
        }

      });
 }
 addInstockchange(){
    this.subcontainer2_content[1]=true;
    const formData = new FormData();
    const position = localStorage.getItem('position')
    const company: any = localStorage.getItem('company')

    if(position =='administrator'){
      const location : any = this.addInstockForm.value.addInstockForm_location
      formData.append('location',location)
      formData.append('position',position)

    }else if (position =='moderator'){
      formData.append('position',position)
      formData.append('location',company)
    }

    fetch('http://localhost:8080/IMS/src/backend/changingAddDashboard.php', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(value => {

        this.categoryData = []
        for (let i = 0; i < value.result1.length; i++) {
          this.categoryValue = value.result1[i];
          this. categoryData[i] = {
            categoryName:   this.categoryValue ,

          };
        }
        this.projectData = []
        for (let i = 0; i < value.result2.length; i++) {
          this.projectValue = value.result2[i];
          this.projectData[i] = {
            projectName: this.projectValue ,
          };
        }

      });
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




  // Method to fetch defective data based on the selected location
  toggleCodeContent1(): void {
    this.showCodeContent1 = true;
    this.showCodeContent2 = false;
    this.showCodeContent3 = false;
  }

  toggleCodeContent2(): void {
    this.showCodeContent1 = false;
    this.showCodeContent2 = true;
    this.showCodeContent3 = false;

  }

  toggleCodeContent3(): void {
    this.showCodeContent1 = false;
    this.showCodeContent2 = false;
    this.showCodeContent3 = true;
  }

  toggleCodeContent(contentId: string): void {
    this.activeContent=contentId;
    const formData = new FormData();
   fetch('http://localhost:8080/IMS/src/backend/location.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(value => {
            this.locationData = []
            for (let i = 0; i < value.count; i++) {

              this.locationValue = value.result5[i];
              this.locationData[i] = {
                locationName:  this.locationValue
              };
            }

  });
  const position = localStorage.getItem('position')
    if (contentId === 'content1') {
      this.toggleCodeContent1();
    } else if (contentId === 'content2') {
      this.toggleCodeContent2();
    }
    else if (contentId === 'content3') {
      this.toggleCodeContent3();
    }
  }
  toggleCodeContentmema1(): void {
    const position = localStorage.getItem('position')
    if (position=='administrator'){
      this.container1 = true;
      this.container2 = false;
    }else if(position =='moderator'){
      alert('ACCESS DENIED')
    }
  }

  toggleCodeContentmema2(): void {
    this.container1 = false;
    this.container2 = true;
  }
  toggleCodeContentmema(contentId: string): void {
    this.activeContent = contentId;
    const formData = new FormData();
   fetch('http://localhost:8080/IMS/src/backend/location.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(value => {
            this.locationData = []
            for (let i = 0; i < value.count; i++) {

              this.locationValue = value.result5[i];
              this.locationData[i] = {
                locationName:  this.locationValue
              };
            }

  });
  const position = localStorage.getItem('position')
    if (contentId === 'content1') {
      this.toggleCodeContentmema1();
    } else if (contentId === 'content2') {
      this.toggleCodeContentmema2();
    }

  }

  // DONE FUNCTIONS FOR RESPONSIVE AND BACKEND
  //FOR ADD DASHBOARD INSIDE PROPERTY
  onFormChangeAddDashboard(): void {
    const value = localStorage.getItem('value');
    const position = localStorage.getItem('position');
      if(value=='Defective Products'){
        this.subcontainer2_content[1]=true;
        const formData = new FormData();
        const value: any = localStorage.getItem('value');
        if (position =='administrator'){
          const location : any = this.defectiveForm.value.defectiveForm_location
          formData.append('location',location)
          formData.append('value',value)
        } else if (position =='moderator'){
          const company: any = localStorage.getItem('company');
          formData.append('location',company)
          formData.append('value',value)
        }
        fetch('http://localhost:8080/IMS/src/backend/formViewlistAdd.php', {
          method: 'POST',
          body: formData
        })
          .then(response => response.json())
          .then(value => {


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

        if (position =='administrator'){
          const location : any = this.personelForm.value.personelForm_location
          formData.append('location',location)
          formData.append('value',value)
        } else if (position =='moderator'){
          const company: any = localStorage.getItem('company');
          formData.append('location',company)
          formData.append('value',value)

        }
        fetch('http://localhost:8080/IMS/src/backend/formViewlistAdd.php', {
          method: 'POST',
          body: formData
        })
          .then(response => response.json())
          .then(value => {

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

        if (position =='administrator'){
          const location : any = this.categoryForm.value.categoryForm_location
          formData.append('location',location)
          formData.append('value',value)
        } else if (position =='moderator'){
          const company: any = localStorage.getItem('company');
          formData.append('location',company)
          formData.append('value',value)
        }


        fetch('http://localhost:8080/IMS/src/backend/formViewlistAdd.php', {
          method: 'POST',
          body: formData
        })
          .then(response => response.json())
          .then(value => {


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
        if (position =='administrator'){
          const location : any = this.projectForm.value.projectForm_location
          formData.append('location',location)
          formData.append('value',value)
        } else if (position =='moderator'){
          const company: any = localStorage.getItem('company');
          formData.append('location',company)
          formData.append('value',value)
        }

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

        fetch('http://localhost:8080/IMS/src/backend/formViewlistDelete.php', {
          method: 'POST',
          body: formData
        })
          .then(response => response.json())
          .then(value => {


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

        fetch('http://localhost:8080/IMS/src/backend/formViewlistDelete.php', {
          method: 'POST',
          body: formData
        })
          .then(response => response.json())
          .then(value => {

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

        fetch('http://localhost:8080/IMS/src/backend/formViewlistDelete.php', {
          method: 'POST',
          body: formData
        })
          .then(response => response.json())
          .then(value => {


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
      else if(value=='Others'){
        const position = localStorage.getItem('position')

        this.subcontainer2_content[2]=false;
        this.subcontainer2_content[1]=false;
        this.subcontainer2_content[3]=false;
        this.subcontainer2_content[6]=true;
        this.subcontainer2_content[4]=false;
        this.subcontainer2_content[5]=false;

        const formData = new FormData();
        const value: any = localStorage.getItem('value');
        const location : any = this.projectForm.value.projectForm_location
        formData.append('location',location)
        formData.append('value',value)

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
    this.myForm.value.myForm_information === 'Others' ? 'otherForm' :
    null;

    this.selectedDetail = this.myForm.get('myForm_information')?.value;
    localStorage.setItem('value',this.selectedDetail)
   if(this.myForm.value.myForm_information=='Defective Products'){
      this.subcontainer2_content[1]=true;
      this.selectedDetail = this.myForm.get('myForm_information').value;
    }
    else if(this.myForm.value.myForm_information=='Personel'){
      this.subcontainer2_content[2]=true;
      this.subcontainer2_content[1]=false;
      this.selectedDetail = this.myForm.get('myForm_information').value;
    }
    else if(this.myForm.value.myForm_information=='Category'){
      this.subcontainer2_content[2]=false;
      this.subcontainer2_content[1]=false;
      this.subcontainer2_content[3]=true;
      this.selectedDetail = this.myForm.get('myForm_information').value;
    }
    else if(this.myForm.value.myForm_information=='Location'){
      const position = localStorage.getItem('position');
      if(position == 'moderator'){
        alert('ACCESS DENIED')
      }else{
        this.subcontainer2_content[2]=false;
        this.subcontainer2_content[1]=false;
        this.subcontainer2_content[3]=false;
        this.subcontainer2_content[4]=true;
        this.selectedDetail = this.myForm.get('myForm_information').value;
      }
    }
    else if(this.myForm.value.myForm_information=='Project'){
      this.subcontainer2_content[2]=false;
      this.subcontainer2_content[1]=false;
      this.subcontainer2_content[3]=false;
      this.subcontainer2_content[5]=true;
      this.subcontainer2_content[4]=false;
      this.selectedDetail = this.myForm.get('myForm_information').value;
    }
    else if(this.myForm.value.myForm_information=='Others'){
      const position = localStorage.getItem('position');
      if(position == 'moderator'){
        alert('ACCESS DENIED')
      }else{
        this.selectedDetail = this.myForm.get('myForm_information').value;
      this.subcontainer2_content[2]=false;
      this.subcontainer2_content[1]=false;
      this.subcontainer2_content[3]=false;
      this.subcontainer2_content[5]=false;
      this.subcontainer2_content[4]=false;
      this.subcontainer2_content[6]=true;

      }
    }
    this.isHidden = false;
  }

  //FOR DELETE DASHBOARD SUBMIT BUTTON

  AddDashboardSubmit(){
    const value = localStorage.getItem('value')
    const company: any = localStorage.getItem('company')
    const position: any = localStorage.getItem('position')
    if(value=='Defective Products'){
      const formData = new FormData();

      if (position =='administrator'){
        formData.append('property',value)
        formData.append('position',position)
        formData.append('company',company)
        formData.append('defectiveForm_name',this.defectiveForm.value.defectiveForm_name)
        formData.append('defectiveForm_location',this.defectiveForm.value.defectiveForm_location)
        formData.append('defectiveForm_quantity',this.defectiveForm.value.defectiveForm_quantity)
        formData.append('defectiveForm_specific',this.defectiveForm.value.defectiveForm_specific)
      } else if (position =='moderator'){
        const company: any = localStorage.getItem('company')
        formData.append('property',value)
        formData.append('position',position)
        formData.append('company',company.toUpperCase())
        formData.append('defectiveForm_name',this.defectiveForm.value.defectiveForm_name)
        formData.append('defectiveForm_quantity',this.defectiveForm.value.defectiveForm_quantity)
        formData.append('defectiveForm_specific',this.defectiveForm.value.defectiveForm_specific)
      }
      fetch('http://localhost:8080/IMS/src/backend/addDashboard.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(value => {
        alert(value.data)
        this.updateFormDisplay()
       });
    }
    else if(value=='Personel'){
      const formData = new FormData();

      if (position =='administrator'){
        formData.append('property',value)
        formData.append('position',position)
        formData.append('personelForm_name',this.personelForm.value.personelForm_name)
        formData.append('personelForm_location',this.personelForm.value.personelForm_location)
        formData.append('personelForm_position',this.personelForm.value.personelForm_position)

      } else if (position =='moderator'){
        const company: any = localStorage.getItem('company')
        formData.append('property',value)
        formData.append('position',position)
        formData.append('personelForm_name',this.personelForm.value.personelForm_name)
        formData.append('personelForm_location',company.toUpperCase())
        formData.append('personelForm_position',this.personelForm.value.personelForm_position)
      }

      fetch('http://localhost:8080/IMS/src/backend/addDashboard.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(value => {
        alert(value.data)
        this.updateFormDisplay()

       });
    }
    else if(value=='Category'){
      const formData = new FormData();
      if (position =='administrator'){
        formData.append('property',value)
        formData.append('position',position)
        formData.append('categoryForm_name',this.categoryForm.value.categoryForm_name)
        formData.append('categoryForm_location',this.categoryForm.value.categoryForm_location)

      } else if (position =='moderator'){
        const company: any = localStorage.getItem('company')
        formData.append('property',value)
        formData.append('position',position)
        formData.append('categoryForm_name',this.categoryForm.value.categoryForm_name)
        formData.append('categoryForm_location',company.toUpperCase())
      }
      fetch('http://localhost:8080/IMS/src/backend/addDashboard.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(value => {
        alert(value.data)
        this.updateFormDisplay()
       });
    }
    else if(value=='Location'){
      const formData = new FormData();

      formData.append('property',value)
      formData.append('position',position)
      formData.append('locationForm_acronym',this.locationForm.value.locationForm_acronym)
      formData.append('locationForm_name',this.locationForm.value.locationForm_name)
      formData.append('locationForm_floor',this.locationForm.value.locationForm_floor)

      fetch('http://localhost:8080/IMS/src/backend/addDashboard.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(value => {
        alert(value.data)
        this.updateFormDisplay()
       });
    }
    else if(value=='Project'){
      const formData = new FormData();
      if (position =='administrator'){
        formData.append('property',value)
        formData.append('position',position)
        formData.append('projectForm_name',this.projectForm.value.projectForm_name)
        formData.append('projectForm_location',this.projectForm.value.projectForm_location)
      } else if (position =='moderator'){
        const company: any = localStorage.getItem('company')
        formData.append('property',value)
        formData.append('position',position)
        formData.append('projectForm_name',this.projectForm.value.projectForm_name)
        formData.append('projectForm_location',company.toUpperCase())
      }
      fetch('http://localhost:8080/IMS/src/backend/addDashboard.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(value => {
        alert(value.data)
        this.updateFormDisplay()
       });
    }
    else if(value=='Others'){
      const formData = new FormData();
      formData.append('property',value)
      formData.append('position',position)
      formData.append('company',company)
      formData.append('otherForm_name',this.otherForm.value.otherForm_name)
      fetch('http://localhost:8080/IMS/src/backend/addDashboard.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(value => {
        alert(value.data)
        this.updateFormDisplay()
       });
    }
  }
  //FOR DELETE DASHBOARD SUBMIT BUTTON

  DeleteDashboardSubmit(){
    const value = localStorage.getItem('value')
    const position:any = localStorage.getItem('position')
    if(value=='Defective Products'){
      const formData = new FormData();
      if (position =='administrator'){
        formData.append('property',value)
        formData.append('defectiveForm_itemcode',this.defectiveForm.value.defectiveForm_itemcode)
        formData.append('defectiveForm_location',this.defectiveForm.value.defectiveForm_location)
        formData.append('defectiveForm_quantity',this.defectiveForm.value.defectiveForm_quantity)

      } else if (position =='moderator'){
        const company: any = localStorage.getItem('company')
        formData.append('property',value)
        formData.append('defectiveForm_itemcode',this.defectiveForm.value.defectiveForm_itemcode)
        formData.append('defectiveForm_location',company.toUpperCase())
        formData.append('defectiveForm_quantity',this.defectiveForm.value.defectiveForm_quantity)
      }

      formData.append('position',position)
      fetch('http://localhost:8080/IMS/src/backend/deleteDashboard.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(value => {
        alert(value.data)
        this.updateFormDisplay()
       });
    }
    else if(value=='Personel'){
      const formData = new FormData();
      if (position =='administrator'){
        formData.append('property',value)
        formData.append('personelForm_name',this.personelForm.value.personelForm_name)
        formData.append('personelForm_location',this.personelForm.value.personelForm_location)
      } else if (position =='moderator'){
        const company: any = localStorage.getItem('company')
        formData.append('property',value)
        formData.append('personelForm_name',this.personelForm.value.personelForm_name)
        formData.append('personelForm_location',company)
      }
      formData.append('position',position)
      fetch('http://localhost:8080/IMS/src/backend/deleteDashboard.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(value => {
        alert(value.data)
        this.updateFormDisplay()
       });
    }
    else if(value=='Category'){
      const formData = new FormData();
      if (position =='administrator'){
        formData.append('property',value)
        formData.append('categoryForm_name',this.categoryForm.value.categoryForm_name)
        formData.append('categoryForm_location',this.categoryForm.value.categoryForm_location)

      } else if (position =='moderator'){
        const company: any = localStorage.getItem('company')
        formData.append('property',value)
        formData.append('categoryForm_name',this.categoryForm.value.categoryForm_name)
        formData.append('categoryForm_location',company.toUpperCase())
      }

      formData.append('position',position)
      fetch('http://localhost:8080/IMS/src/backend/deleteDashboard.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(value => {
        alert(value.data)
        this.updateFormDisplay()
       });
    }
    else if(value=='Project'){
      const formData = new FormData();
      if (position =='administrator'){
        formData.append('property',value)
        formData.append('projectForm_name',this.projectForm.value.projectForm_name)
        formData.append('projectForm_location',this.projectForm.value.projectForm_location)

      } else if (position =='moderator'){
        const company: any = localStorage.getItem('company')
        formData.append('property',value)
        formData.append('projectForm_name',this.projectForm.value.projectForm_name)
        formData.append('projectForm_location',company.toUpperCase())
      }

      formData.append('position',position)
      fetch('http://localhost:8080/IMS/src/backend/deleteDashboard.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(value => {

        alert(value.data)
        this.updateFormDisplay()
       });
    }
    else if(value=='Others'){
      const formData = new FormData();
      formData.append('property',value)
      formData.append('position',position)
      formData.append('otherForm_name',this.otherForm.value.otherForm_name)
      fetch('http://localhost:8080/IMS/src/backend/deleteDashboard.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(value => {
        alert(value.data)
        this.updateFormDisplay()
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

            this.updateFormDisplay()
          });
      });
  }
  updateFormDisplay() {
    const popupFormContainers = document.getElementsByClassName('popupFormContainer') as HTMLCollectionOf<HTMLElement>;
    let isFormVisible = false;
    if (isFormVisible) {
      for (let i = 0; i < popupFormContainers.length; i++) {
        popupFormContainers[i].style.display = 'block'; // Show the form
      }
    } else {
      for (let i = 0; i < popupFormContainers.length; i++) {
        popupFormContainers[i].style.display = 'none'; // Hide the form
      }
    }
  }
  //USED FOR ANY POP UP FEATURES

  popupactivation(){
    this.activeContent = 'content1';
    const openFormButton = document.getElementById('openFormButton') as HTMLInputElement;
    const popupFormContainer = document.getElementById('popupFormContainer') as HTMLInputElement;
    const closeButton1 = document.querySelector('.closeButton') as HTMLInputElement;

    const position = localStorage.getItem('position')
    if (position == 'administrator' || position == 'moderator'){
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
}else if(position == 'user' || position == 'moderator'){
  alert('ACCESS DENIED!')
}
  }

  //USED FOR ANY POP UP FEATURES

  popupactivation1(){
    const openFormButton = document.getElementById('openFormButton1') as HTMLInputElement;
    const popupFormContainer = document.getElementById('popupFormContainer1') as HTMLInputElement;
    const closeButton1 = document.querySelector('.closeButton1') as HTMLInputElement;
    const position = localStorage.getItem('position')
    if (position == 'administrator' || position == 'moderator'){
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
}else if(position == 'user' ){
  alert('ACCESS DENIED!')
}
  }

   //USED FOR ANY POP UP FEATURES

   popupactivation2(){
    const openFormButton = document.getElementById('openFormButton2') as HTMLInputElement;
    const popupFormContainer = document.getElementById('popupFormContainer2') as HTMLInputElement;
    const closeButton = document.querySelector('.closeButton2') as HTMLInputElement;
    const position = localStorage.getItem('position')
    if (position == 'administrator' || position == 'moderator'){
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
      const myForm = document.getElementById('myForm') as HTMLInputElement;
      myForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission
        // Here, you can perform further actions like sending the form data to a server

  });
}else if(position == 'user' ){
  alert('ACCESS DENIED!')
}
  }
  popupactivation5() {
    const openFormButton = document.getElementById('openFormButton5') as HTMLImageElement;
    const popupFormContainer = document.getElementById('popupFormContainer5') as HTMLDivElement;
    const closeButton = document.querySelector('.closeButton5') as HTMLSpanElement;
    const position = localStorage.getItem('position');

    if (position === 'administrator') {
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

      const myForm = document.getElementById('myForm1') as HTMLFormElement;
      myForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission
        // Here, you can perform further actions like sending the form data to a server
      });
    } else if (position === 'user' || position === 'moderator') {
      alert('ACCESS DENIED!');
    }
  }
  popupactivation4(){

    const openFormButton = document.getElementById('openFormButton4') as HTMLInputElement;
    const popupFormContainer = document.getElementById('popupFormContainer4') as HTMLInputElement;
    const closeButton = document.querySelector('.closeButton4') as HTMLInputElement;
    const position = localStorage.getItem('position')
    if (position == 'administrator' ){
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
      const myForm = document.getElementById('myForm') as HTMLInputElement;
      myForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission
        // Here, you can perform further actions like sending the form data to a server

  });
    }else if(position == 'user' || position == 'moderator'){
      alert('ACCESS DENIED!')
    }

  }
   //USED FOR ANY POP UP FEATURES

   popupactivation3(){
    const openFormButton = document.getElementById('openFormButton3') as HTMLInputElement;
    const popupFormContainer = document.getElementById('popupFormContainer3') as HTMLInputElement;
    const closeButton = document.querySelector('.closeButton3') as HTMLInputElement;
    const position = localStorage.getItem('position')
    if (position == 'administrator' || position == 'moderator'){
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
      const myForm = document.getElementById('myForm') as HTMLInputElement;
      myForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission
        // Here, you can perform further actions like sending the form data to a server

  });
    }else if(position == 'user' ){
      alert('ACCESS DENIED!')
    }

  }
  toggleContent1(): void {
    this.showContent1 = true;
    this.showContent2 = false;
    this.showContent3 = false;
  }
  handleImageLinkClick(imageUrl: string) {
    if (imageUrl === 'N/A') {
      alert('Image is not available');
    } else {
      window.open(imageUrl, '_blank');
    }
  }
  handleParLinkClick(par: string) {
    if (par === 'N/A') {
      alert('Image is not available');
    } else {
      window.open(par, '_blank');
    }
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
    this.activeContent = contentId;
    if (contentId === 'content1') {
      this.toggleContent1();
      this.refreshDashboard();
    } else if (contentId === 'content2') {

      this.toggleContent2();
      const formData = new FormData();
      const position : any = localStorage.getItem('position')
      const company : any = localStorage.getItem('company')
      formData.append('company',company.toUpperCase())
      formData.append('position',position)
      fetch('http://localhost:8080/IMS/src/backend/itemlist.php', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(value => {
      const company = localStorage.getItem('company')
      for (let i = 0; i < value.data.length; i++) {
        const codeValue = value.data[i].itemid_company !== '' ? value.data[i].itemid_company : 'N/A';
        const serial= value.data[i].Serial !== '' ? value.data[i].Serial : 'N/A';
        const property= value.data[i].Property !== '' ? value.data[i].Property : 'N/A';
        const productValue = value.data[i].item_name !== '' ? value.data[i].item_name  : 'N/A';
        const quantityValue = value.data[i].quantity !== '' ? value.data[i].quantity : 'N/A';
        const specificValue = value.data[i].specificlocation !== '' ? value.data[i].specificlocation: 'N/A';
        const categoryValue = value.data[i].category !== '' ? value.data[i].category : 'N/A';
        const locationValue = value.data[i].location !== '' ? value.data[i].location : 'N/A';
        const projectValue = value.data[i].project !== '' ? value.data[i].project : 'N/A';
        const conditionValue = value.data[i].condition !== '' ? value.data[i].condition : 'N/A';
        const image = value.data[i].image !== '' ? value.data[i].image : 'N/A';
        const par = value.data[i].par !== '' ? value.data[i].par : 'N/A';


        this.tableData[i] = {
          itemid: locationValue + '-' +codeValue,
          code:  codeValue ,
          serial:serial,
          property:property,
          productname: productValue,
          quantity: quantityValue,
          specific: specificValue,
          category: categoryValue,
          location: locationValue,
          project: projectValue,
          condition: conditionValue,
          image: image,
          par: par,
        };
   // Access and log the "code" property
      }

     });


    }
    else if (contentId === 'content3') {
      this.toggleContent3();
    }
  }

}



