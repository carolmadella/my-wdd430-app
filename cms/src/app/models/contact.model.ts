export class Contact {
  _id: string = '';
  
    constructor(
      public id: string,
      public name: string,
      public email: string,
      public phone: string,
      public imageUrl: string,
      // Only for group contacts; otherwise use null
      public group: Contact[] | null = null
    ) {}
  }