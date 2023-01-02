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
  // token: string='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTS2RmZTNmYmY4YmVjY2ZjNTVlZmE0MDUzMWUzZDQ4NDIyLTE2NzI0OTc4MjkiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJ1c2VyQGV4YW1wbGUuY29tIiwiY2hhdCI6eyJzZXJ2aWNlX3NpZCI6IklTM2Y2NzRjOWJjNTdlNDhiOTgzOWJlYWFkYzYxZTQ3YjcifX0sImlhdCI6MTY3MjQ5NzgyOSwiZXhwIjoxNjcyNTAxNDI5LCJpc3MiOiJTS2RmZTNmYmY4YmVjY2ZjNTVlZmE0MDUzMWUzZDQ4NDIyIiwic3ViIjoiQUNkZjA1MGIyNzhiNmE4NzAzOWU5ZmRjNmM4MWNhZDY1OSJ9.23MLKF7Esi3vefB76pxrhi20VkUZMCXPojOLslJ5nUk';
  formValue:string='';
  // token:string='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTS2RmZTNmYmY4YmVjY2ZjNTVlZmE0MDUzMWUzZDQ4NDIyLTE2NzI1MDI0MjQiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJ1c2VyQGV4YW1wbGUuY29tIiwiY2hhdCI6eyJzZXJ2aWNlX3NpZCI6IklTM2Y2NzRjOWJjNTdlNDhiOTgzOWJlYWFkYzYxZTQ3YjcifX0sImlhdCI6MTY3MjUwMjQyNCwiZXhwIjoxNjcyNTA2MDI0LCJpc3MiOiJTS2RmZTNmYmY4YmVjY2ZjNTVlZmE0MDUzMWUzZDQ4NDIyIiwic3ViIjoiQUNkZjA1MGIyNzhiNmE4NzAzOWU5ZmRjNmM4MWNhZDY1OSJ9.dOWEH_hcGVX7B1FoMXFLONWvX3lpCtzgAvrdhblyKdk'
  activeUser!: Twilio.Conversation;
  token:string='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTS2RmZTNmYmY4YmVjY2ZjNTVlZmE0MDUzMWUzZDQ4NDIyLTE2NzI2NTA5MTMiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJ1c2VyMiIsImNoYXQiOnsic2VydmljZV9zaWQiOiJJU2Q4ZDEzZjVmMjdmMzRiNzZhMjAzZGVmYmRlYjk4OTZiIn19LCJpYXQiOjE2NzI2NTA5MTMsImV4cCI6MTY3MjY1NDUxMywiaXNzIjoiU0tkZmUzZmJmOGJlY2NmYzU1ZWZhNDA1MzFlM2Q0ODQyMiIsInN1YiI6IkFDZGYwNTBiMjc4YjZhODcwMzllOWZkYzZjODFjYWQ2NTkifQ.XU-nTkTUx4BwNgreFx4fcAIVSINdw50-KBVrLSNqKpw';
  // token:string='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTS2RmZTNmYmY4YmVjY2ZjNTVlZmE0MDUzMWUzZDQ4NDIyLTE2NzI2NDk0MjQiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJ1c2VyMiIsImNoYXQiOnsic2VydmljZV9zaWQiOiJJU2Q4ZDEzZjVmMjdmMzRiNzZhMjAzZGVmYmRlYjk4OTZiIn19LCJpYXQiOjE2NzI2NDk0MjQsImV4cCI6MTY3MjY1MzAyNCwiaXNzIjoiU0tkZmUzZmJmOGJlY2NmYzU1ZWZhNDA1MzFlM2Q0ODQyMiIsInN1YiI6IkFDZGYwNTBiMjc4YjZhODcwMzllOWZkYzZjODFjYWQ2NTkifQ.MZVXQN4KWP_lyIXZMmTpmtF2qMc2QGLBwij0eEERGlE';
  // token:string='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTS2RmZTNmYmY4YmVjY2ZjNTVlZmE0MDUzMWUzZDQ4NDIyLTE2NzI2NDYzMzUiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJ1c2VyMiIsImNoYXQiOnsic2VydmljZV9zaWQiOiJJU2Q4ZDEzZjVmMjdmMzRiNzZhMjAzZGVmYmRlYjk4OTZiIn19LCJpYXQiOjE2NzI2NDYzMzUsImV4cCI6MTY3MjY0OTkzNSwiaXNzIjoiU0tkZmUzZmJmOGJlY2NmYzU1ZWZhNDA1MzFlM2Q0ODQyMiIsInN1YiI6IkFDZGYwNTBiMjc4YjZhODcwMzllOWZkYzZjODFjYWQ2NTkifQ.iQnV7T7-2Ovsx7RKVsMuG4mfuTBHbWw3qvjku7etxuk'
  // token:string='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzkxYWRjZmMwNjkxNjk2MjhjNTExNzM3YTU2YWU3M2ZjLTE2NzI2NDU3NjAiLCJncmFudHMiOnsiY2hhdCI6eyJzZXJ2aWNlX3NpZCI6IklTZDhkMTNmNWYyN2YzNGI3NmEyMDNkZWZiZGViOTg5NmIifX0sImlhdCI6MTY3MjY0NTc2MCwiZXhwIjoxNjcyNjQ5MzYwLCJpc3MiOiJTSzkxYWRjZmMwNjkxNjk2MjhjNTExNzM3YTU2YWU3M2ZjIiwic3ViIjoiQUNkZjA1MGIyNzhiNmE4NzAzOWU5ZmRjNmM4MWNhZDY1OSJ9.0z9qgfxe9u1XTDJY3DcEpVRQQlIpskjn2WuOQR5ztGU'
  // token:string='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTS2RmZTNmYmY4YmVjY2ZjNTVlZmE0MDUzMWUzZDQ4NDIyLTE2NzI2NDQxODkiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJ1c2VyMSIsImNoYXQiOnsic2VydmljZV9zaWQiOiJJU2Q4ZDEzZjVmMjdmMzRiNzZhMjAzZGVmYmRlYjk4OTZiIn19LCJpYXQiOjE2NzI2NDQxODksImV4cCI6MTY3MjY0Nzc4OSwiaXNzIjoiU0tkZmUzZmJmOGJlY2NmYzU1ZWZhNDA1MzFlM2Q0ODQyMiIsInN1YiI6IkFDZGYwNTBiMjc4YjZhODcwMzllOWZkYzZjODFjYWQ2NTkifQ.cl7fmBogbM-0qHSRDQA0uUL1QQIQ9zHpHVxEOkvjVcs'
  // token:string='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTS2RmZTNmYmY4YmVjY2ZjNTVlZmE0MDUzMWUzZDQ4NDIyLTE2NzI2NDIxNzUiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJ1c2VyMSIsImNoYXQiOnsic2VydmljZV9zaWQiOiJJU2Q4ZDEzZjVmMjdmMzRiNzZhMjAzZGVmYmRlYjk4OTZiIn19LCJpYXQiOjE2NzI2NDIxNzUsImV4cCI6MTY3MjY0NTc3NSwiaXNzIjoiU0tkZmUzZmJmOGJlY2NmYzU1ZWZhNDA1MzFlM2Q0ODQyMiIsInN1YiI6IkFDZGYwNTBiMjc4YjZhODcwMzllOWZkYzZjODFjYWQ2NTkifQ.o2y5Ae4VMR1IJcMweIHa3sOZhMilGnwSDsbmxGFOQ_4';
  // token: string='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTS2RmZTNmYmY4YmVjY2ZjNTVlZmE0MDUzMWUzZDQ4NDIyLTE2NzI1ODcxMDAiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJ1c2VyMSIsImNoYXQiOnsic2VydmljZV9zaWQiOiJJU2Q4ZDEzZjVmMjdmMzRiNzZhMjAzZGVmYmRlYjk4OTZiIn19LCJpYXQiOjE2NzI1ODcxMDAsImV4cCI6MTY3MjU5MDcwMCwiaXNzIjoiU0tkZmUzZmJmOGJlY2NmYzU1ZWZhNDA1MzFlM2Q0ODQyMiIsInN1YiI6IkFDZGYwNTBiMjc4YjZhODcwMzllOWZkYzZjODFjYWQ2NTkifQ.V2wxaJ9_SySc_8nSob-1WR4ODEJFC3IUiMK7GfwKblo'
  constructor(private ms:MyserviceService,private router:Router)
  {

  }
  ngOnInit()
  {
    // this.ms.setActiveUser()
  }
  async getAccessToken()
  {

    const client=new Client(this.token);
    client.on('initialized',async ()=>{
      // client.addListener
      const joinedConversation= await client.getConversationByUniqueName('newCons6');
      // const newConversation=await client.createConversation({ uniqueName: 'newCons6' });
      // const joinedConversation= await newConversation.join();
      // this.joinedConversation=joinedConversation;
      // await joinedConversation.add('user1').catch((err:any)=>{
      //   console.error(err);
      // });
      // joinedConversation.add('user2').catch((err:any)=>{
      //   console.log(err);
      // });
      // this.ms.setActiveUser(joinedConversation);
      // this.router.navigate(['/chat']);
      joinedConversation.on('messageAdded',(res)=>{
        console.log(res);
        
      })
    joinedConversation.sendMessage('hi');

    })
   
    // this.activeUser.set(joinedConversation);
    // client.connectionState.concat(joinedConversation);
    }
   
}
