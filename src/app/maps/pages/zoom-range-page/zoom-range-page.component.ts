import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styles: `
    #map{
      width: 100vw;
      height: 100vh;
    }

    .floating-range {
      position: fixed;
      bottom: 50px;
      left: 50px;
      z-index: 999;
      width: 500px;
      background-color: white;
      border-radius: 15px;
      box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.2);
    }

    .floating-content {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
    }
  `
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('map') divMap?: ElementRef;

  zoom: number = 10;
  map?: Map;
  lngLat: LngLat = new LngLat(-73.25322, 10.46314);

  constructor() { }

  ngAfterViewInit(): void {
    if (!this.divMap) return;

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
    this.mapListener();
  }


  ngOnDestroy(): void {
    this.map?.remove();
  }

  mapListener(){
    if(!this.map) throw new Error('Map is not initialized');
    this.map.on('zoom', (ev) =>{
      this.zoom = this.map!.getZoom();
    });

    this.map.on('zoomend', (ev) =>{
      if(this.map!.getZoom() < 18) return;
      this.map!.zoomTo(18);
    });

    this.map.on('move', (ev) =>{
      this.lngLat = this.map!.getCenter();
    });


  }

  zoomIn(){
    this.map!.zoomIn();
  }

  zoomOut(){
    this.map!.zoomOut();
  }

  zoomChanged(value: string){
    this.map!.zoomTo(Number(value));
  }

}
