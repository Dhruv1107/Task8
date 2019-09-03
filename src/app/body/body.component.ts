import { Component, OnInit, ViewChild } from "@angular/core";
import { Posts } from "../posts";
import { POSTSDATA } from "../posts-data";
import { PostsService } from "../posts.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-body",
  templateUrl: "./body.component.html",
  styleUrls: ["./body.component.css"]
})
export class BodyComponent implements OnInit {
  posts: Posts[] = [];
  allData: Posts[] = [];
  filteredStatus: string = "";
  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params.name === "ALL") {
        this.posts = this.allData;
      } else {
        this.getSourceDisplay(params.name);
        this.posts;
      }
    });

    this.authService
      .returnFilteredStatus()
      .subscribe((filteredStatus: string) => {
        console.log(filteredStatus);
        this.filteredStatus = filteredStatus;
      });

    this.postsService.getPosts().subscribe(posts => {
      Object.keys(posts).forEach(key => {
        this.allData.push(posts[key]);
      });
      this.posts = this.allData;
      this.postsService.setAllData(this.allData);
    });

    // for (let i = 0; i < POSTSDATA.length; i++) {
    //   this.postsService.addPost(POSTSDATA[i]);
    //   this.postsService.createPost().subscribe(data => {
    //     console.log(POSTSDATA[i]);
    //   });
    // }
  }

  getSourceDisplay(name: string): void {
    this.posts = this.allData.filter(post => post.heading === name);
  }
}
