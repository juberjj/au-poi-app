// export interface Location {
//     lat: number;
//     lng: number;
//   }
  
  // export interface Pois {
  //   attractionType: string;
  //   attractionName: string;
  //   attractionDesc: string;
  //   admissionFee: string;
  //   location: Location;
  // }
  export interface Pois {
    category: string;
    name: string;
    description: string;
    address: string;
    openingHours: string;
    phone: string;
  }
  
  export interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    _id: string;
  }