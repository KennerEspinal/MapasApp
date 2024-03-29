import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';

@Component({
  templateUrl: './full-screen-page.component.html',
  styles: `
    div {
      width: 100vw;
      height: 100vh;
    }
  `
})
export class FullScreenPageComponent implements AfterViewInit {

  @ViewChild('map') divMap?: ElementRef;

  lngLat: LngLat = new LngLat(-73.25322, 10.46314);


  constructor() { }


  ngAfterViewInit(): void {
    if (!this.divMap) return;

    const map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 8, // starting zoom
    });
  }

}
