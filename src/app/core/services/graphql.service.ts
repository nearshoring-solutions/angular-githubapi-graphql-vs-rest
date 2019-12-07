import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ReposQuery, CommitsQuery } from '../';
import { Repo, Commit } from '../../shared';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {
  constructor(
    private reposQuery: ReposQuery,
    private commitsQuery: CommitsQuery
  ) {}

  // tslint:disable-next-line:variable-name
  getRepos(_user: string) {
    return this.reposQuery.watch({
      user: _user
    })
    .valueChanges.pipe(
      map(res => {
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
      map(res => {
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
}
