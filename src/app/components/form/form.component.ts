import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Car } from 'src/app/interfaces/car';
import { ListService } from 'src/app/services/list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit {

  @Input() car!: Car;
  form = this.fb.group({
    'model': ['', [Validators.minLength(3), Validators.maxLength(30), Validators.required]],
    'year': [NaN, [Validators.pattern('^[0-9]{4}$'), Validators.required]],
    'price': [NaN, [Validators.pattern('[0-9]*'), Validators.required]],
    'color': ['', Validators.required],
    'gearbox': ['automatic'],
    'id': [NaN]
  })

  constructor(
    private fb: FormBuilder,
    private listService: ListService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.car) {
      this.form = this.fb.group({
        'model': [this.car.model, [Validators.minLength(3), Validators.maxLength(30), Validators.required]],
        'year': [this.car.year, [Validators.pattern('^[0-9]{4}$'), Validators.required]],
        'price': [this.car.price, [Validators.pattern('[0-9]*'), Validators.required]],
        'color': [this.car.color, Validators.required],
        'gearbox': [this.car.gearbox],
        'id': [this.car.id]
      })
    }
  }

  generationId(): number {
    if (this.listService.getCars().length) {
      const idArray: number[] = [];
      this.listService.getCars().forEach(car => idArray.push(car.id));
      const id = Math.max(...idArray) + 1;
      return id
    } else {
      return 1
    }
  }

  submit() {
    if (this.car) {
      this.router.navigate(['list']);
      const cars = this.listService.getCars();
      const index = cars.findIndex(car => car.id === this.car.id);
      cars[index] = this.form.getRawValue() as unknown as Car;
      this.listService.setCars(cars);
      this.listService.updateList();
    } else {
      this.form.controls.id.setValue(this.generationId())
      this.listService.addCar(this.form.getRawValue() as unknown as Car);
      this.form.reset({ gearbox: 'automatic' });
      this.listService.updateList();
    }
  }
}
