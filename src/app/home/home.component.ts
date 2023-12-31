import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  showContent1 = true;
  showContent2 = false;
  position: any;
  title = 'IMS';
  accounts: any = FormGroup;
  selectedOption: string = '';
  locationData: any = [];
  locationfullValue : any;
  projectLocation : any;
  floorValue : any;
  locationValue: any;
  number : any;
  constructor(private router: Router, private fb: FormBuilder) {}
  ngOnInit(): void{
    this.accounts = this.fb.group({
      name:['',Validators.required],
      email:['',Validators.compose([Validators.required,Validators.email])],
      password:['',Validators.required],
      position:['',Validators.required],
      location:['',Validators.required],
      company:['',Validators.required],
      code:['',Validators.required],
    });


  }

  toggleContent(contentId: string): void {
    if (contentId === 'content1') {

    } else if (contentId === 'content2') {
      alert('Contact the Administrator.')

      const formData = new FormData();

      /**
      fetch('backend/location.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(value => {

        // Accessing the data and populating this.accounts array
        this.locationData = [];
        for (let i = 0; i < value.count; i++) {
          const locationValue = value.result5[i];
          this.locationData[i] = {
            locationName: locationValue
          };
        }
      });
      */
    }
  }
  login(){
    const formData = new FormData();
    formData.append('email',this.accounts.value.email)
    formData.append('password',this.accounts.value.password)
    fetch('backend/login.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(value => {
    const company = value.data[0].company;
    const position = value.data[0].position;

    if(value.data=='Not Found!'){
      alert(value.data)
    }else {
      localStorage.setItem('name',value.data[0].name)
      localStorage.setItem('position',position)
      localStorage.setItem('company',company)
      this.router.navigate(['admin']);
    }

  });}

  signup(){
    const formData = new FormData();
    formData.append('name',this.accounts.value.name)
    formData.append('email',this.accounts.value.email)
    formData.append('password',this.accounts.value.password)
    formData.append('position',this.accounts.value.position)
    formData.append('company',this.accounts.value.company)
    formData.append('code',this.accounts.value.code)

    fetch('backend/verifyaccount.php', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(value => {
    if (value.data == 'No Data'){
      alert('Code is incorrect')
    }else if(value.data=='Not Found!'){
      fetch('backend/signup.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(value => {
        value.data.toLowerCase()

        this.showContent1 = true;
        this.showContent2 = false;
      });
     }else if(value.data[0].name!='' || value.data[0].email!=''){
      console.log(value.data)
      alert(value.data[0].name + ' already in used and ' + value.data[0].email + ' already registered')
     }

    });
}
}
