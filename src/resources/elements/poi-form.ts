import { inject } from 'aurelia-framework';
import { bindable } from 'aurelia-framework';
import { Pois } from "../../services/types";
import { PoiService } from "../../services/services"

@inject(PoiService)
export class PoiForm {
  @bindable
  pois: Pois[] = [];
  
  category = '';
  name = '';
  description = '';
  address = '';
  openingHours = '';
  phone = '';
  // location = { lat: 53.2734, lng: -7.7783203 };

  constructor (private ds: PoiService) {}

  addPoi() {
    const poi = {
      category: this.category,
      name: this.name,
      description: this.description,
      address: this.address,
      openingHours: this.openingHours,
      phone: this.phone
    }
    this.pois.push(poi)
    console.log(this.pois);
  }
}