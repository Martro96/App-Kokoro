import { Injectable } from '@angular/core';
import { Coffee } from '../models/coffee.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Coffee[] = [];
  private cartSubject = new BehaviorSubject<Coffee[]>(this.cart);
  cart$ = this.cartSubject.asObservable();

  constructor() { }

  getCart(): Coffee[] {
    return this.cart;
  }

  addToCart(coffee: Coffee, quantity: number = 1): void {
    const existing = this.cart.find((item) => item.id === coffee.id);
    if (existing) {
      existing.quantity! += quantity;
    } else {
      this.cart.push({ ...coffee, quantity });
    }
    this.cartSubject.next(this.cart); //actualizamos carrito
  }

  removeFromCart(id: number): void {
    this.cart = this.cart.filter((item) => item.id !== id);
    this.cartSubject.next(this.cart); //actualizamos carrito
  }
  getTotalItems(): number {
    return this.cart.reduce((total, item) => total + (item.quantity || 0), 0);
  }

  // Creo método Clear para usarlo más adelante en checkout o logout
  clearCart(): void {
    this.cart = [];
    this.cartSubject.next(this.cart); //actualizamos carrito

  }
}