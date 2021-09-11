import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PostInterface} from "../interfaces/post.interface";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  show = false;
  textField ='';
  posts: PostInterface[] = []
  token= <string>localStorage.getItem('token');


  constructor(private http: HttpClient) {
  }

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
    this.getAllPosts()
  }

  getAllPosts() {
    this.http.get<PostInterface[]>("http://localhost:8080/post/getAllPosts").subscribe((data) => {
      for(let i in data){
        let dateYear = new Date(data[i].DateCreated).toLocaleDateString()
        let dateTime = new Date(data[i].DateCreated).toLocaleTimeString()
        data[i].DateCreated=dateYear + " " + dateTime;
        this.posts.push(data[i])
        //console.log(data[i])
      }
      // this.posts.push(...data);
    })
  }

  savePost() {
  let text=this.textField;
    console.log(this.textField)
    return this.http.post<PostInterface>("http://localhost:8080/post/post", {content: this.textField}, {headers: {"token": this.token}}).subscribe((data) => {
      let dateYear = new Date(data.DateCreated).toLocaleDateString()
      let dateTime = new Date(data.DateCreated).toLocaleTimeString()
      data.DateCreated=dateYear + " " + dateTime;
      this.posts.unshift({
        PostId:data.PostId,
        Content:text,
        DateCreated:data.DateCreated,
        Likes:data.Likes,
        Dislikes:data.Dislikes,
        Nickname:data.Nickname,
        Color:data.Color
      });
      console.log(data)

    },(error => {
      alert(error.error.Error)
    }))
  }



}
