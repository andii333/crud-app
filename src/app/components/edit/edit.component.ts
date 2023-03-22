import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Car } from 'src/app/interfaces/car';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditComponent implements OnInit, OnDestroy {
  subscription = new Subscription;
  car!: Car;

  constructor(
    private listService: ListService,
    private route: ActivatedRoute,
    private title: Title
  ) { this.title.setTitle('Edit car | CRUD App') }

  ngOnInit(): void {
    this.subscription.add(this.route.params.subscribe(params => {
      this.car = this.listService.getCars().find(car => car.id === +params['id']) as Car;
    }))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
