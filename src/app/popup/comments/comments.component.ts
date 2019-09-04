import { Component, OnInit } from "@angular/core";
import { PostsService } from "src/app/posts.service";

@Component({
  selector: "app-comments",
  templateUrl: "./comments.component.html",
  styleUrls: ["./comments.component.css"]
})
export class CommentsComponent implements OnInit {
  // cmnts = this.postsService.allData[this.postsService.postId-1].comments;
  constructor(public postsService: PostsService) {}
  ngOnInit() {
  
  }

  addComment(comment: string) {
  //  this.postsService.allData[this.postsService.postId-1].comments.push(comment);
  //  console.log(this.postsService.allData);
  this.postsService.addComment(comment).subscribe(data => {
    console.log(data);
  });
  }
}
