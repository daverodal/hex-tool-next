import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MapsComponent} from './maps/maps.component';
import {MapComponent} from './maps/map/map.component';
import {MapEditComponent} from './maps/map/map-edit.component';
import {MapHexesComponent} from './maps/map/map-hexes.component';
import {AppComponent} from './app.component';
import { TerrainPropertyComponent } from './maps/map/terrain-property.component';
import {TerrainPropertiesComponent} from './maps/map/terrain-properties.component';
import {HomeComponent} from './home.component';

const routes:  Routes = [
  {
    path: '',
    redirectTo: '/maps',
    pathMatch: 'full'
  },
  {
    path: 'maps',
    component: MapsComponent
  },
  {
    path: 'maps/:id',
    component: MapComponent
  },
  {
    path: 'maps/:id/edit',
    component: MapEditComponent
  },
  {
    path: 'maps/:id/hexes',
    component: MapHexesComponent
  },
  {
    path: 'maps/:id/properties',
    component: TerrainPropertiesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash : true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

