import { bindable } from 'aurelia-framework';
import {Pois} from "../../services/types";

export class PoiList {
  @bindable
  pois : Pois[];
}