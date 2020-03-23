import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonsService {
  personChanged = new Subject<string[]>();
  persons: string[];

  constructor(
    private http: HttpClient
  ) {}

  fetchPersons() {
    const url = 'https://swapi.co/api/people';
    this.http.get<any>(url)
      .pipe(map(resp => {
        return resp.results.map(character => character.name);
      }))
      .subscribe(names => {
        this.persons = names;
        this.personChanged.next(this.persons);
      });
  }

  addPerson(name: string) {
    this.persons.push(name);
    this.personChanged.next(this.persons);
  }

  removePerson(name: string) {
    this.persons = this.persons.filter(personName => personName != name);
    this.personChanged.next(this.persons);
  }
}
