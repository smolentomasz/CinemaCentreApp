import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-options-page',
  template: `
    <div class="name-header">
      Hi, Nickname
    </div>
    <div class="options-edit">
      <h2>Edit your account</h2>
    </div>
    <div class="options-delete">
    <h2>Delete your account</h2>
    </div>
  `,
  styleUrls: ['./options-page.component.scss']
})
export class OptionsPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
