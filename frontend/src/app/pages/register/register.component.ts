import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  standalone: false,
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private notification: NzNotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log('Register data:', this.registerForm.value);
      this.apiService.registerUser(this.registerForm.value).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          // Optionally, show a success notification
          this.notification.create(
            'success',
            'Registration Successful',
            'You have been registered successfully. Bringing you to the login page.'
          );

          setTimeout(() => {
            this.router.navigate(['/auth']);
          }, 3000);
        },
        error: (error) => {
          console.error('Registration failed:', error);
          // Optionally, show an error notification
          this.notification.create(
            'error',
            'Registration Failed',
            'There was an error during registration.'
          );
        },
      });
    }
  }
}
