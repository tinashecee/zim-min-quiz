import { Component, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class QuizServiceService {

  public scoreRoundOne= new BehaviorSubject<number>(0);
  scoreOne = this.scoreRoundOne.asObservable();
  public scoreRoundTwo= new BehaviorSubject<number>(0);
  scoreTwo = this.scoreRoundTwo.asObservable();
  public scoreRoundThree= new BehaviorSubject<number>(0);
  scoreThree = this.scoreRoundThree.asObservable();
  public scoreRoundFour= new BehaviorSubject<number>(0);
  scoreFour = this.scoreRoundFour.asObservable();
  durationInSeconds = 3;
  constructor(private _snackBar: MatSnackBar) { }
  public saveData(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public getData(key: string) {
    return localStorage.getItem(key)
  }
  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }
  openSnackBar() {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: this.durationInSeconds * 1000,
      panelClass: ['blue-snackbar']
    });
  }
}


@Component({
selector: 'snackbar-notification',
templateUrl: 'snackbar-notification.html',
styles: [
  `
  .example-pizza-party {
    color: hotpink;
  }
`,
],
})
export class SnackbarComponent {}
