import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Map, Marker} from 'mapbox-gl';

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styles: `
    div{
      width: 100%;
      height: 100px;
      margin: 0px;
      background-color: #f0f0f0;
    }
  `
})
export class MiniMapComponent implements AfterViewInit {

  @ViewChild('map') divMap?: ElementRef;

  @Input() lngLat?: [number, number] = [0, 0];

  zoom: number = 10;
  map?: Map;

  ngAfterViewInit(): void {
    if (!this.divMap?.nativeElement) throw ('divMap is required');
    if (!this.lngLat) throw ('lngLat is required');


    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
      interactive: false
    });

    new Marker()
      .setLngLat(this.lngLat)
      .addTo(this.map); 
  }
}
