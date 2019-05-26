
import { inject, Aurelia } from 'aurelia-framework';
import { Pois, User } from './types';
import { HttpClient } from 'aurelia-http-client';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';

@inject(HttpClient, EventAggregator, Aurelia, Router)
export class PoiService {
  users: Map<string, User> = new Map();
  usersById: Map<string, User> = new Map();
  pois: Pois[] = [];
  // admissionFee = ['Yes', 'No', 'Voluntary'];

  constructor(private httpClient: HttpClient, private ea: EventAggregator, private au: Aurelia, private router: Router) {
    httpClient.configure(http => {
      // http.withBaseUrl('http://localhost:3000');
      http.withBaseUrl('https://juberjj-poi-assignment2.glitch.me');
    });
    this.getPois();
    this.getUsers();
  }
  async getPois() {
    const response = await this.httpClient.get('/api/pois');
    this.pois = await response.content;
    console.log (this.pois);
  }

  // async getPois() {
  //   const response = await this.httpClient.get('/api/pois');
  //   const rawPois: RawPois[] = await response.content;
  //   rawPois.forEach(rawPois => {
  //     const poi = {
  //       attractionType: rawPois.attractionType,
  //       attractionName: rawPois.attractionName,
  //       attractionDesc: rawPois.attractionDesc,
  //       admissionFee: rawPois.admissionFee,
  //       location: rawPois.location,
  //       poier: this.usersById.get(rawPois.poier)
  //     };
  //     this.pois.push(poi);
  //   })
  //   console.log (this.pois);
  // }

  async getUsers() {
    const response = await this.httpClient.get('/api/users');
    const users = await response.content;
    users.forEach(user => {
      this.users.set(user.email, user);
      this.usersById.set(user._id, user);
    });
  }

  async poi(category: string, name: string, description: string, address: string, openingHours: string, phone: string) {
    const poi = {
      category:category,
      name:name,
      description:description,
      address:address,
      openingHours:openingHours,
      phone:phone
    };
    this.pois.push(poi);
    console.log(this.pois);
  }

  async signup(firstName: string, lastName: string, email: string, password: string) {
    const user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    };
    const response = await this.httpClient.post('/api/users', user);
    const newUser = await response.content;
    this.users.set(newUser.email, newUser);
    this.usersById.set(newUser._id, newUser);
    this.changeRouter(PLATFORM.moduleName('app'))
    return false;
  }

  async login(email: string, password: string) {
    const response = await this.httpClient.post('/api/users/authenticate', {
      email: email,
      password: password
    });
    const status = await response.content;
    if (status.success) {
      this.httpClient.configure(configuration => {
        configuration.withHeader('Authorization', 'bearer ' + status.token);
      });
      localStorage.poi = JSON.stringify(response.content);
      await this.getPois();
      this.changeRouter(PLATFORM.moduleName('app'));
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.poi = null;
    this.httpClient.configure(configuration => {
      configuration.withHeader('Authorization', '');
    });
    this.changeRouter(PLATFORM.moduleName('start'));
  }

  changeRouter(module:string) {
    this.router.navigate('/', { replace: true, trigger: false });
    this.router.reset();
    this.au.setRoot(PLATFORM.moduleName(module));
  }

}

export interface RawPois {
  attractionType: string;
  attractionName: string;
  attractionDesc: string;
  admissionFee: string;
  location: Location;
  poier: string;
}
