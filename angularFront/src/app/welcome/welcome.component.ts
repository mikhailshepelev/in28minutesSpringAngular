import { Component, OnInit } from '@angular/core';
import { AppComponent } from "../app.component";
import {ActivatedRoute} from "@angular/router";
import {WelcomeDataService} from "../service/data/welcome-data.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  name = ''
  welcomeMessageFromService:string;

  //ActivatedRoute
  constructor(private route:ActivatedRoute,
              private service : WelcomeDataService) { }

  ngOnInit(): void {
    this.name = this.route.snapshot.params['name']
  }

  getWelcomeMessage() {
    console.log(this.service.executeHelloWorldBeanService());

    this.service.executeHelloWorldBeanService().subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
    );
    console.log('last line of getWelcomeMessage')
  }

  getWelcomeMessageWithParameter(){
    this.service.executeHelloWorldServiceWithPathVariable(this.name).subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
    );
  }

  handleSuccessfulResponse(response) {
    this.welcomeMessageFromService = response.message;
  }

  handleErrorResponse(error) {
    console.log(error);
    console.log(error.error)
    console.log(error.error.message)
    this.welcomeMessageFromService = error.error.message;
  }


}
