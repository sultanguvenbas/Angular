import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {PostInterface} from "../interfaces/post.interface";
import {CommentInterface} from "../interfaces/comment.interface";
import {parse} from "@angular/compiler/src/render3/view/style_parser";

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css'],
})
export class SinglePostComponent implements OnInit {
  textField ='';
  public id:number=0;
  post?: PostInterface
  comment: CommentInterface[] = []
  show =false; // hidden by default
  token= <string>localStorage.getItem('token');

  constructor(public route: ActivatedRoute, private http : HttpClient) { }

  clearField(){
    this.textField='';
  }
  checkField(): boolean{
    if (this.textField == ''){
      return true
    }
    return false
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      console.log(params.id)
      this.id = parseInt(params.id);
    });
    this.getSinglePost()
    this.getAllComments()
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

  getAllComments() {
    this.http.get<CommentInterface[]>("http://localhost:8080/comment/getAllComments/"+this.id).subscribe((data) => {
      for(let i in data){
        let dateYear = new Date(data[i].CommentDate).toLocaleDateString()
        let dateTime = new Date(data[i].CommentDate).toLocaleTimeString()
        data[i].CommentDate=dateYear + " " + dateTime;
        this.comment.push(data[i])
        //console.log(data[i])
      }
      // this.posts.push(...data);
    })
  }

  saveComment() {
    let text=this.textField;
    console.log(this.textField)
    console.log("postid",this.id)
    return this.http.post<CommentInterface>("http://localhost:8080/comment/post", { postid: this.id,content: this.textField}, {headers: {"token": this.token}}).subscribe((data) => {
      let dateYear = new Date(data.CommentDate).toLocaleDateString()
      let dateTime = new Date(data.CommentDate).toLocaleTimeString()
      data.CommentDate=dateYear + " " + dateTime;
      this.comment.unshift({
        CommentId:data.CommentId,
        PostId:data.PostId,
        Content:text,
        CommentDate:data.CommentDate,
        Likes:data.Likes,
        Dislikes:data.Dislikes,
        Nickname:data.Nickname,
        Color:data.Color
      });
      console.log(data)

    },(error => {
      alert(JSON.stringify(error))
    }))
  }
}

