import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChatComponent } from './component/chat/chat.component';
import { ConversationComponent } from './component/conversation/conversation.component';
import { LoginComponent } from './component/login/login.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'chat',component:ChatComponent},
  {path:'login',component:LoginComponent},
  {path:'conversation',component:ConversationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
