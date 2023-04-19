import { Component, OnInit } from '@angular/core';
import { QuizServiceService } from './quiz-service.service';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import  {trigger, transition, useAnimation}  from  "@angular/animations";
import  {rotateCubeToLeft,rotateFlipToTop,rotateGlueFromLeft,rotateGlueFromRight,rotateRoomToTop,slide}  from  "ngx-router-animations";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [trigger('rotateCubeToLeft',  [ transition('home => leader-board', useAnimation(rotateGlueFromLeft)),
  transition('leader-board => home', useAnimation(rotateGlueFromRight)),
  transition('home => round-one', useAnimation(rotateFlipToTop)),
  transition('round-one => round-two', useAnimation(slide)),
  transition('round-two => round-three', useAnimation(slide)),
  transition('round-three => round-four', useAnimation(slide)),
  transition('round-four => leader-board', useAnimation(rotateRoomToTop)),
  transition('round-one => leader-board', useAnimation(rotateRoomToTop)),
  transition('round-two => leader-board', useAnimation(rotateRoomToTop)),
  transition('round-three => leader-board', useAnimation(rotateRoomToTop)),
])

  ]
})
export class AppComponent implements OnInit {
  constructor(private quizService: QuizServiceService, private contexts: ChildrenOutletContexts){

  }
  ngOnInit(): void {
    if(this.quizService.getData("users") == null){
      this.quizService.saveData("users", JSON.stringify([]))
      console.log("null")
    }
  }
  title = 'zim-min-quiz';
  getState(outlet: any)  {
		return outlet.activatedRouteData.state;
	}

}

