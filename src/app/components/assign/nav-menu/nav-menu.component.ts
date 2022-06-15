import { Component, OnInit } from '@angular/core';
import { UpdateProgramComponent } from '../update-program/update-program.component';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
})
export class NavMenuComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    UpdateProgramComponent;
  }
}
