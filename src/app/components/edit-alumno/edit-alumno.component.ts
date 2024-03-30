import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AlumnosServiceService } from 'src/app/services/alumnos-service.service';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { SuccessComponent } from '../success/success.component';
import { Alumno } from 'src/app/model/Alumno';

@Component({
  selector: 'app-edit-alumno',
  templateUrl: './edit-alumno.component.html',
  styleUrls: ['./edit-alumno.component.scss'],
})
export class EditAlumnoComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { idAlumno: number },
    private dialog: MatDialog,
    private alumnoservice: AlumnosServiceService
  ) {}

  alumno: Alumno = {
    cveAlumno: 0,
    nombre: '',
    apellido: '',
    fechaNacimiento: '',
    direccion: '',
    correoElectronico: '',
    telefono: '',
    carrera: '',
    cursos: [],
  };

  @ViewChild('alumnoForm') alumnoForm!: NgForm;
  startDate = new Date(2005, 1, 1);
  cursoControl = new FormControl('');
  cursos: string[] = [];
  nombre: string = '';
  apellido: string = '';
  fechaNacimiento: string = '';
  direccion: string = '';
  correoElectronico: string = '';
  telefono: string = '';
  carrera: string = '';
  carreras: string[] = [];

  ngOnInit(): void {
    this.alumnoservice.findAllNamesCareras().subscribe((data) => {
      this.carreras = data;
    });

    this.alumnoservice.findAlumnoByID(this.data.idAlumno).subscribe((data) => {
      this.fechaNacimiento = data.fechaNacimiento;

      data.cursos.forEach((curso: string) => {
        this.agregarCurso(curso); // Llama al método agregarCurso para agregar cada curso recuperado
      });

      this.alumno = {
        // Asigna los valores de data a alumnoOriginal
        cveAlumno: data.cveAlumno,
        nombre: data.nombre,
        apellido: data.apellido,
        fechaNacimiento: data.fechaNacimiento,
        direccion: data.direccion,
        correoElectronico: data.correoElectronico,
        telefono: data.telefono,
        carrera: data.carrera,
        cursos: this.cursos,
      };
    });
  }

  saveAlumno() {
    if (this.alumnoForm.valid) {
      this.alumno = {
        cveAlumno: this.data.idAlumno,
        nombre: this.alumno.nombre,
        apellido: this.alumno.apellido,
        fechaNacimiento: this.fechaNacimiento,
        direccion: this.alumno.direccion,
        correoElectronico: this.alumno.correoElectronico,
        telefono: this.alumno.telefono,
        carrera: this.alumno.carrera,
        cursos: this.cursos,
      };
      this.alumnoservice.editAlumno(this.alumno).subscribe((data) => {
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
      data: 'Cambios guardados Exitosamente',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit;
    });
  }

  agregarCurso(curso?: string) {
    if (curso) {
      this.cursos.unshift(curso);
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
