import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {CommentAndPostInterface} from "../interfaces/commentAndPost.interface";
import {PostInterface} from "../interfaces/post.interface";

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css'],
})
export class SinglePostComponent implements OnInit {

  public id:any;
  post?: PostInterface
  comment = {} as  CommentAndPostInterface
  show =false; // hidden by default

  constructor(public route: ActivatedRoute, private http : HttpClient) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      console.log(params.id)
      this.id = params.id;
    });
    this.getSinglePost()
  }


  getSinglePost(){
    this.http.get<PostInterface>("http://localhost:8080/post/getSinglePost/"+this.id).subscribe((data)=>{
      let dateYear = new Date(data.DateCreated).toLocaleDateString()
      let dateTime = new Date(data.DateCreated).toLocaleTimeString()
      data.DateCreated=dateYear + " " + dateTime;
        this.post=data
        console.log(data)
    })
  }



  // saveComment(comment : CommentAndPostInterface) {
  //   const headers = {'content-type' : 'application/json'};
  //   const body = JSON.stringify(comment);
  //   return this.http.post("http://localhost:8080/" + 'user/signup', body,{'headers':headers})
  // }
}

