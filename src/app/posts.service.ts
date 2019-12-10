import { Injectable } from "@angular/core";

import { Posts } from "./posts";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Subject, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class PostsService {
  popup: Posts[];
  filteredData: Posts[];
  post: Posts;
  postId: number;
  allData: Posts[];
  fullData: [];
  commentSubject = new Subject<Object>();
  public popUpData = new Subject<Posts[]>();
  constructor(private router: Router, private http: HttpClient) {}

  addPost(addPost: Posts): void {
    this.post = addPost;
  }
  
  setAllData(allData: Posts[]) {
    this.allData = allData;
    this.commentSubject.next(this.fullData);
  }

  createPost(): Observable<any> {
    return this.http.post(
      "https://newsfeed-6ee3e.firebaseio.com/posts.json",
      this.post
    );
  }

  getPosts(): Observable<any> {
    return this.http.get("https://newsfeed-6ee3e.firebaseio.com/posts.json");
  }

  setId(id: number): void {
    this.postId = id;
  }

  addComment(comment: string) {
    let postKey: string;
    Object.keys(this.fullData).forEach(key => {
      if (this.fullData[key].id == this.postId){ 
        postKey = key;
      }
    });
    return this.http.post(
      `https://newsfeed-6ee3e.firebaseio.com/posts/${postKey}/comments.json`,
      { comment }
    );
  }

  getComments(): string[] {
    let commentsArray = [];
    this.getPosts().subscribe(totalData => {
      Object.keys(totalData).forEach(key => {
        if (totalData[key].id == this.postId) {
          Object.keys(totalData[key].comments).forEach(commentKey => {
            commentsArray.push(totalData[key].comments[commentKey].comment);
          });
        }
      });
    });
    return commentsArray;
  }

}
