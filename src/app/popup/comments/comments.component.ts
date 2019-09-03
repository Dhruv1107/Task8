import { Component, OnInit } from "@angular/core";
import { PostsService } from "src/app/posts.service";

@Component({
  selector: "app-comments",
  templateUrl: "./comments.component.html",
  styleUrls: ["./comments.component.css"]
})
export class CommentsComponent implements OnInit {
  comments: string[] = [];
  constructor(public postsService: PostsService) {}

  ngOnInit() {}

  addComment(comment: string) {
    console.log(comment);
    this.comments.push(comment);
    console.log(this.comments);
  }
}
