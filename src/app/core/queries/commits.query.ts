import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class CommitsQuery extends Query<any> {
  document = gql`
    query Commits($owner: String!, $repo: String!){
      repository(owner: $owner, name: $repo) {
        ref(qualifiedName: "master") {
          target {
            ... on Commit {
              history(first: 10) {
                pageInfo {
                  hasNextPage
                  endCursor
                }
                edges {
                  node {
                    oid
                    committedDate
                    message
                    author {
                      name
                      date
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
}
