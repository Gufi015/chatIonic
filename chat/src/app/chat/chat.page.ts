import { Socket } from "ng-socket-io";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
//import { ToastController } from "@ionic/angular/";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.page.html",
  styleUrls: ["./chat.page.scss"]
})
export class ChatPage implements OnInit {
  messages = [];
  message = "";
  name = "";

  constructor(
    private socket: Socket,
    private route: ActivatedRoute,
    private router: Router,
    //private toas: ToastController
  ) {
    this.route.queryParams.subscribe(params => {
      this.name = params.name;
      console.log(this.name);
    });

    this.getMessages().subscribe( message=>{
      this.messages.push(message);
    });

    this.getUser().subscribe(data =>{
      let user = data['user'];
      if(data['event'] === 'left'){
        console.log('user left ' + user);
      }else{
        console.log('user joined ' + user);
      }
    });
  }

  ngOnInit() {}

  sendMessage() {
    this.socket.emit("add-message", { text: this.message });
    console.log('mensaje enviado');
    this.message = "";
  }
  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on("message", data => {
        observer.next(data);
      });
    });
    return observable;
  }

  getUser() {
    let observable = new Observable(observer => {
      this.socket.on("user-change", data => {
        observer.next(data);
      });
    });

    return observable;
  }

  ionSalir() {
    this.socket.disconnect();
  }

  // showToast(msg){
  //   let toast = this.toas.create({
  //     message: msg,
  //     duration: 2000
  //   });

  //   toast.then(data=>{
  //     data.present();
  //   });
  // }
}
