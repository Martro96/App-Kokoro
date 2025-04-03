import { Component, OnInit } from '@angular/core';
import { Coffee } from '../../models/coffee.model';
import { CoffeeService } from '../../services/coffee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-coffee-detail',
  standalone: false,
  templateUrl: './coffee-detail.component.html',
  styleUrl: './coffee-detail.component.css'
})
export class CoffeeDetailComponent implements OnInit {
  coffee?: Coffee;
  quantity: number = 1; //Inicializo la cantidad 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private coffeeService: CoffeeService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const coffeeId = Number(this.route.snapshot.paramMap.get('id'));
    if (coffeeId) {
      this.loadCoffeDetail(coffeeId);
    } else {
      console.error('ID del café no encontrado')
    }
  }
  loadCoffeDetail(coffeeId: Number):void {
    this.coffeeService.getCoffees().subscribe({
      next: (coffees) => {
        const foundCoffee = coffees.find((a) => a.id === coffeeId);
        if (foundCoffee) {
          this.coffee = foundCoffee;
        } else {
          console.error('Café no encontrado')
        }
      }, 
      error: () => {
        console.error('Error al cargar el café')
      }
    })
  }
  decreaseQuantity(): void {
    if (this.quantity > 1) this.quantity--;
  }

  increaseQuantity(): void {
    this.quantity++;
  }
  // addToCart(): void {
  //   console.log('cartService:', this.cartService);
  //   console.log('Intentando añadir al carrito...');
  
  //   if (!this.cartService) {
  //     alert('CartService es undefined. Hay un problema grave.');
  //     return;
  //   }
  
  //   if (this.coffee) {
  //     this.cartService.addToCart(this.coffee, this.quantity);
  //     console.log('Producto añadido:', this.coffee.name);
  //     alert('Producto añadido a la cesta 🛒');
  //   } else {
  //     console.error('Café no definido');
  //   }
  // }
  addToCart(): void {
    console.log('¿Es instancia de CartService?', this.cartService instanceof CartService);
    console.log('cartService:', this.cartService);
  
    if (!this.cartService) {
      alert('CartService es undefined. Hay un problema grave.');
      return;
    }
  
    if (this.coffee) {
      this.cartService.addToCart(this.coffee, this.quantity);
      console.log('Producto añadido:', this.coffee.name);
      alert('Producto añadido a la cesta 🛒');
    } else {
      console.error('Café no definido');
    }
  }
  
}
