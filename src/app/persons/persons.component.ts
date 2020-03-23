import { Component, OnInit, OnDestroy } from '@angular/core';
import { PersonsService } from './persons.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html'
})
export class PersonsComponent implements OnInit, OnDestroy {

  personList: string[];
  private personListSubs: Subscription;

  isFetching = false;


  constructor(
    private personsService: PersonsService
  ) {}

  ngOnInit() {
    this.isFetching = true;
    this.personListSubs = this.personsService.personChanged.subscribe(persons => {
      this.personList = persons;
      this.isFetching = false;
    })
    this.personsService.fetchPersons();
  }

  ngOnDestroy() {
    this.personListSubs.unsubscribe();
  }

  onRemovePerson(name: string) {
    this.personsService.removePerson(name);
  }

}
