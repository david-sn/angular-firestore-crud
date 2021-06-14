import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ItemsComponent } from './components/items/items.component';
import { ItemService } from './services/item-service.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/storage';

@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    NavbarComponent,
    AddItemComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FormsModule
  ],
  providers: [ItemService,{ provide: BUCKET, useValue: 'myapp-db7d5.appspot.com' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
