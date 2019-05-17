import { Component, OnInit } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { Router, NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  name = '';


  constructor(private socket:Socket, private router:Router, private navController:NavController){}

  ngOnInit(){

  }
  joinChat(){

    this.socket.connect();
    this.socket.emit('set-nickName', this.name);

    let navigationExtras: NavigationExtras = {
      queryParams:{
        name: JSON.stringify(this.name)
      }
    };
    this.router.navigate(['/chat'], navigationExtras);
  }
}
