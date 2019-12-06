import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly reposSubject$ = new BehaviorSubject<any[]>([]);
  repos$ = this.reposSubject$.asObservable();

  constructor(private restService: RestService) {}

  getRepos(user: string) {
    this.restService.getRepos(user).subscribe(
      repos => {
        this.reposSubject$.next(repos);
      }
    );
  }
}
