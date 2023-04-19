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
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {

  }

  openDialog() {
    const dialogRef = this.dialog.open(UserDetailsDialog);
  }


}

@Component({
  selector: 'quiz-start-dialog',
  templateUrl: 'quiz-start-dialog.html',
})
export class QuizStartDialog {

}

@Component({
  selector: 'user-details-dialog',
  templateUrl: 'user-details-dialog.html',
})
export class UserDetailsDialog {
  userName = "";
  age=0
  gender="";
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

     }
    }else{

    }

  }

}
