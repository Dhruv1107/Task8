import { Component, OnInit } from "@angular/core";
import { PostsService } from "../posts.service";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { appConfig } from "../config/app.config";
@Component({
  selector: "app-addform",
  templateUrl: "./addform.component.html",
  styleUrls: ["./addform.component.css"]
})
export class AddformComponent implements OnInit {
  fields: string[] = appConfig.fields;
  constructor(public postsService: PostsService, private router: Router) {}

  ngOnInit() {}

  profileForm = new FormGroup({
    id: new FormControl(
      this.postsService.allData[this.postsService.allData.length - 1].id + 1
    ),
    heading: new FormControl("", Validators.required),
    date: new FormControl("", Validators.required),
    image: new FormControl("", Validators.required),
    content: new FormControl("", Validators.required),
    popup: new FormControl("", Validators.required)
  });

  onSubmit(): void {
    this.postsService.addPost(this.profileForm.value);
    this.postsService.createPost().subscribe(data => {
      alert("New Article added");
      this.router.navigate(["/news/ALL"]);
    });
  }
}
