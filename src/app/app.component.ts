import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as Twilio from '@twilio/conversations';
import { Client} from '@twilio/conversations';
import { MyserviceService } from './shared/myservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MyApp';
  joinedConversation:any;
  constructor(private ms:MyserviceService,private router:Router)
  {

  }
  ngOnInit()
  {
    // this.ms.setActiveUser()
  }
  // async getAccessToken()
  // {

  //   const client=new Client(this.token);
  //   client.on('initialized',async ()=>{
  //     // client.addListener
  //     const joinedConversation= await client.getConversationByUniqueName('newCons6');
  //     // const newConversation=await client.createConversation({ uniqueName: 'newCons6' });
  //     // const joinedConversation= await newConversation.join();
  //     // this.joinedConversation=joinedConversation;
  //     // await joinedConversation.add('user1').catch((err:any)=>{
  //     //   console.error(err);
  //     // });
  //     // joinedConversation.add('user2').catch((err:any)=>{
  //     //   console.log(err);
  //     // });
  //     // this.ms.setActiveUser(joinedConversation);
  //     // this.router.navigate(['/chat']);
  //     joinedConversation.on('messageAdded',(res)=>{
  //       console.log(res);
        
  //     })
  //   joinedConversation.sendMessage('hi');

  //   })
   
  //   // this.activeUser.set(joinedConversation);
  //   // client.connectionState.concat(joinedConversation);
  //   }
   
}
