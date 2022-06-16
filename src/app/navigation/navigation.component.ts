import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  menuItems = [
    'Dashboard',
    'Ajouter Client',
    'Chercher Membre',
    'Ajouter Programme',
    'Chercher Programme',
    'Exercises',
    'Assigné Programme',
    'stock',
    'Parameters',
    'Log out',
  ];
  menuLinks = [
    'dashboard',
    'add',
    'find',
    'program',
    'findProgram',
    'exercise',
    'navProgram',
    'stock',
    'paramters',
    'logout',
  ];
  menu = [this.menuItems, this.menuLinks];
  pageName = 'Bienvenu sur Gym City';
  connected = [];
  setPageName(pagename) {
    this.pageName = pagename;
  }
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private socketService: SocketService
  ) {}
  ngOnInit(): void {
    this.socketService.getConnected().then((data) => {
      data.subscribe((data) => {
        this.connected = [];
        this.connected.push(data);
      });
    });
  }
}
