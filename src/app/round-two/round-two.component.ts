
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
  selector: 'app-round-two',
  templateUrl: './round-two.component.html',
  styleUrls: ['./round-two.component.css']
})
export class RoundTwoComponent implements OnInit {
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


  questions = [{Question: "Which mineral is commonly found in Mutoko?",
  Answers: ["Granite", "Copper","Zinc",
  "Lead"]},
  {Question: "Africa's largest integrated steel plant is anticipated to start operations in?",
  Answers: ["Manhize, Mvuma", "Zvishavane","Hwange",
  "Harare"]},
  {Question: "What is the name of the biggest intented steel plant?",
  Answers: ["Hwange Colliery", "UNKI","Dinson Iron & Steel (Manhize)",
  "Aurex"]},
  {Question: "Which mineral is a semiprecious gemstones?",
  Answers: ["Garnet", "Topaz","Amethyst",
  "All of the above"]},
   {Question: "Which mineral is used in the production  kitchen counters?",
  Answers: ["Talc", "Caesar stone","Calcite",
  "Diamond"]},
  {Question: "Which of these minerals is used in the production of wedding rings?",
  Answers: ["Barite", "Celestite","Diamond",
  "Zinc"]},
  {Question: "Which mineral is commonly used in the production of pencils?",
  Answers: ["Graphite", "Hematite","Magnetite",
  "Pyrite"]},
  {Question: "Which of these minerals is commonly used in the production of electrical wires and cables?",
  Answers: ["Copper", "Aluminum","Silver",
  "All of the above"]},
  {Question: "What mineral is used to make optical lenses?",
  Answers: ["Quartz", "Beryl","Fluorite",
  "Halite"]},
  {Question: "Which mineral is used to produce cutting tools?",
  Answers: ["Cobalt", "Tungsten","Titanium",
  "A rock used for rituals"]},
  ]

  answers = [{Question: "Which mineral is commonly found in Mutoko?",
  Answer: "Granite"} ,
  {Question: "Africa's largest integrated steel plant is anticipated to start operations in?",
  Answer: "Manhize, Mvuma"},
  {Question: "What is the name of the biggest intented steel plant?",
  Answer: "UNKI"},
  {Question: "Which mineral is a semiprecious gemstones?",
  Answer: "All of the above"},
  {Question: "Which mineral is used in the production  kitchen counters?",
  Answer: "Caesar stone"},
  {Question: "Which of these minerals is used in the production of wedding rings?",
  Answer: "Diamond"},
  {Question: "Which mineral is commonly used in the production of pencils?",
  Answer: "Graphite"},
  {Question: "Which of these minerals is commonly used in the production of electrical wires and cables?",
  Answer: "All of the above"},
  {Question: "What mineral is used to make optical lenses?",
  Answer: "Fluorite"},
  {Question: "Which mineral is used to produce cutting tools?",
  Answer: "Tungsten"}
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

    this.incorrectAudio.src = "../../assets/wrong-answer-126515.mp3";
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
      this.quizService.scoreRoundTwo.next(this.correctAnswer)
      clearInterval(this.timer);
      this.stopAudio()
      this.router.navigate(['round-three']);
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
        this.timeoutDialog("Your time has run out!","You failed to answer your question in 60 seconds, therefore you are disqualified")
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
       this.playCorrectAudio()
      }
      else{
        this.playErrorAudio()
        this.wrongAnswer+=1
        this._bottomSheet.open(BottomSheetRoundTwo, {
          data: { question: e.Question,answer: e.Answer},});
      }
    }
  })
}else{
  this.stopAudio()
  this.playErrorAudio()
  clearInterval(this.timer);
  this.timeoutDialog("You have Failed to Qualify for the next round","You have failed to answer the necessary questions to proceed to the next round")
}

 }
  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetRoundTwo);
  }
  timeoutDialog(errorType: string,errorDesc: string) {
    const dialogRef = this.dialog.open(TimeoutDialogRoundTwo,{
      data: {
        errorType: errorType,
        errorDescription:errorDesc
      }});
  }
}

@Component({
  selector: 'timeout-dialog-round-two',
  templateUrl: 'timeout-dialog-round-two.html',
  styleUrls: ['./round-two.component.css']
})
export class TimeoutDialogRoundTwo {
  constructor(public router: Router, @Inject(MAT_DIALOG_DATA) public data:{errorType:string, errorDescription:string}){
  }
  cancel(){
    this.router.navigate(['leader-board']);
  }

}


@Component({
  selector: 'bottom-sheet-round-two',
  templateUrl: 'bottom-sheet-round-two.html',
  styleUrls: ['./round-two.component.css']
})
export class BottomSheetRoundTwo {
  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetRoundTwo>,@Inject(MAT_BOTTOM_SHEET_DATA) public data: {question: string,answer:string}) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
