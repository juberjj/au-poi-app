import { inject } from 'aurelia-framework';
import { PoiService } from '../services/services';

@inject(PoiService)
export class Signup {
  firstName = 'Homer';
  lastName = 'Simpson';
  email = 'homer@simpson.com';
  password = 'secret';
  prompt = '';

  constructor(private ds: PoiService) {}

  signup(e) {
    console.log(`Trying to sign up ${this.email}`);
    const success = this.ds.signup(this.firstName, this.lastName, this.email, this.password);
    if (!success) {
      this.prompt = 'Oops! Try again...';
    }
  }
}