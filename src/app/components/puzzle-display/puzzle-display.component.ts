import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PuzzleService, Puzzle } from '../../services/puzzle.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-puzzle-display',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './puzzle-display.component.html',
  styleUrls: ['./puzzle-display.component.css']
})
export class PuzzleDisplayComponent implements OnInit, OnDestroy {
  puzzles: Puzzle[] = [];
  currentPuzzle: Puzzle | null = null;
  selectedLevel: 'easy' | 'medium' | 'hard' = 'easy';
  numberOfQuestions: number = 10;
  userAnswer: string = '';
  showResult: boolean = false;
  isCorrect: boolean = false;
  currentIndex: number = 0;
  correctAnswers: number = 0;
  timer: any;
  timeLeft: number = 10;
  private subscription: Subscription | null = null;
  isTestStarted: boolean = false;

  constructor(private puzzleService: PuzzleService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.clearTimer();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  startNewTest() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.subscription = this.puzzleService.getPuzzles(this.selectedLevel, this.numberOfQuestions).subscribe(puzzles => {
      this.puzzles = puzzles;
      this.currentIndex = 0;
      this.correctAnswers = 0;
      this.showResult = false;
      this.isTestStarted = true;
      this.showRandomPuzzle();
    });
  }

  showRandomPuzzle() {
    if (this.currentIndex < this.puzzles.length) {
      this.currentPuzzle = this.puzzles[this.currentIndex];
      this.showResult = false;
      this.userAnswer = '';
      this.startTimer();
    } else {
      this.showFinalResult();
    }
  }

  checkAnswer() {
    this.clearTimer();
    if (this.currentPuzzle && this.currentPuzzle.answer === this.userAnswer) {
      this.isCorrect = true;
      this.correctAnswers++;
    } else {
      this.isCorrect = false;
    }
    this.showResult = true;
    this.showFeedback();
  }

  nextPuzzle() {
    this.clearTimer();
    this.currentIndex++;
    this.showRandomPuzzle();
  }

  onLevelChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    if (target) {
      this.selectedLevel = target.value as 'easy' | 'medium' | 'hard';
    }
  }

  showFinalResult() {
    Swal.fire({
      title: 'Test Tamamlandı!',
      text: `Toplam ${this.puzzles.length} sorudan ${this.correctAnswers} tanesini doğru cevapladınız.`,
      icon: 'success',
      confirmButtonText: 'Yeniden Başlat'
    }).then(() => {
      this.isTestStarted = false;
    });
  }

  startTimer() {
    this.timeLeft = 10;
    this.timer = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.nextPuzzle();
      }
    }, 1000);
  }

  clearTimer() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  showFeedback() {
    if (this.isCorrect) {
      Swal.fire({
        title: 'Doğru!',
        text: 'Cevabınız doğru.',
        icon: 'success',
        confirmButtonText: 'Tamam'
      });
    } else {
      Swal.fire({
        title: 'Yanlış!',
        text: `Yanlış cevap, doğru cevap: ${this.currentPuzzle?.answer}`,
        icon: 'error',
        confirmButtonText: 'Tamam'
      });
    }
  }
}
