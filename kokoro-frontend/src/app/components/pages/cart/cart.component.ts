import { Component, OnInit } from '@angular/core';
import { Coffee } from '../../../models/coffee.model';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cart: Coffee[] = [];

  constructor(private cartService: CartService) {}
  ngOnInit() {
    this.cart = this.cartService.getCart();
  }
  removeItem(id: number): void {
    this.cartService.removeFromCart(id); //llamamos al metodo de eliminar de la cesta del servicio
    this.cart = this.cartService.getCart(); //actualizamos carrito
  }

  getTotal(): number {
    return this.cart.reduce((acc, item) => acc + (item.price * (item.quantity ?? 1)), 0);
  }
}
