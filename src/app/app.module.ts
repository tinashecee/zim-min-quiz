import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomepageComponent, UserDetailsDialog } from './homepage/homepage.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule} from '@angular/material/dialog';
import {QuizStartDialog } from './homepage/homepage.component';
import { BottomSheetRoundOne, RoundOneComponent, TimeoutDialog } from './round-one/round-one.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatChipsModule} from '@angular/material/chips';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { BottomSheetRoundTwo, RoundTwoComponent, TimeoutDialogRoundTwo } from './round-two/round-two.component';
import { BottomSheetRoundThree, RoundThreeComponent, TimeoutDialogRoundThree } from './round-three/round-three.component';
import { BottomSheetRoundFour, RoundFourComponent, TimeoutDialogRoundFour, VictoryDialog } from './round-four/round-four.component';
import { LeaderBoardComponent } from './leader-board/leader-board.component';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    QuizStartDialog,
    RoundOneComponent,
    TimeoutDialog,
    TimeoutDialogRoundTwo,
    TimeoutDialogRoundThree,
    TimeoutDialogRoundFour,
    BottomSheetRoundOne,
    BottomSheetRoundTwo,
    BottomSheetRoundThree,
    BottomSheetRoundFour,
    RoundTwoComponent,
    RoundThreeComponent,
    RoundFourComponent,
    LeaderBoardComponent,
    SplashScreenComponent,
    UserDetailsDialog,
    VictoryDialog

  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatButtonModule,
    MatDividerModule,
    MatDialogModule,
    MatProgressBarModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatChipsModule,
    MatBottomSheetModule,
    MatListModule,
    MatInputModule,
    FormsModule,
    MatSnackBarModule,
    MatSelectModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
