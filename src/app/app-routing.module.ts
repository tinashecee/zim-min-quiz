import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { RoundOneComponent } from './round-one/round-one.component';
import { RoundFourComponent } from './round-four/round-four.component';
import { RoundThreeComponent } from './round-three/round-three.component';
import { RoundTwoComponent } from './round-two/round-two.component';
import { LeaderBoardComponent } from './leader-board/leader-board.component';

const routes: Routes = [{ path: '', component: HomepageComponent},
{ path: 'round-one', component: RoundOneComponent},
{ path: 'round-two', component: RoundTwoComponent},
{ path: 'round-three', component: RoundThreeComponent},
{ path: 'round-four', component: RoundFourComponent},
{ path: 'leader-board', component: LeaderBoardComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
