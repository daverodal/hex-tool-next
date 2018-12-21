import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapsComponent } from './maps/maps.component';
import { MapsService } from './maps.service';
import { MapItemComponent } from './maps/map-item.component';
import { MapComponent } from './maps/map/map.component';
import { ClickableHexMapComponent } from './maps/map/clickable-hex-map.component';
import { HexMapComponent } from './maps/map/hex-map.component';
import { MapEditComponent } from './maps/map/map-edit.component';
import { MapHexesComponent } from './maps/map/map-hexes.component';
import { HexPickService } from './maps/map/hex-pick.service';
import { HexPartService } from './maps/map/hex-part.service';
import { HexDrawService } from './maps/map/hex-draw.service';
import { DbmComponent } from './dbm/dbm.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FormsModule} from '@angular/forms';
import { TerrainPropertyComponent } from './maps/map/terrain-property.component';
import { TerrainPropertiesComponent } from './maps/map/terrain-properties.component';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    AppComponent,
    MapsComponent,
    MapItemComponent,
    MapComponent,
    ClickableHexMapComponent,
    HexMapComponent,
    MapEditComponent,
    MapHexesComponent,
    DbmComponent,
    TerrainPropertyComponent,
    TerrainPropertiesComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [MapsService , HexDrawService, HexPickService, HexPartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
