import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { AsyncPipe, I18nPluralPipe, I18nSelectPipe, JsonPipe, KeyValuePipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { interval, map, tap, timeout } from 'rxjs';

const client1 ={
  name: 'Roberto',
  gender: 'male',
  age: 39,
  address: 'Ottawa, Canada'
}

const client2 ={
  name: 'Alejandra',
  gender: 'female',
  age: 27,
  address: 'Toronto, Canada'
}

@Component({
  selector: 'app-uncommon-page',
  imports: [CardComponent, I18nSelectPipe, I18nPluralPipe, SlicePipe, JsonPipe, UpperCasePipe,KeyValuePipe, TitleCasePipe,AsyncPipe],
  templateUrl: './uncommon-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UncommonPageComponent {
  //i18n Select
  client = signal(client1);
  invitationMap ={
    male: 'invitarlo',
    female: 'invitarla'
  }

  changeClient(){
    if(this.client() === client1){
      this.client.set(client2)
      return;
    }

    this.client.set(client1);
  }

  //i18n Plural
  clientsMap = signal({
  '=0' : 'no tenemos ningun cliente esperando',
  '=1' : 'tenemos un cliente esperando',
  '=2' : 'tenemos dos clientes esperando',
  other: 'tenemos # clientes esperando'
  })

  clients = signal([
    'Roberto',
    'Pedro',
    'Alex',
    'Guillermo',
    'Alejandra',
    'Mia',
    'Noemi',
    'Shania'
  ])

  deleteClient(){
    this.clients.update((prev) => prev.slice(1));
  }

  //KeyValue Pipe
  profile = {
    name: 'Roberto',
    age: 22,
    address: 'Cancun, Quintana Roo'
  }

  //Async Pipe
  promiseValue: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(()=> {
      resolve('Tenemos data en la promesa')
      console.log('Promesa finalizada')
    }, 3500);
  })

  myObservableTimer = interval(2000).pipe(
    map((value) => value + 1),
    tap((value) => console.log('tap:', value))
  );
}
