import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administration-page',
  template: `
    <div class="name-header">
      Hi, Nickname
    </div>
    <div class="administration-movie">
      <h2>Add new movie</h2>
    </div>
    <div class="administration-schedule">
      <h2>Add new schedule</h2>
    </div>
  `,
  styleUrls: ['./administration-page.component.scss'],
})
export class AdministrationPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
