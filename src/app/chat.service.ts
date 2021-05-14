import { Injectable } from '@angular/core';
import { environment } from "../environments/environment";
import { ApiAiClient } from "api-ai-javascript/es6/ApiAiClient"
// import { AgentsClient } from "@google-cloud/dialogflow";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  readonly token = environment.dialogflow.angularBot;
  readonly client = new ApiAiClient({accessToken: this.token})
  constructor() { }

  talk() {
    this.client.textRequest('Hi')
    .then(response => {
      console.log(response);
    })
  }
}
