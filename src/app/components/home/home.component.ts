import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Alumno } from 'src/app/model/Alumno';
import { AlumnosServiceService } from 'src/app/services/alumnos-service.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';
import { NewAlumnoComponent } from '../new-alumno/new-alumno.component';
import { EditAlumnoComponent } from '../edit-alumno/edit-alumno.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private alumnoService: AlumnosServiceService,
    private dialog: MatDialog,
    private router: Router
  ) {} // Asignación a una propiedad de la clase

  datasource!: MatTableDataSource<Alumno>;
  carreras: string[] = [];
  displayedColumns: string[] = [
    'nombre',
    'direccion',
    'correoElectronico',
    'telefono',
    'carrera',
    'cursos',
    'fechaNacimiento',
    'acciones',
  ];

  ngOnInit(): void {
    this.alumnoService.getAlumnos().subscribe((data) => {
      //console.log(data);
      data.forEach((alumno: Alumno) => {
        alumno.fechaNacimiento = this.formatDate(alumno.fechaNacimiento);
      });
      //console.log(data);
      this.datasource = new MatTableDataSource<Alumno>(data);
    });

    this.alumnoService.findAllNamesCareras().subscribe((data) => {
      this.carreras = data;
    });
  }

  // Función para formatear la fecha de nacimiento
  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(0);
    return `${day}/${month}/${year}`;
  }

  //funcion para borrar un alumno pero antes mostrar confirmacion
  openConfirmationDialog(idAlumno: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '30%px',
      data: '¿Estás seguro de que quieres eliminar este alumno?',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('El alumno será eliminado');
        this.alumnoService.deleteAlumno(idAlumno).subscribe((data) => {
          this.ngOnInit();
        });
      }
    });
  }

  openNewAlumnoDialog(): void {
    const dialogRef = this.dialog.open(NewAlumnoComponent, {
      width: '60%px',
      data: '',
    });

    dialogRef.afterClosed().subscribe(() => {
      //window.location.reload();
      this.ngOnInit();
    });
  }

  openEditAlumnoDialog(cveAlumno: number): void {
    const dialogRef = this.dialog.open(EditAlumnoComponent, {
      width: '60%',
      data: { idAlumno: cveAlumno }, // Pasa el parámetro idAlumno dentro de la opción data
    });

    dialogRef.afterClosed().subscribe(() => {
      //window.location.reload();
      this.ngOnInit();
    });
  }
}
