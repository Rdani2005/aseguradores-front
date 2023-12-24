import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { MatDialog, MatDialogClose } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { DeleteConfirmationDialogComponent } from '../insurance-view/dialog.component';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-insured-view',
  standalone: true,
  imports: [MatIconModule, MatDialogClose, MatTableModule, MatIconModule],
  templateUrl: './insured-view.component.html',
  styleUrl: './insured-view.component.css'
})
export class InsuredViewComponent {
  data: any; 
  uuid: string = '';
  dataSource: any[] = [];
  columns: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.uuid = params['uuid']; 
      this.loadData();
    });
  }

  loadData() {
    this.dataService.getInsuredDataByUUID(this.uuid).subscribe({
      next: (response) => {
        this.data = {
          ...response,
          age: this.calculateAge(response.birthDay)
        };
        this.dataSource = response.insurances;
        this.columns = ['name', 'code'];
      },

      
      error: (error) => {
        console.error('Error al obtener los datos:', error);
      },
    });
  }

  openDeleteConfirmationDialog() {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      data: { name: this.data.name }, 
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteData();
      } else {
        this.showSnackBar('Borrado cancelado', 'Aceptar', 'info');
      }
    });
  }

  deleteData() {
    this.dataService.deleteInsuredByUUID(this.uuid).subscribe(
      () => {
        this.showSnackBar('Cliente borrado correctamente', 'Aceptar');
        // Redirige a una página después de la eliminación (por ejemplo, la lista de seguros)
        this.router.navigate(['/clients']);
      },
      (error) => {
        console.error('Error al eliminar los datos:', error);
        this.showSnackBar('Error al borrar el seguro', 'Aceptar', 'error');
      }
    );
  }

  showSnackBar(message: string, action: string, panelClass: string = '') {
    this.snackBar.open(message, action, {
      duration: 3000, // Duración en milisegundos
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: panelClass, 
    });
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

  onRowClick(uuid: string) {
    this.router.navigate(['/insurances', uuid]);
  }
}
