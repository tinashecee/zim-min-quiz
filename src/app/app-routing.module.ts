import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { RoundOneComponent } from './round-one/round-one.component';
import { RoundFourComponent } from './round-four/round-four.component';
import { RoundThreeComponent } from './round-three/round-three.component';
import { RoundTwoComponent } from './round-two/round-two.component';
import { LeaderBoardComponent } from './leader-board/leader-board.component';

const routes: Routes = [
  { path: '', redirectTo:  'home', pathMatch:  'full'  },
  { path: 'home', component: HomepageComponent,data: {state:  'home'} },
{ path: 'round-one', component: RoundOneComponent,data: {state:  'round-one'} },
{ path: 'round-two', component: RoundTwoComponent,data: {state:  'round-two'} },
{ path: 'round-three', component: RoundThreeComponent,data: {state:  'round-three'} },
{ path: 'round-four', component: RoundFourComponent, data: {state:  'round-four'} },
{ path: 'leader-board', component: LeaderBoardComponent,data: {state:  'leader-board'} },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
