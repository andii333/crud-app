import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable, Subscription } from 'rxjs';
import { Car } from 'src/app/interfaces/car';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit, OnDestroy {

  list$: Observable<Car[]> = this.listService.list$;
  dataSource!: Car[];
  displayedColumns: string[] = ['id', 'model', 'year', 'price', 'color', 'gearbox', 'edit', 'delete'];
  subscription = new Subscription;

  constructor(
    private listService: ListService,
    private title: Title
  ) { this.title.setTitle('List of cars | CRUD App')}

  ngOnInit(): void {
    this.subscription.add(this.listService.list$.subscribe(list => this.dataSource = list));
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  delete(id: number): void {
    const newList = this.listService.getCars().filter(car => car.id !== id);
    this.listService.setCars(newList);
    this.listService.updateList();
  }
}
