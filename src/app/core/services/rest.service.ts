import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Repo } from '../../shared/models/repo';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Commit } from 'src/app/shared/models/commit';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  uri = env.restApiUri;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  getRepos(user: string): Observable<Repo[]> {
    return this.http.get<any>(this.uri + `/users/${user}/repos`).pipe(
      catchError(err => {
        this.errorHandling('Error retrieving the Repos.');
        return of([]);
      }),
      map((repos: any[]) => {
        return repos.map(repo => new Repo(repo.id, repo.name));
      })
    );
  }

  getCommits(owner: string, repo: string): Observable<Commit[]> {
    return this.http
      .get<any>(this.uri + `/repos/${owner}/${repo}/commits`)
      .pipe(
        catchError(err => {
          this.errorHandling('Error retrieving the Repos.');
          return of([]);
        }),
        map((commits: any[]) => {
          return commits.map(commit => {
            return new Commit(
              commit.sha,
              commit.commit.author.name,
              new Date(commit.commit.author.date),
              commit.commit.message
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
