import { inject } from 'aurelia-framework';
import { Pois } from "../services/types";
import { PoiService } from "../services/services";

@inject(PoiService)
export class Poi {
  pois: Pois[];
  admissionFee: string[];

  constructor(private ds: PoiService) {
    this.pois = ds.pois;
    //this.admissionFee = ds.admissionFee;
  }

}
