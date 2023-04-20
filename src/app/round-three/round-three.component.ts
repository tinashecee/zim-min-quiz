
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
  selector: 'app-round-three',
  templateUrl: './round-three.component.html',
  styleUrls: ['./round-three.component.css']
})
export class RoundThreeComponent implements OnInit {
  colorAnswer = "accent";
  color: ThemePalette = 'primary';
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


  questions = [
    {    Question: "Which mineral is most commonly found in Hwange?",    Answers: ["Gold", "Platinum", "Diamonds", "Coal"]
},
{
  Question: "Which of these minerals is NOT popular in Zimbabwe?",
  Answers: ["Copper", "Iron ore", "Bauxite", "Chrome"]
},
{
  Question: "Which mineral is Zimbabwe's largest foreign currency earner?",
  Answers: ["Platinum", "Coal", "Diamonds", "Nickel"]
},
{
  Question: "Which mineral is commonly found in the Marange diamond fields?",
  Answers: ["Emeralds", "Sapphires", "Rubies", "Diamonds"]
},
{
  Question: "Which of the listed is not a PGM producer?",
  Answers: ["Mimosa", "Bikita Minerals", "Zimplats", "UNKI"]
},
{
  Question: "Which of these minerals is commonly used in the production of EV batteries?",
  Answers: ["Coal", "Diamonds", "Granite", "Lithium"]
},
{
  Question: "Which mineral is not used to produce stainless steel?",
  Answers: ["Copper", "Iron", "Sand", "Nickel"]
},
{
  Question: "Which mineral is used in the production of fertilizers?",
  Answers: ["Potassium", "Phosphorus", "Nitrogen", "All of the above"]
},
{
  Question: "Which of these minerals is NOT used in the production of cement?",
  Answers: ["Gypsum", "Limestone", "Clay", "Copper"]
},
{
  Question: "What mineral is used in the production of gasoline?",
  Answers: ["Uranium", "Coal", "Petroleum", "Lithium"]
},

  ]

  answers = [{    Question: "Which mineral is most commonly found in Hwange?",  Answer: "Coal"
},
{
  Question: "Which of these minerals is NOT popular in Zimbabwe?",  Answer: "Bauxite"
},
{
  Question: "Which mineral is Zimbabwe's largest foreign currency earner?",  Answer: "Platinum"
},
{
  Question: "Which mineral is commonly found in the Marange diamond fields?",  Answer: "Diamonds"
},
{
  Question: "Which of the listed is not a PGM producer?",  Answer: "Bikita Minerals"
},
{
  Question: "Which of these minerals is commonly used in the production of EV batteries?",  Answer: "Lithium"
},
{
  Question: "Which mineral is not used to produce stainless steel?",  Answer: "Sand"
},
{
  Question: "Which mineral is used in the production of fertilizers?",  Answer: "All of the above"
},
{
  Question: "Which of these minerals is NOT used in the production of cement?",  Answer: "Copper"
},
{
  Question: "What mineral is used in the production of gasoline?",},

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

    this.audio.src = "../../assets/clock-ticking-60-second-countdown-118231.mp3";
    this.audio.load();
    this.audio.play();
  }
  playCorrectAudio(){

    this.correctAudio.src = "../../assets/correct-6033.mp3";
    this.correctAudio.load();
    this.correctAudio.play();
  }
  playErrorAudio(){

    this.incorrectAudio.src = "../../assets/wrong-Answer-126515.mp3";
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
    if(this.count<10){
    this.questionNumber = this.ranNums[this.count]
    this.count+=1
    this.isVisible$.next(true);
    }
    else{
      this.quizService.scoreRoundThree.next(this.correctAnswer)
      clearInterval(this.timer);
      this.stopTimer()
      this.stopAudio()
      this.router.navigate(['round-four']);
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
        this.stopAudio()
        this.playErrorAudio()
        this.timeoutDialog("Your time has run out!","You failed to Answer your question in 60 seconds, therefore you are disqualified")
        clearInterval(this.timer);
      }
    }, 1000);
  }
 stopTimer(){
   this.seconds=0
 }
 response(question: any,Answer: any){

  //clearInterval(this.timer);
  if(this.wrongAnswer<5){
  this.value= (this.count+1)/10*100;
  this.displayQuestion()
  this.answers.forEach(e=>{
    if(e.Question == question){
      if(e.Answer==Answer){
       this.correctAnswer+=1
       this.playCorrectAudio()
      }
      else{
        this.playErrorAudio()
        this.wrongAnswer+=1
        this._bottomSheet.open(BottomSheetRoundThree, {
          data: { question: e.Question,Answer: e.Answer},});
      }
    }
  })
}else{
  this.stopAudio()
  this.playErrorAudio()
  clearInterval(this.timer);
  this.timeoutDialog("You have Failed to Qualify for the next round","You have failed to Answer the necessary questions to proceed to the next round")

}

 }
  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetRoundThree);
  }
  timeoutDialog(errorType: string,errorDesc: string) {
    const dialogRef = this.dialog.open(TimeoutDialogRoundThree,{
      data: {
        errorType: errorType,
        errorDescription:errorDesc
      }});
  }
}

@Component({
  selector: 'timeout-dialog-round-three',
  templateUrl: 'timeout-dialog-round-three.html',
  styleUrls: ['./round-three.component.css']
})
export class TimeoutDialogRoundThree {
  constructor(public router: Router, @Inject(MAT_DIALOG_DATA) public data:{errorType:string, errorDescription:string}){
  }
  cancel(){
    this.router.navigate(['leader-board']);
  }

}


@Component({
  selector: 'bottom-sheet-round-three',
  templateUrl: 'bottom-sheet-round-three.html',
  styleUrls: ['./round-three.component.css']
})
export class BottomSheetRoundThree {
  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetRoundThree>,@Inject(MAT_BOTTOM_SHEET_DATA) public data: {question: string,Answer:string}) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
