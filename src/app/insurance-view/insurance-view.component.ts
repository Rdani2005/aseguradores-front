import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogClose } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from './dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-insurance-view',
  standalone: true,
  imports: [MatIconModule, MatDialogClose],
  templateUrl: './insurance-view.component.html',
  styleUrl: './insurance-view.component.css',
})
export class InsuranceViewComponent {
  data: any; // Ajusta el tipo de datos según la estructura de tu respuesta
  uuid: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.uuid = params['uuid']; // Suponiendo que el parámetro en la ruta se llama 'uuid'
      this.loadData();
    });
  }

  loadData() {
    this.dataService.getInsuranceDataByUUID(this.uuid).subscribe({
      next: (response) => {
        this.data = response;
      },

      error: (error) => {
        console.error('Error al obtener los datos:', error);
      },
    });
  }

  openDeleteConfirmationDialog() {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      data: { name: this.data.name }, // Puedes pasar cualquier información adicional al cuadro de diálogo
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
    this.dataService.deleteInsuranceByUUID(this.uuid).subscribe(
      () => {
        this.showSnackBar('Seguro borrado correctamente', 'Aceptar');
        // Redirige a una página después de la eliminación (por ejemplo, la lista de seguros)
        this.router.navigate(['/insurances']);
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
      panelClass: panelClass, // Puedes proporcionar una clase de panel adicional para estilos personalizados
    });
  }
}
