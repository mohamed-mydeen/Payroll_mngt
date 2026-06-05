import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'payroll-frontend';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Ping the backend to wake it up from sleep (e.g., Render free tier)
    this.authService.wakeUpBackend().subscribe({
      next: () => console.log('Backend is awake!'),
      error: () => console.log('Backend wake up ping sent.')
    });
  }
}
