import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  standalone: false,
})
export class AuthComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private notification: NzNotificationService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Login data:', this.loginForm.value);
      this.apiService.loginUser(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          // Optionally, show a success notification
          this.notification.create(
            'success',
            'Login Successful',
            'You have been logged in successfully.'
          );

          this.authService.setToken(response.token);
          this.router.navigate(['/favorite']);
        },
        error: (error) => {
          console.error('Login failed:', error);
          // Optionally, show an error notification
          this.notification.create(
            'error',
            'Login Failed',
            'There was an error during login.'
          );
        },
      });
    }
  }
}
