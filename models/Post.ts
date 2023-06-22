import { User } from "./User";

export class Post {
  constructor(
    readonly id: string,
    readonly title: string,
    readonly content: string,
    readonly createdAt: Date,
    readonly user: User
  ) {}
}