import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, NgForm } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { strstrdto } from 'src/app/model/StringStringDTO';
import { Alumno } from 'src/app/model/Alumno';
import { AlumnosServiceService } from 'src/app/services/alumnos-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { SuccessComponent } from '../success/success.component';

@Component({
  selector: 'app-new-alumno',
  templateUrl: './new-alumno.component.html',
  styleUrls: ['./new-alumno.component.scss'],
})
export class NewAlumnoComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private alumnoservice: AlumnosServiceService,
    private dialog: MatDialog
  ) {}

  startDate = new Date(2000, 1, 1);
  cursoControl = new FormControl('');
  cursos: string[] = [];
  @ViewChild('alumnoForm') alumnoForm!: NgForm;

  nombre: string = '';
  apellido: string = '';
  fechaNacimiento: string = '';
  direccion: string = '';
  correoElectronico: string = '';
  telefono: string = '';
  carrera: string = '';
  carreras: string[] = [];

  alumno: Alumno = {
    cveAlumno: 0,
    nombre: this.nombre,
    apellido: this.apellido,
    fechaNacimiento: this.fechaNacimiento,
    direccion: this.direccion,
    correoElectronico: this.correoElectronico,
    telefono: this.telefono,
    carrera: this.carrera,
    cursos: this.cursos,
  };

  ngOnInit(): void {
    this.alumnoservice.findAllNamesCareras().subscribe((data) => {
      this.carreras = data;
    });
  }

  saveAlumno() {
    if (this.alumnoForm.valid) {
      this.alumno = {
        nombre: this.nombre,
        apellido: this.apellido,
        fechaNacimiento: this.fechaNacimiento,
        direccion: this.direccion,
        correoElectronico: this.correoElectronico,
        telefono: this.telefono,
        carrera: this.carrera,
        cursos: this.cursos,
      };
      this.alumnoservice.saveNewAlumno(this.alumno).subscribe((data) => {
        this.openSuccessDialog();
      });
    } else {
      this.openErrorDialog();
    }
  }

  openErrorDialog(): void {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '30%',
      data: 'Por favor, completa todos los campos requeridos antes de enviar el formulario.',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit;
    });
  }

  openSuccessDialog(): void {
    const dialogRef = this.dialog.open(SuccessComponent, {
      width: '30%',
      data: 'Alumno guardado Exitosamente',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit;
    });
  }

  agregarCurso() {
    const nuevoCurso = this.cursoControl.value.trim();

    if (nuevoCurso) {
      this.cursos.unshift(nuevoCurso);
      this.cursoControl.reset();
    }
  }
  eliminarCurso(index: number) {
    this.cursos.splice(index, 1); // Elimina el curso en el índice especificado
  }

  onDateChange(event: any) {
    // Formatea la fecha seleccionada en el formato deseado (ejemplo: "1990-05-15T00:00:00.000+00:00")
    this.fechaNacimiento = event.value.toISOString();
  }
}
