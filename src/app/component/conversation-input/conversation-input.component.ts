import { Component, OnInit } from '@angular/core';
import { MyserviceService } from 'src/app/shared/myservice.service';
import * as Twilio  from '@twilio/conversations';
@Component({
  selector: 'app-conversation-input',
  templateUrl: './conversation-input.component.html',
  styleUrls: ['./conversation-input.component.css']
})
export class ConversationInputComponent implements OnInit {

  message:string='';
  response:any;
  constructor(private ms:MyserviceService) { }

  ngOnInit(): void {
  }

  handleKeyDown(event:any)
  {
    this.message=event.target.value;
    if(event.key==='Enter')
    {
      this.ms.getActiveUser().subscribe((res:Twilio.Conversation)=>{
        if(res)
        {
          this.response=res;
          this.response.sendMessage(this.message);
          this.message='';
        }
       
      })
    }
  }

}
