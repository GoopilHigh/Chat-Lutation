import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AuthService } from '../services/auth.service';
import * as $ from 'jquery';

interface Post {
  title: string;
  content: string;
  commentary : string;
}

interface PostId extends Post { 
  id: string; 
}

@Component({
  selector: 'app-chat-lutation',
  templateUrl: './chat-lutation.component.html',
  styleUrls: ['./chat-lutation.component.css']
})

export class ChatLutationComponent {
  
  title:string;
  content:string;
  commentary:string;
  post: Observable<Post>;
  posts: any;
  postDoc: AngularFirestoreDocument<Post>;
  postsCol: AngularFirestoreCollection<Post>;

  constructor(private afs: AngularFirestore, private authService: AuthService) {}

  ngOnInit() {
    this.postsCol = this.afs.collection('posts');    
    this.posts = this.postsCol.snapshotChanges()
    .map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Post;
        const id = a.payload.doc.id;
        return { id, data };
      });
    });
  }

  ngAfterViewInit() {
    
    $.ajaxPrefilter( function (options) {
      if (options.crossDomain && jQuery.support.cors) {
        var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
        options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
      }
    });

    $.ajax({
      type: 'HEAD',
      url: 'http://thecatapi.com/api/images/get?format=src&type=gif',
      success: function(data, textStatus, request){
        (<HTMLImageElement>document.getElementById("cat-holder")).src = request.getResponseHeader('X-Final-Url');
      },
      error: function (request, textStatus, errorThrown) {
        console.log("error while retrieving image");
      }
    });
  }

  addPost() {
    this.afs.collection('posts').add({'title': this.title, 'content': (<HTMLImageElement>document.getElementById("cat-holder")).src, 'commentary': this.commentary});
  }

  getPost(postId) {
    this.postDoc = this.afs.doc('posts/'+postId);
    this.post = this.postDoc.valueChanges();
  }

  deletePost(postId) {
    this.afs.doc('posts/'+postId).delete();
  }

  logOut() {
    this.authService.logout();
  }
}
