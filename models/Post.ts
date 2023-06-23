export class Post {
  constructor(
    readonly id: string,
    readonly title: string,
    readonly content: string,
    readonly description: string,
    readonly createdAt: Date,
  ) {}
}