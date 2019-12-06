import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Repo } from '../../shared/models/repo';
import { MatSnackBar } from '@angular/material/snack-bar';

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
      map((repos: Repo[]) => {
        return repos.map(repo => new Repo(repo.id, repo.name));
      })
    );
  }

  errorHandling(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 2000
    });
  }
}
