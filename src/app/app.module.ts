import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UserComponent} from './user/user.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { GroupComponent } from './group/group.component';
import { ChatComponent } from './chat/chat.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomeComponent } from './home/home.component';
import { SinglePostComponent } from './single-post/single-post.component';
import {PostElementComponent} from "./elements/post-element.component";

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    GroupComponent,
    ChatComponent,
    ContactUsComponent,
    HomeComponent,
    SinglePostComponent,
    PostElementComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
