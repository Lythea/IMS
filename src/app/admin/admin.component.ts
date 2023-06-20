import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  myAngularxQrCode: any;
  showContent1 = false;
  showContent2 = true;
  qrValue: string = 'Hello, World!'; 
  showContent3 = false;
  name: any;
  profile: any;
  
  fileUrl: any;
  constructor(private sanitizer: DomSanitizer) {  }
  ngOnInit(): void{
    this.myAngularxQrCode = 'Name:Ron Iverson Del Mundo \n Age:20 \n Gender: Male \n School:BSU \n From: Talaga East';
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
  toggleContent(contentId: string): void {
    if (contentId === 'content1') {
      this.showContent1 = true;
      this.showContent2 = false;
      this.showContent3 = false;
    } else if (contentId === 'content2') {
      this.showContent1 = false;
      this.showContent2 = true;
      this.showContent3 = false;
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
}
