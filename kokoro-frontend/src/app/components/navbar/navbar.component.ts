import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Coffee } from '../../models/coffee.model';


@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  showCart = false;
  cart: Coffee[] = [];

  constructor(private cartService: CartService) {}
  
  ngOnInit(): void {
    this.cartService.cart$.subscribe(updatedCart => {
          this.cart = updatedCart;
    })
  }
  toggleCart(): void {
    this.showCart = !this.showCart; //Esto lo hacemos para cambiar el estado del showCart de falso a verdadero y viceversa para que se despliegue la info
  }
  get totalItems(): number {
    return this.cart.reduce((total, item) => total + (item.quantity || 0), 0);
  }
}
