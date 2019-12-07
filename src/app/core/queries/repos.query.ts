import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class ReposQuery extends Query<any> {
  document = gql`
    query Repos($user: String!){
      user(login: $user) {
        repositories(first: 100, orderBy: {field: CREATED_AT, direction: DESC}) {
          nodes {
            createdAt
            id
            name
          }
        }
      }
    }
  `;
}
