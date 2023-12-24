import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insurance-table',
  standalone: true,
  imports: [MatTableModule, MatIconModule],
  templateUrl: './insurance-table.component.html',
  styleUrl: './insurance-table.component.css',
})
export class InsuranceTableComponent {
  dataSource: any[] = [];
  columns: string[] = [];

  constructor(
    private dataService: DataService,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.dataService.getInsurancesData().subscribe(
      (data: any) => {
        this.dataSource = data.insurances;
        // Assuming the columns are the keys of the first item in the array
        this.columns = ['name', 'code', 'assured', 'bonus'];
      },
      (error) => {
        console.error('Error fetching insurances:', error);
      }
    );
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
        .post(`${environment.carrierApiUrl}/upload`, formData, { responseType: 'text' })
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
    this.router.navigate(['/insurances', uuid]);
  }
}
