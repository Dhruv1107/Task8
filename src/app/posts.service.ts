import { Injectable } from "@angular/core";

import { Posts } from "./posts";
import { POSTSDATA } from "./posts-data";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Subject, Observable } from "rxjs";
import { database } from 'firebase';
import { map } from 'rxjs/operators';

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
  commentSubject=new Subject<Object>();
  public popUpData = new Subject<Posts[]>();
  constructor(private router: Router, private http: HttpClient) {}

  getSelectedPost(name: string): Posts[] {
    return POSTSDATA.filter(post => post.heading === name);
  }
  addPost(addPost: Posts): void {
    this.post = addPost;
  }
  setAllData(allData: Posts[]) {
    this.allData = allData;
    this.commentSubject.next(this.fullData);
    console.log(this.allData);
    // console.log(this.allData);
  }
  createPost(): Observable<any> {
    return this.http.post(
      "https://newsfeed-6ee3e.firebaseio.com/posts.json",
      this.post
    );
  }
  getPosts(): Observable<any> {
    return this.http.get("https://newsfeed-6ee3e.firebaseio.com/posts.json");
    // console.log(object);
  }
  setId(id:number):void {
    this.postId=id;
    console.log(this.postId);
  }
  addComment(comment) {
    let postKey:string;
    Object.keys(this.fullData).forEach(key => {
      if(this.fullData[key].id == this.postId)
      postKey = key;
    });
    return this.http.post(`https://newsfeed-6ee3e.firebaseio.com/posts/${postKey}/comments.json`,{comment});
  }
  getComments():string[]{
    let cmnts1=[];
    let cmnts2=[];
    let cmnts = this.allData[this.postId-1].comments;
    Object.keys(cmnts).forEach(key => {
      cmnts1.push(cmnts[key]);
    })
    for(let i = 0;i<cmnts1.length;i++){
      cmnts2.push(cmnts1[i].comment);
    }
    console.log(cmnts2);
    return cmnts2;
  }
}
