import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PostInterface} from "../interfaces/post.interface";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts :PostInterface[]=[]
  constructor(private http : HttpClient) { }

  ngOnInit(): void {
    this.getAllPosts()
  }

  getAllPosts(){
    this.http.get<PostInterface[]>("http://localhost:8080/post/getAllPosts").subscribe((data)=>{
      // for(let i in data){
      //   this.posts.push(data[i])
      //   console.log(data[i])
      // }
      this.posts.push(...data);
    })
  }

}
