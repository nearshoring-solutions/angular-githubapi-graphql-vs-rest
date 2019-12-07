import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { ReposQuery, CommitsQuery } from '../';
import { Repo, Commit } from '../../shared';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { ApolloQueryResult } from 'apollo-client';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {
  constructor(
    private reposQuery: ReposQuery,
    private commitsQuery: CommitsQuery,
    private snackBar: MatSnackBar
  ) {}

  // tslint:disable-next-line:variable-name
  getRepos(_user: string) {
    return this.reposQuery.watch({
      user: _user
    })
    .valueChanges.pipe(
      catchError(err => {
        this.errorHandling('Error retrieving the Repos.');
        return of([]);
      }),
      map((res: ApolloQueryResult<any>) => {
        const repos: any[] = res.data.user.repositories.nodes;
        return repos.map(repo => {
          return new Repo(repo.id, repo.name);
        });
      })
    );
  }

  // tslint:disable-next-line:variable-name
  getCommits(_owner: string, _repo: string) {
    return this.commitsQuery.watch({
      owner: _owner,
      repo: _repo
    })
    .valueChanges.pipe(
      catchError(err => {
        this.errorHandling('Error retrieving the Commits.');
        return of([]);
      }),
      map((res: ApolloQueryResult<any>) => {
        const commits: any[] = res.data.repository.ref.target.history.edges;
        return commits.map(commit => {
          return new Commit(
            commit.node.oid,
            commit.node.author.name,
            new Date(commit.node.author.date),
            commit.node.message
          );
        });
      })
    );
  }

  errorHandling(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 2000
    });
  }
}
