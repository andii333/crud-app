import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Car } from '../interfaces/car';

@Injectable()
export class ListService {

  private _list = new ReplaySubject<Car[]>();
  public list$ = this._list.asObservable();

  constructor() {
    if (!this.getCars().length) { localStorage.setItem('list', JSON.stringify(this.list)) }
    this.updateList();
  }

  getCars(): Car[] {
    if (localStorage.getItem('list')) {
      return JSON.parse(localStorage.getItem('list') as string)
    } else {
      return []
    }
  }

  setCars(list: Car[]): void {
    localStorage.setItem('list', JSON.stringify(list))
  }

  addCar(car: Car): void {
    localStorage.setItem('list', JSON.stringify([...this.getCars(), car]))
  }

  updateList(): void {
    this._list.next(this.getCars())
  }


  list = [
    {
      "model": "volkswagen passat",
      "year": 2000,
      "price": "5000",
      "color": "green",
      "gearbox": "mechanic",
      "id": 1
    },
    {
      "model": "honda cv",
      "year": 2004,
      "price": "4500",
      "color": "red",
      "gearbox": "mechanic",
      "id": 2
    },
    {
      "model": "renault clio",
      "year": 2008,
      "price": "5000",
      "color": "blue",
      "gearbox": "automatic",
      "id": 3
    },
    {
      "model": "ford mondeo",
      "year": 2010,
      "price": "7200",
      "color": "gray",
      "gearbox": "automatic",
      "id": 4
    },
    {
      "model": "geep ranger",
      "year": 2017,
      "price": "14500",
      "color": "orange",
      "gearbox": "automatic",
      "id": 5
    },
    {
      "model": "seat ibiza",
      "year": 2015,
      "price": "11200",
      "color": "black",
      "gearbox": "automatic",
      "id": 6
    },
    {
      "model": "Toyota Corolla",
      "year": 2020,
      "price": "22000",
      "color": "yellow",
      "gearbox": "mechanic",
      "id": 7
    },
    {
      "model": "audi Q7",
      "year": 2016,
      "price": "18000",
      "color": "white",
      "gearbox": "automatic",
      "id": 8
    },
    {
      "model": "Dodge Charger",
      "year": 2019,
      "price": "30000",
      "color": "red",
      "gearbox": "automatic",
      "id": 9
    },
    {
      "model": "fiat doblo",
      "year": 2013,
      "price": "6000",
      "color": "white",
      "gearbox": "mechanic",
      "id": 10
    }
  ]

}
