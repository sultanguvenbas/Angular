import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserComponent} from "./user/user.component";
import {GroupComponent} from "./group/group.component";
import {ChatComponent} from "./chat/chat.component";
import {ContactUsComponent} from "./contact-us/contact-us.component";
import {HomeComponent} from "./home/home.component";
import {SinglePostComponent} from "./single-post/single-post.component";

const routes: Routes = [
  {path: "", pathMatch: "full", component: HomeComponent},
  {path: "login", component: UserComponent},
  {path: "group", component: GroupComponent},
  {path: "chat", component: ChatComponent},
  {path: "contactus", component: ContactUsComponent},
  {path: "post/:id", component: SinglePostComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
