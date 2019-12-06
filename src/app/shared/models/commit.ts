export class Commit {
  constructor(
    public sha: string,
    public author: string,
    public date: Date,
    public message: string
  ) {}
}
