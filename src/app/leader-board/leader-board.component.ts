import { Component, OnInit } from '@angular/core';
import { QuizServiceService } from '../quiz-service.service';

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
