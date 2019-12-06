import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { BehaviorSubject } from 'rxjs';
import { Repo, Commit } from '../../shared/';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly reposSubject$ = new BehaviorSubject<Repo[]>([]);
  private readonly commitsSubject$ = new BehaviorSubject<Commit[]>([]);
  repos$ = this.reposSubject$.asObservable();
  commits$ = this.commitsSubject$.asObservable();

  constructor(private restService: RestService) {}

  getRepos(user: string) {
    this.restService.getRepos(user).subscribe(
      repos => {
        this.reposSubject$.next(repos);
      }
    );
  }

  getCommits(owner: string, repo: string) {
    this.restService.getCommits(owner, repo).subscribe(
      commits => {
        this.commitsSubject$.next(commits);
      }
    );
  }
}
