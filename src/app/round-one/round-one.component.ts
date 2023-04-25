import { Component, Inject, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {ProgressBarMode} from '@angular/material/progress-bar';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { QuizServiceService } from '../quiz-service.service';
@Component({
  selector: 'app-round-one',
  templateUrl: './round-one.component.html',
  styleUrls: ['./round-one.component.css']
})
export class RoundOneComponent implements OnInit {
  colorAnswer = "accent";
  color: ThemePalette = 'accent';
  mode: ProgressBarMode = 'determinate';
  value = 0;
  bufferValue = 75;

  mode1: ProgressSpinnerMode = 'determinate';
  value1 = 100;
  display: any;
  seconds: number = 0;
  textSec: any = "0";
  statSec: number = 50;

  isVisible$ = new BehaviorSubject(false)
  questionNumber = 0


  questions = [{Question: "What does MMCZ stand for?",
  Answers: ["Minerals Management and Coordination of Zimbabwe", "Mining and Minerals Corporation of Zimbabwe","Minerals Marketing Corporation of Zimbabwe",
  "Mining and Minerals Control of Zimbabwe"]},
  {Question: "In which year was MMCZ established?",
  Answers: ["1980", "1982","2000",
  "2010"]},
  {Question: "MMCZ began operations on ?",
  Answers: ["1 January 1982", "7 March 1983","1/4/1999",
  "31/12/2000"]},
  {Question: "MMCZ is celebrating its …… anniversary",
  Answers: ["20", "38","40",
  "41"]},
   {Question: "What is the role of MMCZ?",
  Answers: ["To collect taxes", "To market and sell minerals produced in Zimbabwe","Enviromental inspection",
  "To mine minerals in Zimbabwe"]},
  {Question: "MMCZ offers the following services except",
  Answers: ["Monitoring mineral exports", "Negotiating gold contracts","Monitoring mineral exports",
  "Mineral evaluation"]},
  {Question: "Which of the following documents are required from the producers when you want to export minerals through MMCZ ",
  Answers: ["Mining claim Licence", "Quality Certificates/Assay certificates","Company profile/ Zimra tax clearance",
  "All of the above"]},
  {Question: "Who is the current General Manager for MMCZ?",
  Answers: ["Mark Rule", "Liz Chitiga","O M Moyo",
  "Tongai Matthew Muzenda"]},
  {Question: "Which of the following minerals is not marketed by MMCZ?",
  Answers: ["Gold", "Platinum","Copper",
  "Diamond"]},
  {Question: "How many functions does the MMCZ have?",
  Answers: ["3", "5","6",
  "1"]},
  ]

  answers = [{Question: "What does MMCZ stand for?",
  Answer: "Minerals Marketing Corporation of Zimbabwe"} ,
  {Question: "In which year was MMCZ established?",
  Answer: "1982"},
  {Question: "MMCZ began operations on ?",
  Answer: "7 March 1983"},
  {Question: "MMCZ is celebrating its …… anniversary",
  Answer: "40"},
  {Question: "What is the role of MMCZ?",
  Answer: "To market and sell minerals produced in Zimbabwe"},
  {Question: "MMCZ offers the following services except",
  Answer: "Negotiating gold contracts"},
  {Question: "Which of the following documents are required from the producers when you want to export minerals through MMCZ",
  Answer: "All of the above"},
  {Question: "Who is the current General Manager for MMCZ?",
  Answer: "Tongai Matthew Muzenda"},
  {Question: "Which of the following minerals is not marketed by MMCZ?",
  Answer: "Gold"},
  {Question: "How many functions does the MMCZ have?",
  Answer: "6"}
  ]
  ranNums :number[] = []
  count =0;
  timer: any;
  correctAnswer=0
  wrongAnswer=0
 audio = new Audio();
 correctAudio = new Audio();
 incorrectAudio = new Audio();
  constructor(public router: Router,private _bottomSheet: MatBottomSheet,public dialog: MatDialog,private quizService: QuizServiceService) {
    this.timerr(1);
   }

  ngOnInit(): void {

    this.randomIntFromInterval()
    this.playAudio();
  }
  playAudio(){

    this.audio.src = "assets/clock-ticking-60-second-countdown-118231.mp3";
    this.audio.load();
    this.audio.play();
  }
  playCorrectAudio(){

    this.correctAudio.src = "assets/correct-6033.mp3";
    this.correctAudio.load();
    this.correctAudio.play();
  }
  playErrorAudio(){

    this.incorrectAudio.src = "assets/wrong-answer-126515.mp3";
    this.incorrectAudio.load();
    this.incorrectAudio.play();
  }
  stopAudio(){
   this.audio.pause()
  }
  randomIntFromInterval() { // min and max included
    var nums = [0,1,2,3,4,5,6,7,8,9],
    i = nums.length,
    j = 0;

while (i--) {
    j = Math.floor(Math.random() * (i+1));
    this.ranNums.push(nums[j]);
    nums.splice(j,1);
}
this.displayQuestion()
  }


  displayQuestion(){
    this.isVisible$.next(false);
    if(this.count<5){
    this.questionNumber = this.ranNums[this.count]
    this.count+=1
    this.isVisible$.next(true);
    }
    else{
      this.quizService.scoreRoundOne.next(this.correctAnswer)
      clearInterval(this.timer);
      this.stopAudio()
      this.router.navigate(['round-two']);
    }
  }
  expression = 'blue'
  timerr(minute:any) {
    // let minute = 1;
    this.seconds = minute * 50;

    const prefix = minute < 10 ? "0" : "";

      this.timer = setInterval(() => {
      this.seconds--;
      if (this.statSec != 0) this.statSec--;
      else this.statSec = 49;

      if (this.statSec < 10) {
        this.expression = 'red';
        this.textSec = this.statSec;
      } else this.textSec = this.statSec;
      this.value1=(51-this.seconds)/51*100
      this.display = `${this.textSec}`;

      if (this.seconds == 0) {
        let firstRound = 0
  let secondRound = 0
  let thirdRound = 0
  let fourRound = 0
  let total = 0
  this.quizService.scoreRoundFour.next(this.correctAnswer)
  this.quizService.scoreOne.subscribe(a=>{
    firstRound = a
    this.quizService.scoreTwo.subscribe(b=>{
      secondRound = b
      this.quizService.scoreThree.subscribe(c=>{
        thirdRound = c
        this.quizService.scoreFour.subscribe(d=>{
          fourRound = d
          total=firstRound+secondRound+thirdRound+fourRound
          let usersArray:any = JSON.parse(this.quizService.getData("users")+"") ;
          let currentUser=this.quizService.getData("currentUser")
          let currentUserAge=this.quizService.getData("currentUser_age")
          let currentUserGender=this.quizService.getData("currentUser_gender")
          let count = 0
          let position = 1
          usersArray.forEach((e: any)=>{
              if(e.name == currentUser){
                usersArray[count]={name:currentUser,score:total,age:currentUserAge,gender:currentUserGender}
              }
              count+=1
          })
          this.quizService.saveData("users", JSON.stringify(usersArray))
          usersArray.forEach((e: any)=>{
            if(e.score > total){
              position+=1
            }
        })
        })

      })
    })
  })
        this.stopAudio()
        this.playErrorAudio()
        this.timeoutDialog("Your time has run out!","You failed to answer your question in 100 seconds, therefore you are disqualified")
        clearInterval(this.timer);
      }
    }, 1000);
  }
 stopTimer(){
   this.seconds=0
 }

 response(question: any,answer: any){

  //clearInterval(this.timer);
  if(this.wrongAnswer<3){
  this.value= (this.count+1)/5*100;
  this.displayQuestion()
  this.answers.forEach(e=>{
    if(e.Question == question){
      if(e.Answer==answer){
       this.correctAnswer+=1
       this.playCorrectAudio()

      }
      else{

        this.playErrorAudio()
        let correctAnswers:any = JSON.parse(this.quizService.getData("incorrect_answers")+"") ;

        correctAnswers.push({question:question,age:this.quizService.getData("currentUser_age")+"",gender:this.quizService.getData("currentUser_gender")+"" })
        this.quizService.saveData("incorrect_answers", JSON.stringify(correctAnswers))
        this.wrongAnswer+=1
        this._bottomSheet.open(BottomSheetRoundOne, {
          data: { question: e.Question,answer: e.Answer},});
      }
    }
  })
}else{
  let firstRound = 0
  let secondRound = 0
  let thirdRound = 0
  let fourRound = 0
  let total = 0
  this.quizService.scoreRoundFour.next(this.correctAnswer)
  this.quizService.scoreOne.subscribe(a=>{
    firstRound = a
    this.quizService.scoreTwo.subscribe(b=>{
      secondRound = b
      this.quizService.scoreThree.subscribe(c=>{
        thirdRound = c
        this.quizService.scoreFour.subscribe(d=>{
          fourRound = d
          total=firstRound+secondRound+thirdRound+fourRound
          let usersArray:any = JSON.parse(this.quizService.getData("users")+"") ;
          let currentUser=this.quizService.getData("currentUser")
          let currentUserAge=this.quizService.getData("currentUser_age")
          let currentUserGender=this.quizService.getData("currentUser_gender")
          let count = 0
          let position = 1
          usersArray.forEach((e: any)=>{
              if(e.name == currentUser){
                usersArray[count]={name:currentUser,score:total,age:currentUserAge,gender:currentUserGender}
              }
              count+=1
          })
          this.quizService.saveData("users", JSON.stringify(usersArray))
          usersArray.forEach((e: any)=>{
            if(e.score > total){
              position+=1
            }
        })
        })

      })
    })
  })

  this.stopAudio()
  this.playErrorAudio()
  clearInterval(this.timer);
   this.timeoutDialog("You have Failed to Qualify for the next round","You have failed to answer the necessary questions to proceed to the next round")
}

 }
  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetRoundOne);
  }
  timeoutDialog(errorType: string,errorDesc: string) {
    const dialogRef = this.dialog.open(TimeoutDialog,{
      data: {
        errorType: errorType,
        errorDescription:errorDesc
      }});
  }
}

@Component({
  selector: 'timeout-dialog',
  templateUrl: 'timeout-dialog.html',
  styleUrls: ['./round-one.component.css']
})
export class TimeoutDialog {
  constructor(public router: Router, @Inject(MAT_DIALOG_DATA) public data:{errorType:string, errorDescription:string}){
  }
  cancel(){
    this.router.navigate(['leader-board']);
  }

}


@Component({
  selector: 'bottom-sheet',
  templateUrl: 'bottom-sheet.html',
  styleUrls: ['./round-one.component.css']

})
export class BottomSheetRoundOne {
  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetRoundOne>,@Inject(MAT_BOTTOM_SHEET_DATA) public data: {question: string,answer:string}) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
