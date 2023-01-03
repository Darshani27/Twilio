import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as Twilio from '@twilio/conversations'
import { Client } from '@twilio/conversations';
import { MyserviceService } from 'src/app/shared/myservice.service';
import { ConversationInputComponent } from '../conversation-input/conversation-input.component';
@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit, OnDestroy {
  response!: any;
  messages: any[] = [];
  contacts: any[] = [];
  isConversation: boolean = false;
  token: string = '';
  username!: string | null;
  joinedConversation?: Twilio.Conversation;
  allConversations?: Twilio.Paginator<Twilio.Conversation>;
  client!: Twilio.Client;
  partcipantName: any;

  constructor(private ms: MyserviceService,public dialog: MatDialog) { }
  ngOnDestroy(): void {
    this.goBack();
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token') as any;
    this.username = localStorage.getItem('user_name');
    this.getConversation();
  }
  async getAllConvs()
  {
    this.allConversations = await this.client.getSubscribedConversations();
    this.allConversations.items.forEach(async (res) => {
      const participants = await res.getParticipants();
      console.log(participants);
      const otherparticipant = participants.find((participant) => participant && participant.identity != this.username)
      this.contacts.push({
        identity: otherparticipant?.identity,
        sid: res.sid,
        uniqueName:res.uniqueName
      })
      console.log(this.contacts);

    })
  }
  async getConversation() {

    this.client = new Client(this.token);
    this.client.on('initialized', async () => {
    
     this.getAllConvs();
      console.log(this.allConversations);
    })

  }
  sendMessage(data: any) {
    this.joinedConversation?.sendMessage(data);
    console.log(data);

  }
  async onConversationClick(contact: any) {
    this.isConversation = true;
    const joinedConversation = await this.client.getConversationByUniqueName(contact.sid);
    this.joinedConversation = joinedConversation;
    joinedConversation.on('messageAdded', (res: any) => {
      console.log(res);
      this.messages.push(res);
    });
    joinedConversation.getMessages().then((res: any) => {
      console.log(res.items);
      this.messages = res.items;
    });
  }
  goBack() {
    this.isConversation = false;
    this.contacts=[];
    this.getAllConvs();
    this.joinedConversation?.off('messageAdded', () => {
      console.log('removed');
    });
    this.messages = [];
  }
  addParticipant()
  {
    this.client=new Client(this.token);
    this.client.on('initialized',async ()=>{
      this.joinedConversation?.add('user3').catch((err:any)=>{
        console.log(err);
      })
    })
  }
  createConversation()
  {
    // this.client=new Client(this.token);
    const dialogRef=this.dialog.open(ConversationInputComponent,
      {
        width:'600px',
        height:'200px'
      });

    dialogRef.afterClosed().subscribe(async (res:any)=>{
      console.log(res);
      const username=this.username;
      this.partcipantName=res;
      const convsName=username?.concat("-",this.partcipantName)
      const contactInfo=this.contacts.find((contact)=>contact.uniqueName===convsName);
      if(contactInfo)
      {
        this.onConversationClick(contactInfo);
      }
      else{
        const newConversation=await this.client.createConversation({ uniqueName: convsName });
        const joinedConversation= await newConversation.join();
        this.joinedConversation=joinedConversation;
        await this.joinedConversation.add(this.partcipantName).then((r:any)=>{
          this.isConversation=true;
          joinedConversation.on('messageAdded', (res: any) => {
            console.log(res);
            this.messages.push(res);
          });
        // this.client=new Client(this.token);
        });
      }
    
      });
    ;
  }
  async deleteConvs(event: any,contact: any)
  {
    event.preventDefault();
    event.stopPropagation();
    console.log("delted");
    
    const joinedConversation = await this.client.getConversationByUniqueName(contact.sid);
    joinedConversation.delete().then((res:any)=>{
      this.contacts=[];
      this.getAllConvs();
    });
  
  }
}
