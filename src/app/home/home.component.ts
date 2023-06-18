import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'IMS';
  accounts: any = FormGroup;
  constructor(private router: Router, private fb: FormBuilder) {}
  ngOnInit(): void{
    this.accounts = this.fb.group({
      email:['',Validators.compose([Validators.required,Validators.email])],
      password:['',Validators.required]
    });

  }
submit(){
  const formData = new FormData();
  formData.append('email',this.accounts.value.email)
  formData.append('password',this.accounts.value.password)
  fetch('http://localhost/IMS/src/Backend/login.php', {
  method: 'POST',
  body: formData
})
.then(response => response.json())
.then(value => {
  if(value.data=='admin'){
    this.router.navigate(['admin']);
  }else(value.data=='user'){
    this.router.navigate(['user']);
  }

  console.log(value);
});}
}
