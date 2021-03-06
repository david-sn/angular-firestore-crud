import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, from, of } from 'rxjs';
import { finalize, last, map, switchMap } from 'rxjs/operators';

import { Item } from '../models/item';


@Injectable({
  providedIn: 'root'
})
export class ItemService {

  itemCollection: AngularFirestoreCollection<Item>; // use in add,delete, update document in collection
  items: Observable<Item[]>;
  itemDoc: AngularFirestoreDocument<Item>;


  //afs used in retrive criteria
  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {

    this.itemCollection = this.afs.collection<Item>('items', ref => ref.orderBy('title', 'asc'));

    // this.items = this.afs.collection<Item>('items', ref => ref.orderBy('title', 'asc')).valueChanges(); //this will not retuen id of doc

    //to return id of doc use snapshotChanges function
    this.items = this.afs.collection('items').snapshotChanges()
      .pipe(
        map(e => {
          return e.map(a => {
            const data = a.payload.doc.data() as Item;
            data.id = a.payload.doc.id;
            return data;
          })
        })
      )
  }

  getItems() {
    return this.items;
  }

  addItem(item: Item) {
    return this.itemCollection.add(item);//same below
    // return this.afs.collection<Item>('items').add(item);
  }

  deleteItem(id: string | undefined) {
    this.itemDoc = this.afs.collection('items').doc(id);
    return this.itemDoc.delete();
  }

  editItem(item: Item) {

    item.description = new Date().getTime().toString();

    this.afs.collection('items').doc(item.id).update(item);
  }

  uploadFile(event:any) {
    const file = event.target.files[0];
    console.log(file);

    const filePath = 'image.png';
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);
    task.snapshotChanges()
      .pipe(
        last(),  // emit the last element after task.snapshotChanges() completed
        switchMap(() => ref.getDownloadURL())
      ).subscribe(url => console.log(url))
  }
}


