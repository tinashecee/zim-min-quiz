import { Component, OnInit } from '@angular/core';
import { QuizServiceService } from './quiz-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private quizService: QuizServiceService){

  }
  ngOnInit(): void {
    if(this.quizService.getData("users") == null){
      this.quizService.saveData("users", JSON.stringify([]))
      console.log("null")
    }
  }
  title = 'zim-min-quiz';

}
