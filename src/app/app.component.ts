import { Component, OnInit } from '@angular/core';
import { QuizServiceService } from './quiz-service.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slider
  ]
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
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}import { slider } from './route-animations';

