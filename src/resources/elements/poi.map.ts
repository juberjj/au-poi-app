import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { LeafletMap } from '../../services/leaflet-map';

export class PoiMap {
  mapId = 'poi-map';
  mapHeight = 300;
  map: LeafletMap;

  constructor(private ea: EventAggregator) {}

  attached() {
    const mapConfig = {
      location: { lat: 52.2593, lng: -7.7783203 },
      zoom: 9,
      minZoom: 7
    };
    this.map = new LeafletMap(this.mapId, mapConfig, 'Terrain');
  }
}