import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map, LngLat, Marker } from 'mapbox-gl';

interface MarkerColor {
  color: string;
  marker: Marker;
}

interface PlainMarker {
  color: string;
  lngLat: number[];
}

@Component({
  templateUrl: './markers-page.component.html',
  styles: `
    #map {
      width: 100vw;
      height: 100vh;
    }

    li {
      color: white;
    }

    .list-group {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 999;
      cursor: pointer;
      border-radius: 20px;
    }

    button{
      position: fixed;
      bottom: 50px;
      right: 50px;
    }
  `
})
export class MarkersPageComponent implements AfterViewInit {

  @ViewChild('map') divMap?: ElementRef;

  markers: MarkerColor[] = [];

  zoom: number = 14;
  map?: Map;
  lngLat: LngLat = new LngLat(-73.25322, 10.46314);

  constructor() { }

  ngAfterViewInit(): void {
    if (!this.divMap) return;

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.readFromLocalStorage();


    // const marker = new Marker({
    //   color: 'red',
    // })
    //   .setLngLat(this.lngLat)
    //   .addTo(this.map!);

  }


  createMarker() {
    if (!this.map) throw new Error('Map is not initialized');

    const color = '#xxxxxx'.replace(/x/g, y => (Math.random() * 16 | 0).toString(16));
    const lngLat = this.map.getCenter();

    this.addMarker(lngLat, color);
  }


  addMarker(lngLat: LngLat, color: string = 'blue') {
    if (!this.map) throw new Error('Map is not initialized');

    const marker = new Marker({
      color: color,
      draggable: true,
    }).setLngLat(lngLat)
      .addTo(this.map);

    this.markers.push({
      color,
      marker
    });
    this.saveToLocalStorage();

    marker.on('dragend', () => this.saveToLocalStorage());
  }

  removeMarker(i: number) {
    this.markers[i].marker.remove();
    this.markers.splice(i, 1);
    this.saveToLocalStorage();
  }

  flyTo(marker: Marker) {
    this.map?.flyTo({
      zoom: 16,
      center: marker.getLngLat()
    });
  }

  saveToLocalStorage() {
    const plainMarkers: PlainMarker[] = this.markers.map(({ color, marker }) => {
      return {
        color,
        lngLat: marker.getLngLat().toArray()
      }
    });

    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers));
  }

  readFromLocalStorage() {
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers: PlainMarker[] = JSON.parse(plainMarkersString);

    plainMarkers.forEach(({ color, lngLat }) => {
      const [lng, lat] = lngLat
      const coords = new LngLat(lng, lat);
      this.addMarker(coords, color);
    })
  }
}
