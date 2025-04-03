import { Component, OnInit } from '@angular/core';
import { CoffeeCardComponent } from '../coffee-card/coffee-card.component';
import { Observable } from 'rxjs';
import { Coffee } from '../../models/coffee.model';
import { CoffeeService } from '../../services/coffee.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-coffee-list',
  standalone: false,
  templateUrl: './coffee-list.component.html',
  styleUrl: './coffee-list.component.css',
})
export class CoffeeListComponent implements OnInit {
  coffees$!: Observable<Coffee[]>; //observable para usar con async

  constructor(private coffeeService: CoffeeService) {
  }
//  Creo un nuevo array con map para conseguir las imágenes en el front para no ponerlas en el back
ngOnInit(): void {
  this.coffees$ = this.coffeeService.getCoffees().pipe(
    map(coffees => {
      console.log('Cafés recibidos desde el servicio:', coffees);
      return coffees.map(coffee => ({
        ...coffee,
        imageUrl: this.getImageUrl(coffee.name)
      }));
    })
  );
}


  trackById(index: number, coffee: Coffee): number {
    return coffee.id
  } 
  getImageUrl(name: string): string {
    const map: Record<string, string> = {
      'Kokoro Brazil Cerrado': 'kokoro-brazil.jpg',
      'Kokoro Kenya AA': 'kokoro-kenya.jpg',
      'Kokoro Peru Andes': 'kokoro-peru.jpg',
      'Kokoro Decaf México': 'kokoro-mexico.jpg'
    };
  
    const filename = map[name] || name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ /g, '-') + '.jpg';
  
    return `/assets/images/${filename}`;
  }
  
  
  
}
