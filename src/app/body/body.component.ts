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
  // @ViewChild("data", { static: false }) data;
  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      console.log(params);
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

    // this.authService.checkLoggedInStatus().subscribe((status: boolean) => {
    //   console.log(status);
    //   if (status) {
    //     this.data.nativeElement.style.display = "block";
    //   } else {
    //     this.data.nativeElement.style.display = "none";
    //   }
    // });
  }

  // ngAfterViewInit() {
  //   this.data.nativeElement.style.display = "none";
  // }

  getSourceDisplay(name: string): void {
    this.posts = this.allData.filter(post => post.heading === name);
  }
}
