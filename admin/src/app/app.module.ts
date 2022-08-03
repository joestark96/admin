import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductsComponent } from './pages/products/products.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { EstadisticasComponent } from './pages/estadisticas/estadisticas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateComponent as CreateProduct } from './pages/products/create/create.component';
import { CreateComponent as CreateVenta } from './pages/ventas/create/create.component';
import { CreateComponent as CreateGasto } from './pages/gastos/create/create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { SucursalesComponent } from './pages/sucursales/sucursales.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { CreateComponent } from './pages/sucursales/create/create.component';
import { GastosComponent } from './pages/gastos/gastos.component';
import { ContableComponent } from './pages/contable/contable.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    NavbarComponent,
    ProductsComponent,
    VentasComponent,
    EstadisticasComponent,
    CreateProduct,
    CreateVenta,
    LoginComponent,
    SucursalesComponent,
    CategoriasComponent,
    CreateComponent,
    GastosComponent,
    CreateGasto,
    ContableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
