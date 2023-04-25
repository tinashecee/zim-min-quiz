import { Component, OnInit } from '@angular/core';
import { QuizServiceService } from '../quiz-service.service';
import * as fs from 'file-saver';
import * as html2pdf from 'html2pdf.js';
import { Workbook } from 'exceljs';
@Component({
  selector: 'app-leader-board',
  templateUrl: './leader-board.component.html',
  styleUrls: ['./leader-board.component.css']
})
export class LeaderBoardComponent implements OnInit {
  usersArray:any = []
  constructor(private quizService: QuizServiceService) { }

  ngOnInit(): void {
   let a= JSON.parse(this.quizService.getData("users")+"") ;
    this.usersArray=a.sort( this.compare );

  }
  getPercentage(a:any){
    return Math.round((a/20*100) * 10) / 10;
  }
  playAudio(){
    let audio = new Audio();
    audio.src = "assets/clock-ticking-60-second-countdown-118231.mp3";
    audio.load();
    audio.play();

  }
  exportData(){
            this.exportExcel1()
            this.exportExcel2()
            this.exportExcel3()
  }
  exportExcel1() {
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('CorrectAnswersSheet');

    worksheet.columns = [
      { header: 'question', key: 'question', width: 25 },
      { header: 'age', key: 'age', width: 25 },
      { header: 'gender', key: 'gender', width: 25 },
    ];
    let correctAnswers:any = JSON.parse(this.quizService.getData("correct_answers")+"") ;


    correctAnswers.forEach((e: { question: any; age: any; gender: any;}) => {
      worksheet.addRow({question: e.question, age: e.age, gender:e.gender },"n");
    });

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'CorrectAnswersData.xlsx');
    })

  }
  exportExcel2() {
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('IncorrectAnswersSheet');

    worksheet.columns = [
      { header: 'question', key: 'question', width: 25 },
      { header: 'age', key: 'age', width: 25 },
      { header: 'gender', key: 'gender', width: 25 },
    ];
    let correctAnswers:any = JSON.parse(this.quizService.getData("incorrect_answers")+"") ;


    correctAnswers.forEach((e: { question: any; age: any; gender: any;}) => {
      worksheet.addRow({question: e.question, age: e.age, gender:e.gender },"n");
    });

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'IncorrectAnswersData.xlsx');
    })

  }
  exportExcel3() {
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('participantsSheet');

    worksheet.columns = [
      { header: 'name', key: 'name', width: 25 },
      { header: 'age', key: 'age', width: 25 },
      { header: 'gender', key: 'gender', width: 25 },
    ];
    let users:any = JSON.parse(this.quizService.getData("users")+"") ;
    let age:any = JSON.parse(this.quizService.getData("users")+"") ;
    let gender:any = JSON.parse(this.quizService.getData("users")+"") ;


    users.forEach((e: { name: any; age: any; gender: any;}) => {
      worksheet.addRow({name: e.name, age: e.age, gender:e.gender },"n");
    });
   console.log(users)
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'ParticipantsData.xlsx');
    })

  }
  compare( a:any, b:any ) {
    if ( a.score < b.score ){
      return 1;
    }
    if ( a.score > b.score ){
      return -1;
    }
    return 0;
  }



}
