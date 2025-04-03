import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoffeeListComponent } from './components/coffee-list/coffee-list.component';
import { CoffeeCardComponent } from './components/coffee-card/coffee-card.component';
import { HttpClientModule } from '@angular/common/http';
import { DefaultImagePipe } from './pipes/default-image.pipe';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/pages/home/home.component';
import { AboutComponent } from './components/pages/about/about.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductsComponent } from './components/pages/products/products.component';
import { CoffeeDetailComponent } from './components/coffee-detail/coffee-detail.component';
import { CartComponent } from './components/pages/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    CoffeeListComponent,
    CoffeeCardComponent,
    DefaultImagePipe,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    FooterComponent,
    ProductsComponent,
    CoffeeDetailComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
