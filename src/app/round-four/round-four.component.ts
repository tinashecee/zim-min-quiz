
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
  selector: 'app-round-four',
  templateUrl: './round-four.component.html',
  styleUrls: ['./round-four.component.css']
})
export class RoundFourComponent implements OnInit {
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
    {
      Question: "What mineral is commonly used in the production of jewellery?",
      Answers: ["Gold", "Silver", "Platinum", "All of the above"]
    },
    {
      Question: "Which of these minerals is commonly used in the production of glass?",
      Answers: ["Quartz", "Feldspar", "Mica", "All of the above"]
    },
    {
      Question: "What mineral is commonly used in the production of paint?",
      Answers: ["Titanium", "Iron", "Aluminum", "Copper"]
    },
    {
      Question: "Which mineral is used in the production of ceramic tiles?",
      Answers: ["Clay", "Sand", "Feldspar", "All of the above"]
    },
    {
      Question: "What mineral is used in the production of tombstones?",
      Answers: ["Asbestos", "Calcium silicate", "Vermiculite", "Granite"]
    },
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

  answers = [
    {
      Question: "What mineral is commonly used in the production of jewellery?",  Answer: "All of the above"
    },
    {
      Question: "Which of these minerals is commonly used in the production of glass?",  Answer: "All of the above"
    },
    {
      Question: "What mineral is commonly used in the production of paint?",  Answer: "Titanium"
    },
    {
      Question: "Which mineral is used in the production of ceramic tiles?",  Answer: "All of the above"
    },
    {
      Question: "What mineral is used in the production of tombstones?",  Answer: "Granite"
    },
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
 victoryAudio = new Audio();
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
  playVictoryAudio(){

    this.victoryAudio.src = "../../assets/success-fanfare-trumpets-6185.mp3";
    this.victoryAudio.load();
    this.victoryAudio.play();
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
      this.stopAudio()
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
              let count = 0
              let position = 1
              usersArray.forEach((e: { name: string; score: number})=>{
                  if(e.name == currentUser){
                    usersArray[count]={name:currentUser,score:total}
                  }
                  count+=1
              })
              this.quizService.saveData("users", JSON.stringify(usersArray))
              usersArray.forEach((e: { name: string; score: number})=>{
                if(e.score > total){
                  position+=1
                }
            })
            this.playVictoryAudio()
              const dialogRef = this.dialog.open(VictoryDialog,{
                data: {
                  name: currentUser,
                  score: Math.round((total/40*100) * 10) / 10,
                  position:position
                }});
                clearInterval(this.timer);
                this.stopAudio()
              this.router.navigate(['leader-board']);
            })

          })
        })
      })

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
       this.playCorrectAudio()
      }
      else{
        this.playErrorAudio()
        this.wrongAnswer+=1
        this._bottomSheet.open(BottomSheetRoundFour, {
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
    this._bottomSheet.open(BottomSheetRoundFour);
  }
  timeoutDialog(errorType: string,errorDesc: string) {
    const dialogRef = this.dialog.open(TimeoutDialogRoundFour,{
      data: {
        errorType: errorType,
        errorDescription:errorDesc
      }});
  }
}

@Component({
  selector: 'timeout-dialog-round-four',
  templateUrl: 'timeout-dialog-round-four.html',
  styleUrls: ['./round-four.component.css']
})
export class TimeoutDialogRoundFour {
  constructor(public router: Router, @Inject(MAT_DIALOG_DATA) public data:{errorType:string, errorDescription:string}){
  }
  cancel(){
    this.router.navigate(['leader-board']);
  }

}
@Component({
  selector: 'victory-dialog',
  templateUrl: 'victory-dialog.html',
  styleUrls: ['./congratulations.css']
})
export class VictoryDialog {
  constructor(public router: Router, @Inject(MAT_DIALOG_DATA) public data:{name:string, score:number, position:number}){
  }
  cancel(){
    this.router.navigate(['/leader-board']);
  }

}


@Component({
  selector: 'bottom-sheet-round-four',
  templateUrl: 'bottom-sheet-round-four.html',
  styleUrls: ['./round-four.component.css']
})
export class BottomSheetRoundFour {
  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetRoundFour>,@Inject(MAT_BOTTOM_SHEET_DATA) public data: {question: string,answer:string}) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
