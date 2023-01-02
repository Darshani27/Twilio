import { Component, OnDestroy, OnInit } from '@angular/core';
import * as Twilio from '@twilio/conversations'
import { Client } from '@twilio/conversations';
import { MyserviceService } from 'src/app/shared/myservice.service';
@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit,OnDestroy {
  response!: any;
  messages: any[] = [];
  contacts: any[] = [];
  isConversation:boolean=false;
  token: string = '';
  username!: string | null;
  joinedConversation?: Twilio.Conversation;
  allConversations?: Twilio.Paginator<Twilio.Conversation>;
  client!: Twilio.Client;

  constructor(private ms: MyserviceService) { }
  ngOnDestroy(): void {
  this.goBack();
  }

  ngOnInit(): void {
    // this.ms.getActiveUser().subscribe((res:Twilio.Conversation)=>{
    //   console.log(res);
    //   if(res)
    //   {
    //     this.response=res.getMessages();
    //   res.on('messageAdded',(message: any)=>{
    //     this.messages=[...this.response,message];
    //   });
    //   }

    // });
    this.token = localStorage.getItem('token') as any;
    this.username = localStorage.getItem('user_name');
    this.getAccessToken();
  }
  async getAccessToken() {

    this.client = new Client(this.token);


    this.client.on('initialized', async () => {
      // client.addListener
      this.allConversations = await this.client.getSubscribedConversations();
      this.allConversations.items.forEach(async (res) => {
        const participants = await res.getParticipants();
        console.log(participants);
        
       const otherparticipant= participants.find((participant) => participant && participant.identity != this.username)
        
          this.contacts.push({
            identity: otherparticipant?.identity,
            sid: res.sid
          })
      
     
      console.log(this.contacts);

      })
      
      console.log(this.allConversations);
      
      // joinedConversation.sendMessage('hi');
    })

    // this.activeUser.set(joinedConversation);
    // client.connectionState.concat(joinedConversation);
  }
  sendMessage(data: any) {
    this.joinedConversation?.sendMessage(data);
    console.log(data);

  }
  async onConversationClick(contact: any)
  {
    this.isConversation=true;
    const joinedConversation = await this.client.getConversationByUniqueName(contact.sid);

      // const newConversation=await client.createConversation({ uniqueName: 'newCons6' });
      // const joinedConversation= await newConversation.join();
      this.joinedConversation = joinedConversation;
      // await joinedConversation.add('user1').catch((err:any)=>{
      //   console.error(err);
      // });
      // joinedConversation.add('user2').catch((err:any)=>{
      //   console.log(err);
      // });
      // this.ms.setActiveUser(joinedConversation);
      // this.router.navigate(['/chat']);
      joinedConversation.on('messageAdded', (res: any) => {
        console.log(res);
        this.messages.push(res);
      });
      joinedConversation.getMessages().then((res: any) => {
        console.log(res.items);
        this.messages = res.items;
      });
  }
  goBack()
  {
    this.isConversation=false;
    this.joinedConversation?.off('messageAdded',()=>{
      console.log('removed');
      
    });
    this.messages=[];
  }
}
