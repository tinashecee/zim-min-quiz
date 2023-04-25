import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { QuizServiceService } from '../quiz-service.service';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
 animateButton: any;
 bubblyButtons: any;
 btn:any = document.getElementById("base");
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {

    //this.btn.addEventListener("mousedown", );
    //this.btn.addEventListener("mouseup", onBtnUp);
  }
   clickBtn(){
    console.log("gh")
    onBtnUp
   }
  openDialog() {
    const dialogRef = this.dialog.open(UserDetailsDialog);
  }
  openDialog1() {
    const dialogRef = this.dialog.open(VideoDialog);
  }

}

@Component({
  selector: 'quiz-start-dialog',
  templateUrl: 'quiz-start-dialog.html',
  styleUrls: ['./homepage.component.css']
})
export class QuizStartDialog {

}

@Component({
  selector: 'user-details-dialog',
  templateUrl: 'user-details-dialog.html',
  styleUrls: ['./homepage.component.css']
})
export class UserDetailsDialog {
  userName = "";
  age=""
  gender="";
  seasons: string[] = ['18 - 30', '31 - 40', '41 - 60', '61+'];
  constructor(public dialog: MatDialog, private quizService: QuizServiceService) { }
  openDialog1() {
    let userExists=false;

    if(this.userName != ""){

      let usersArray:any = JSON.parse(this.quizService.getData("users")+"") ;
      usersArray.forEach((e: { name: string; score: number})=>{
          if(e.name == this.userName) userExists=true;
      })
     if(userExists){
       this.quizService.openSnackBar()
     }
     else{
        usersArray.push({name:this.userName,score:0, age:this.age,gender:this.gender })
        this.quizService.saveData("users", JSON.stringify(usersArray))
        const dialogRef = this.dialog.open(QuizStartDialog);
        this.quizService.saveData("currentUser",this.userName)
        this.quizService.saveData("currentUser_age",this.age)
        this.quizService.saveData("currentUser_gender",this.gender)

     }
    }else{

    }

  }

}
function onBtnUp(this: HTMLElement, ev: MouseEvent) {
  throw new Error('Function not implemented.');
}

function onBtnDown(this: HTMLElement, ev: MouseEvent) {
  throw new Error('Function not implemented.');
}

@Component({
  selector: 'video-dialog',
  templateUrl: 'video-dialog.html',
})
export class VideoDialog {}
