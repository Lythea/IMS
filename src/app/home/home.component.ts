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
  constructor(private router: Router, private fb: FormBuilder) {}
  ngOnInit(): void{
    this.accounts = this.fb.group({
      name:['',Validators.required],
      email:['',Validators.compose([Validators.required,Validators.email])],
      password:['',Validators.required],
      position:['',Validators.required]
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
    if(value.data[0].position=='admin'){
      this.router.navigate(['admin']);
    }else if(value.data[0].position=='user'){
      this.router.navigate(['user']);
    }

    console.log(value);
  });}

  signup(){
    const formData = new FormData();
    formData.append('name',this.accounts.value.name)
    formData.append('email',this.accounts.value.email)
    formData.append('password',this.accounts.value.password)
    formData.append('position',this.accounts.value.position)
    fetch('http://localhost:8080/IMS/src/backend/verifyaccount.php', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(value => {
     if(value.data=='Not Found!'){
      fetch('http://localhost:8080/IMS/src/backend/signup.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(value => {
        if(value.data=='admin'){
          this.router.navigate(['admin']);
        }else if(value.data=='user'){
          this.router.navigate(['admin']);
        }
        this.showContent1 = true;
        this.showContent2 = false;
      });
     }else if(value.data[0].name!='' || value.data[0].email!=''){
      alert(value.data[0].name + ' already in used and ' + value.data[0].email + ' already registered')
     }
      
    });

  
}
}
