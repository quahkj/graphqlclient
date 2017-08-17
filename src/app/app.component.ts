import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

interface QueryResponse{
  multiMetrics: any[];
}

const queryString = gql`
        query ( $appId : String!, $metric : String!, $region : String!, $targets : [ String!],
                $granularity : String!, $from : String!, $until : String!) {
          multiMetrics(
            applicationId : $appId,
            metric : $metric,
            region : $region,
            from : $from,
            until : $until,
            granularity : $granularity,
            targets : $targets,
        ) {
          TS
          VL  
        }
      }
`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  result: any[];

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo.watchQuery<QueryResponse>({
      query: queryString,
      variables: {
          "appId" : "portal-local",
          "metric" : "entity_view",
          "region" : "vagrant",
          "targets" : [ "0399ade3-8c9a-4941-9a31-f78a323e9260" ],
          "granularity" : "Minutely",
          "from" : "2017-07-18T03:00",
          "until" : "2017-07-20T17:15:54+10:00"
      }
    }).subscribe(({data}) => {
      this.result = data.multiMetrics;
      console.log("result = " + JSON.stringify(this.result));
    })
  }
}
