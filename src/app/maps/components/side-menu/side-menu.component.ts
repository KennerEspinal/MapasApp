import { Component } from '@angular/core';

interface MenuItem {
  name: string;
  route: string;
}

@Component({
  selector: 'maps-side-menu',
  templateUrl: './side-menu.component.html',
  styles: `
    li {
      cursor: pointer;
      transition: 0.3s all;
    }
  `
})
export class SideMenuComponent {

  menuItems: MenuItem[] = [
    { name: 'Full Screen', route: '/maps/fullscreen' },
    { name: 'Markers', route: '/maps/markers' },
    { name: 'Zoom Range', route: '/maps/zoom-range' },
    { name: 'Properties', route: '/maps/properties' },
  ];

}
