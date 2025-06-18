import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.scss',
  standalone: false,
})
export class FavoriteComponent implements OnInit {
  userProfile: any;
  favoriteItems: any[] = [];

  detailCharacter: any;
  detailHouse: any;
  detailBook: any;

  detailCurrent: any = {
    name: null,
    type: null,
    url: null,
    favoriteId: null,
  };

  isModalOpen: boolean = false;
  modalDetail: any = {
    type: '',
    modalTitle: '',
  };

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private notification: NzNotificationService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.notification.create(
        'warning',
        'Access Denied',
        'You must be logged in to access this page.'
      );
      this.router.navigate(['/auth']);
    } else {
      this.apiService.getUserProfile().subscribe({
        next: (profile) => {
          this.userProfile = profile.user;
        },
        error: (error) => {
          console.error('Error fetching user profile:', error);
          this.notification.create(
            'error',
            'Profile Error',
            'There was an error fetching your profile.'
          );
          this.router.navigate(['/auth']);
        },
      });

      this.apiService.getFavorites()
        .subscribe((response: any) => {
          this.favoriteItems = response.favorites;
          console.log(this.favoriteItems);
        })
    }
  }

  openModal(type: string, url: string, favoriteId: string): void {
    if (type === 'book') {
      this.apiService.getBookById(url).subscribe((data) => {
        this.detailBook = data;
        this.detailCurrent = {
          name: this.detailBook.name,
          type: 'book',
          url: this.detailBook.url,
          favoriteId: favoriteId,
        };
        this.modalDetail = {
          type: 'book',
          modalTitle: `Book: ${this.detailBook.name}`,
        };
        this.isModalOpen = true;
      });
    } else if (type === 'house') {
      this.apiService.getHouseById(url).subscribe((data) => {
        this.detailHouse = data;
        this.detailCurrent = {
          name: this.detailHouse.name,
          type: 'house',
          url: this.detailHouse.url,
          favoriteId: favoriteId,
        };
        this.modalDetail = {
          type: 'house',
          modalTitle: `House: ${this.detailHouse.name}`,
        };
        this.isModalOpen = true;
      });
    } else if (type === 'character') {
      this.apiService.getCharacterById(url).subscribe((data) => {
        this.detailCharacter = data;
        this.detailCurrent = {
          name: this.detailCharacter.name,
          type: 'character',
          url: this.detailCharacter.url,
          favoriteId: favoriteId,
        };
        this.modalDetail = {
          type: 'character',
          modalTitle: `Character: ${this.detailCharacter.name}`,
        };
        this.isModalOpen = true;
      });
    }
  }

  handleCancel(): void {
    this.isModalOpen = false;
    this.detailCurrent = {
      name: null,
      type: null,
      url: null,
      favoriteId: null,
    };
    this.modalDetail = {
      type: '',
      modalTitle: '',
    };
  }

  removeFavorite(itemId: string): void {
    this.apiService.deleteFavorite(itemId).subscribe({
      next: () => {
        this.notification.create(
          'success',
          'Favorite Removed',
          'The item has been removed from your favorites.'
        );
        this.favoriteItems = this.favoriteItems.filter(item => item.id !== itemId);
      },
      error: (error) => {
        console.error('Error removing favorite:', error);
        this.notification.create(
          'error',
          'Remove Favorite Error',
          'There was an error removing the favorite item.'
        );
      },
    });
  }
}
