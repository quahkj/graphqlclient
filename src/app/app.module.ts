import { ApolloClient, createNetworkInterface } from 'apollo-client';
import { ApolloModule } from 'apollo-angular';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ChartModule } from 'primeng/primeng';
import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'https://cortex.equiem.com.au/v1/graphql'
  }),
});

export function provideClient(): ApolloClient {
  return client;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ChartModule,
    ApolloModule.forRoot(provideClient)
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
