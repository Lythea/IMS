import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  showContent1 = false;
  showContent2 = true;

  showContent3 = false;
  name: any;
  profile: any;
  ngOnInit(): void{
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
}
