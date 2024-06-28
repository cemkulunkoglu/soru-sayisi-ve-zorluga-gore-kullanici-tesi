import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Puzzle {
  question: string;
  options: string[];
  answer: string;
}

@Injectable({
  providedIn: 'root'
})
export class PuzzleService {
  private apiUrl = 'https://opentdb.com/api.php?amount=';

  constructor(private http: HttpClient) { }

  getPuzzles(level: 'easy' | 'medium' | 'hard', amount: number): Observable<Puzzle[]> {
    return this.http.get<any>(`${this.apiUrl}${amount}&type=multiple&difficulty=${level}`).pipe(
      map(response => {
        return response.results.map((quiz: any) => ({
          question: quiz.question,
          options: [...quiz.incorrect_answers, quiz.correct_answer].sort(() => Math.random() - 0.5),
          answer: quiz.correct_answer
        }));
      })
    );
  }
}
