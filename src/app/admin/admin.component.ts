import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
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
}
