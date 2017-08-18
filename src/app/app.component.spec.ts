import { TestBed, async } from '@angular/core/testing';
import { ChartModule } from 'primeng/primeng';
import { ApolloClient, createNetworkInterface } from 'apollo-client';
import { ApolloModule } from 'apollo-angular';
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

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        ChartModule,
        ApolloModule.forRoot(provideClient)
      ],
      providers: [DatePipe]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));


  it(`should have data from server`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.result.length = 10; // mock response from server
    console.log("count = " + app.result.length);
    expect(app.result.length > 0).toBe(true);
  }));

});
