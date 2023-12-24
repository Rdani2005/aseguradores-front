import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { CieltsTableComponent } from './cielts-table/cielts-table.component';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './data.service';
import { InsuranceTableComponent } from './insurance-table/insurance-table.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from './insurance-view/dialog.component';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HttpClientModule,  
    RouterOutlet,
    RouterLink, 
    RouterLinkActive,
    MatDialogModule
  ],
  providers: [DataService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'aseguradores-frontend';
}
