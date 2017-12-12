import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AuthService } from '../services/auth.service';

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

  addPost() {
    this.afs.collection('posts').add({'title': this.title, 'content': this.content, 'commentary': this.commentary});
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
