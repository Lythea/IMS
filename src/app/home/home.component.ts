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
      this.showContent1 = true;
      this.showContent2 = false;
    } else if (contentId === 'content2') {
      this.showContent1 = false;
      this.showContent2 = true;
    }
  }
  login(){
    const formData = new FormData();
    formData.append('email',this.accounts.value.email)
    formData.append('password',this.accounts.value.password)
    fetch('http://localhost:8080/IMS/src/backend/login.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(value => {
    const company = value.data[0].company.toLowerCase();
    const position = value.data[0].position.toLowerCase();
   
   
    localStorage.setItem('name',value.data[0].name)
    localStorage.setItem('position',position)
    localStorage.setItem('company',company)
   
    if(position=='admin' || position=='moderator'){
      localStorage.setItem('position',position)
      localStorage.setItem('company',company)
      this.router.navigate(['admin']);
    }else if(position=='user'){
      localStorage.setItem('position',position)
      this.router.navigate(['admin']);
    }
  });}

  signup(){
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
