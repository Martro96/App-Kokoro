import { Component, Input } from '@angular/core';
import { Coffee } from '../../models/coffee.model';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { DefaultImagePipe } from '../../pipes/default-image.pipe';


@Component({
  selector: 'app-coffee-card',
  standalone: false,
  templateUrl: './coffee-card.component.html',
  styleUrl: './coffee-card.component.css'
})
export class CoffeeCardComponent {
  @Input() coffee!: Coffee;

  constructor(private router: Router) {}

  navigateToDetail(): void {
    this.router.navigate(['coffee/detail', this.coffee.id])
  }

}
