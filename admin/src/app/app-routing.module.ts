import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { EstadisticasComponent } from './pages/estadisticas/estadisticas.component';
import { CreateComponent as CreateProduct } from './pages/products/create/create.component';
import { CreateComponent as CreateSucursal } from './pages/sucursales/create/create.component';
import { CreateComponent as CreateVenta } from './pages/ventas/create/create.component';
import { CreateComponent as CreateGasto } from './pages/gastos/create/create.component';
import { SucursalesComponent } from './pages/sucursales/sucursales.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { LoginComponent } from './pages/login/login.component';
import { GastosComponent } from './pages/gastos/gastos.component';
import { ContableComponent } from './pages/contable/contable.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent
  },
  {
    path: 'inicio',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'productos',
    pathMatch: 'full',
    component: ProductsComponent
  },
  {
    path: 'ventas',
    pathMatch: 'full',
    component: VentasComponent
  },
  {
    path: 'sucursales',
    pathMatch: 'full',
    component: SucursalesComponent
  },
  {
    path: 'sucursales/crear',
    pathMatch: 'full',
    component: CreateSucursal
  },
  {
    path: 'sucursales/crear/:id',
    pathMatch: 'full',
    component: CreateSucursal
  },
  {
    path: 'categorias',
    pathMatch: 'full',
    component: CategoriasComponent
  },
  {
    path: 'ventas/create/:id',
    pathMatch: 'full',
    component: CreateVenta
  },
  {
    path: 'contable',
    pathMatch: 'full',
    component: ContableComponent
  },
  {
    path: 'gastos',
    pathMatch: 'full',
    component: GastosComponent
  },
  {
    path: 'gastos/crear',
    pathMatch: 'full',
    component: CreateGasto
  },
  {
    path: 'gastos/crear/:id',
    pathMatch: 'full',
    component: CreateGasto
  },
  {
    path: 'productos/crear',
    pathMatch: 'full',
    component: CreateProduct
  },
  {
    path: 'productos/crear/:id',
    pathMatch: 'full',
    component: CreateProduct,
    canActivate: [

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
