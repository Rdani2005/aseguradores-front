import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { DataService } from '../data.service';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cielts-table',
  standalone: true,
  imports: [MatTableModule,MatIconModule,],
  templateUrl: './cielts-table.component.html',
  styleUrl: './cielts-table.component.css'
})
export class CieltsTableComponent {

  dataSource: any[] = [];
  columns: string[] = [];

  constructor(
    private dataService: DataService,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
    ) { }

  ngOnInit() {
    this.dataService.getInsuredClients().subscribe(
      (data: any[]) => {
        this.dataSource = data.map(client => ({
          ...client,
          age: this.calculateAge(client.birthDay),
        }));
        // Assuming the columns are the keys of the first item in the array
        this.columns = ['nationalId', 'name', 'phone', 'age'];
      },
      (error) => {
        console.error('Error fetching insured clients:', error);
      }
    );
  }

  calculateAge(birthDate: string): number {
    // Assuming 'birthDate' is a string in the format 'YYYY-MM-DD'
    const dob = new Date(birthDate);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - dob.getFullYear();

    // Check if the birthday has occurred this year
    if (
      currentDate.getMonth() < dob.getMonth() ||
      (currentDate.getMonth() === dob.getMonth() && currentDate.getDate() < dob.getDate())
    ) {
      return age - 1;
    } else {
      return age;
    }
  }

  onFileInputClick() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.xlsx'; // Puedes ajustar las extensiones permitidas según tus necesidades
    fileInput.addEventListener('change', this.onFileSelected.bind(this));
    fileInput.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      this.http
        .post(`${environment.insuredApiUrl}/upload`, formData, { responseType: 'text' })
        .subscribe(
          {
            next: (response) => {
              console.log(response);
             
            },
            error: (error) => {
              console.log(error);
              this.showSnackbar('Error al subir el archivo', 'error-snackbar');
            },
            complete: () => {
              this.showSnackbar(
                'Archivo subido correctamente',
                'success-snackbar'
              );
            },
          }
        );
    }
  }

  private showSnackbar(message: string, cssClass: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000, // Duración en milisegundos
      panelClass: [cssClass],
    }).afterDismissed().subscribe(() => window.location.reload());

  }

  onRowClick(uuid: string) {
    this.router.navigate(['/clients', uuid]);
  }
}
