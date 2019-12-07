import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { GraphqlService } from './graphql.service';
import { BehaviorSubject } from 'rxjs';
import { Repo, Commit } from '../../shared/';
import { environment as env } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly reposSubject$ = new BehaviorSubject<Repo[]>([]);
  private readonly commitsSubject$ = new BehaviorSubject<Commit[]>([]);
  repos$ = this.reposSubject$.asObservable();
  commits$ = this.commitsSubject$.asObservable();

  constructor(private restService: RestService, private graphqlService: GraphqlService) {}

  getRepos(user: string) {
    if (env.useGraphQl) {
      this.graphqlService.getRepos(user).subscribe(
        repos => {
          this.reposSubject$.next(repos);
        }
      );
    } else {
      this.restService.getRepos(user).subscribe(
        repos => {
          this.reposSubject$.next(repos);
        }
      );
    }
  }

  getCommits(owner: string, repo: string) {
    if (env.useGraphQl) {
      this.graphqlService.getCommits(owner, repo).subscribe(
        commits => {
          this.commitsSubject$.next(commits);
        }
      );
    } else {
      this.restService.getCommits(owner, repo).subscribe(
        commits => {
          this.commitsSubject$.next(commits);
        }
      );
    }
  }
}
