interface IMezzo {
  type: string; // 'bici' | 'scooter' | 'monopatino';
  id: number; 
  state: string; // 'disponibile' | 'in uso';
  assegnaUtente(utente: IUtente): void
}

interface IUtente {
  name: string;
  surname: string;
  email: string;
  paymentMethod: string;
  prenotaMezzo(mezzo: IMezzo): void
}

interface ICitta {
  cityName: string;
  mezziDisponibili: IMezzo[];
  aggiungiMezzo(mezzo: IMezzo): void;
}

class Mezzo implements IMezzo {
  type: string;
  id: number;
  state: string;
  constructor(type: string, id: number, state: string) {
    this.type = type;
    this.id = id;
    this.state = state;
  }
  assegnaUtente(utente: IUtente): void {
   if (this.state === "disponibile") {
      this.state = "in uso";
      console.log(`Mezzo ${this.id} assegnato a ${utente.name}`);
    }
    else {
      console.log(`Mezzo ${this.id} non disponibile`);
    }
  }
}

class Utente implements IUtente {
  name: string;
  surname: string;
  email: string;
  paymentMethod: string;
  constructor(name: string, surname: string, email: string, paymentMethod: string) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.paymentMethod = paymentMethod;
  }
  prenotaMezzo(mezzo: IMezzo): void {
    if (mezzo.state === "disponibile") {
      mezzo.assegnaUtente(this);
    }
    else {
      console.log(`Mezzo ${mezzo.id} non disponibile`);
    }
  }
}

class Citta implements ICitta {
  cityName: string;
  mezziDisponibili: IMezzo[];
  constructor(cityName: string) {
    this.cityName = cityName;
    this.mezziDisponibili = [];
  }
  aggiungiMezzo(mezzo: IMezzo): void {
    if (mezzo.state === "disponibile") {
      this.mezziDisponibili.push(mezzo);
    }
    else {
      console.log(`Mezzo ${mezzo.id} non disponibile`);
    }
  }
}

//instanze mezzi, utenti e città
const citta1 = new Citta("Milano");
const citta2 = new Citta("Roma");
const citta3 = new Citta("Torino");
const bici1 = new Mezzo("bici", 4, "disponibile");
const bici2 = new Mezzo("bici", 5, "in uso");
const bici3 = new Mezzo("bici", 6, "disponibile");
const scooter1 = new Mezzo("scooter", 2, "disponibile");
const scooter2 = new Mezzo("scooter", 7, "in uso");
const scooter3 = new Mezzo("scooter", 8, "disponibile");
const monopatino1 = new Mezzo("monopatino", 3, "disponibile");
const monopatino2 = new Mezzo("monopatino", 9, "in uso");
const monopatino3 = new Mezzo("monopatino", 10, "disponibile");
const utente1 = new Utente("Mario", "Rossi", "mario.rossi@me.com", "credito");
const utente2 = new Utente("Luca", "Bianchi", "luca.bianchi@me.com", "paypal"); 
const utente3 = new Utente("Giovanni", "Verdi", "giovanni.verdi@me.com", "credito");

// Prenotazione mezzi
utente1.prenotaMezzo(bici1);
utente2.prenotaMezzo(monopatino2);
utente3.prenotaMezzo(scooter1);

// Aggiunta mezzi alle città
citta1.aggiungiMezzo(bici1);
citta2.aggiungiMezzo(scooter2);
citta3.aggiungiMezzo(monopatino3);
citta1.aggiungiMezzo(bici2);
citta2.aggiungiMezzo(bici3);
citta3.aggiungiMezzo(scooter3);
citta1.aggiungiMezzo(scooter1);
citta2.aggiungiMezzo(monopatino1);
citta3.aggiungiMezzo(monopatino2);

// Stampa stato mezzi
console.log(`Stato mezzi in ${citta1.cityName}:`);
for (const mezzo of citta1.mezziDisponibili) {
  console.log(`Mezzo ${mezzo.id}: ${mezzo.state}`);
}
console.log(`Stato mezzi in ${citta2.cityName}:`);
for (const mezzo of citta2.mezziDisponibili) {
  console.log(`Mezzo ${mezzo.id}: ${mezzo.state}`);
}
console.log(`Stato mezzi in ${citta3.cityName}:`);
for (const mezzo of citta3.mezziDisponibili) {
  console.log(`Mezzo ${mezzo.id}: ${mezzo.state}`);
}

// Stampa stato mezzi prenotati
console.log(`Stato mezzi prenotati:`);
console.log(`Mezzo ${bici1.id}: ${bici1.state}`);
console.log(`Mezzo ${monopatino2.id}: ${monopatino2.state}`);
console.log(`Mezzo ${scooter1.id}: ${scooter1.state}`);