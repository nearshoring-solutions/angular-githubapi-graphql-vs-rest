import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { Observable, Subscription } from 'rxjs';
import { Repo, Commit } from '../../shared';

@Component({
  selector: 'app-commits',
  templateUrl: './commits.component.html',
  styleUrls: ['./commits.component.css']
})
export class CommitsComponent implements OnInit, OnDestroy {
  repos: Observable<Repo[]>;
  commits: Observable<Commit[]>;
  reposSubscription: Subscription;
  columns = ['sha', 'author', 'date', 'message'];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.repos = this.dataService.repos$;
    this.commits = this.dataService.commits$;
    this.reposSubscription = this.dataService.repos$.subscribe();
    this.dataService.getRepos('nearshoring-solutions');
  }

  onRepoChange(event) {
    this.dataService.getCommits('nearshoring-solutions', event.value);
  }

  ngOnDestroy() {
    this.reposSubscription.unsubscribe();
  }
}
