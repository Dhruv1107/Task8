import { Component, OnInit, ViewChild } from "@angular/core";
import { Posts } from "../posts";
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
  allData = [];
  fullData = [];
  filteredStatus: string = "";
  constructor(
    private router:Router,
    private postsService: PostsService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService
      .returnFilteredStatus()
      .subscribe((filteredStatus: string) => {
        this.filteredStatus = filteredStatus;
      });

    this.postsService.getPosts().subscribe(posts => {
      this.postsService.fullData = posts;
      Object.keys(posts).forEach(key => {
        this.allData.push(posts[key]);
      });
      this.posts = this.allData;
      this.postsService.setAllData(this.allData);
      this.route.params.subscribe((params: Params) => {
        if (params.name === "ALL") {
          this.posts = this.allData;
        } else {
          this.posts = this.allData.filter(post => post.heading === params.name);
        }
      });
    });
  }

  continueReading(id:number):void{
    this.postsService.setId(id);
    this.router.navigate(['/popup',id]);
  }
}
