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
  statSec: number = 90;

  isVisible$ = new BehaviorSubject(false)
  questionNumber = 0


  questions = [{Question: "What is a mineral",
  Answers: ["A precious stone", "A cool rock","A beautiful rock",
  "A rock used for rituals"]},
  {Question: "What is the most expensive Mineral",
  Answers: ["Mineral is a precious fossil", "Platinum","A beautiful rock",
  "A rock used for rituals"]},
  {Question: "How many minerals exist in Zim",
  Answers: ["Mineral is a precious fossil", "A cool rock","45",
  "A rock used for rituals"]},
  {Question: "Who is the largest supplier of Gold",
  Answers: ["Mineral is a precious fossil", "A cool rock","A beautiful rock",
  "Zimbabwe"]},
   {Question: "What is Zimbabwe's biggest mineral export",
  Answers: ["Mineral is a precious fossil", "Gold","A beautiful rock",
  "A rock used for rituals"]},
  {Question: "What is mineral is most dangerous",
  Answers: ["Uranium", "A cool rock","A beautiful rock",
  "A rock used for rituals"]},
  {Question: "How many mining towns are in Zimbabwe",
  Answers: ["Mineral is a precious fossil", "A cool rock","14",
  "A rock used for rituals"]},
  {Question: "What is the Mining regulator in Zimbabwe",
  Answers: ["Mineral is a precious fossil", "A cool rock","Zim Minerals",
  "A rock used for rituals"]},
  {Question: "What is the great dyke",
  Answers: ["A belt rich in mining deposits", "A cool rock","A beautiful rock",
  "A rock used for rituals"]},
  {Question: "Which mineral is used to make batteries",
  Answers: ["Lithium", "A cool rock","A beautiful rock",
  "A rock used for rituals"]},
  ]

  answers = [{Question: "What is a mineral",
  Answer: "A precious stone"} ,
  {Question: "How many minerals exist in Zim",
  Answer: "45"},
  {Question: "What is the most expensive Mineral",
  Answer: "Platinum"},
  {Question: "Who is the largest supplier of Gold",
  Answer: "Zimbabwe"},
  {Question: "What is Zimbabwe's biggest mineral export",
  Answer: "Gold"},
  {Question: "What is mineral is most dangerous",
  Answer: "Uranium"},
  {Question: "How many mining towns are in Zimbabwe",
  Answer: "14"},
  {Question: "What is the Mining regulator in Zimbabwe",
  Answer: "Zim Minerals"},
  {Question: "What is the great dyke",
  Answer: "A belt rich in mining deposits"},
  {Question: "Which mineral is used to make batteries",
  Answer: "Lithium"}
  ]
  ranNums :number[] = []
  count =0;
  timer: any;
  correctAnswer=0
  wrongAnswer=0
 audio = new Audio();
  constructor(public router: Router,private _bottomSheet: MatBottomSheet,public dialog: MatDialog,private quizService: QuizServiceService) {
    this.timerr(1);
   }

  ngOnInit(): void {

    this.randomIntFromInterval()
    this.playAudio();
  }
  playAudio(){

    this.audio.src = "../../assets/clock-ticking-60-second-countdown-118231.mp3";
    this.audio.load();
    this.audio.play();
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
    if(this.count<10){
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
    this.seconds = minute * 90;

    const prefix = minute < 10 ? "0" : "";

      this.timer = setInterval(() => {
      this.seconds--;
      if (this.statSec != 0) this.statSec--;
      else this.statSec = 89;

      if (this.statSec < 10) {
        this.expression = 'red';
        this.textSec = this.statSec;
      } else this.textSec = this.statSec;
      this.value1=(91-this.seconds)/91*100
      this.display = `${this.textSec}`;

      if (this.seconds == 0) {
        console.log("finished");
        this.timeoutDialog("Your time has run out!","You failed to answer your question in 90 seconds, therefore you are disqualified")
        clearInterval(this.timer);
      }
    }, 1000);
  }
 stopTimer(){
   this.seconds=0
 }
 response(question: any,answer: any){

  //clearInterval(this.timer);
  if(this.wrongAnswer<5){
  this.value= (this.count+1)/10*100;
  this.displayQuestion()
  this.answers.forEach(e=>{
    if(e.Question == question){
      if(e.Answer==answer){
       this.correctAnswer+=1
      }
      else{
        this.wrongAnswer+=1
        this._bottomSheet.open(BottomSheetRoundOne, {
          data: { question: e.Question,answer: e.Answer},});
      }
    }
  })
}else{
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
