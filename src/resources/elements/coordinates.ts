import { bindable } from 'aurelia-framework';
import { Location } from '../../services/types';

export class Coordinates {
  @bindable 
  location: Location;
}