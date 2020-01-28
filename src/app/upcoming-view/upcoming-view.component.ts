import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upcoming-view',
  templateUrl: './upcoming-view.component.html',
  styleUrls: ['./upcoming-view.component.css']
})
export class UpcomingViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  view() {
    console.log('click');
  }
}
