
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
  statSec: number = 50;

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
      Answers: ["Hematite", "Iron", "Aluminum", "Copper"]
    },
    {
      Question: "Which mineral is used in the production of ceramic tiles?",
      Answers: ["Clay", "Sand", "Feldspar", "All of the above"]
    },
    {
      Question: "What mineral is used in the production of tombstones?",
      Answers: ["Asbestos", "Calcium silicate", "Vermiculite", "Granite"]
    },{
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
    }
  ]

  answers = [
    {
      Question: "What mineral is commonly used in the production of jewellery?",  Answer: "All of the above"
    },
    {
      Question: "Which of these minerals is commonly used in the production of glass?",  Answer: "All of the above"
    },
    {
      Question: "What mineral is commonly used in the production of paint?",  Answer: "Hematite"
    },
    {
      Question: "Which mineral is used in the production of ceramic tiles?",  Answer: "All of the above"
    },
    {
      Question: "What mineral is used in the production of tombstones?",  Answer: "Granite"
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
      Question: "What mineral is used in the production of gasoline?", Answer:"Petroleum"},

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
    if(this.count<5){
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
            this.playVictoryAudio()

              const dialogRef = this.dialog.open(VictoryDialog,{
                data: {
                  name: currentUser,
                  score: Math.round((total/20*100) * 10) / 10,
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
       let correctAnswers:any = JSON.parse(this.quizService.getData("correct_answers")+"") ;

       correctAnswers.push({question:question,age:this.quizService.getData("currentUser_age")+"",gender:this.quizService.getData("currentUser_gender")+"" })
       this.quizService.saveData("correct_answers", JSON.stringify(correctAnswers))
      }
      else{
        this.playErrorAudio()
        let correctAnswers:any = JSON.parse(this.quizService.getData("incorrect_answers")+"") ;

        correctAnswers.push({question:question,age:this.quizService.getData("currentUser_age")+"",gender:this.quizService.getData("currentUser_gender")+"" })
        this.quizService.saveData("incorrect_answers", JSON.stringify(correctAnswers))
        this.wrongAnswer+=1
        this._bottomSheet.open(BottomSheetRoundFour, {
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
          usersArray.forEach((e: { name: string; score: number})=>{
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
