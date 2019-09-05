import { Component, OnInit } from "@angular/core";
import { PostsService } from "src/app/posts.service";

@Component({
  selector: "app-comments",
  templateUrl: "./comments.component.html",
  styleUrls: ["./comments.component.css"]
})
export class CommentsComponent implements OnInit {
  
  cmnts:string[];
  constructor(public postsService: PostsService) {
     this.cmnts = this.postsService.getComments();
  }
  ngOnInit() {}

  addComment(comment: string) {
  this.postsService.addComment(comment).subscribe(data => {
    this.cmnts = [];
    this.postsService.getPosts().subscribe(totalData => {
      Object.keys(totalData).forEach((key) => {
        if(totalData[key].id == this.postsService.postId) {
          Object.keys(totalData[key].comments).forEach((commentKey) => {
             this.cmnts.push(totalData[key].comments[commentKey].comment);
          })
        }
      })
    })
  });
  
  }
}
