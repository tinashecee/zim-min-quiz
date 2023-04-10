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
    this.usersArray= JSON.parse(this.quizService.getData("users")+"") ;
  }

}
