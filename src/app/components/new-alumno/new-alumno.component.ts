import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, NgForm } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { strstrdto } from 'src/app/model/StringStringDTO';
import { Alumno } from 'src/app/model/Alumno';
import { AlumnosServiceService } from 'src/app/services/alumnos-service.service';

@Component({
  selector: 'app-new-alumno',
  templateUrl: './new-alumno.component.html',
  styleUrls: ['./new-alumno.component.scss'],
})
export class NewAlumnoComponent implements OnInit {
  constructor(
    private router: Router,
    private alumnoservice: AlumnosServiceService
  ) {}

  startDate = new Date(1990, 0, 1);
  cursoControl = new FormControl('');
  cursos: string[] = [];
  @ViewChild('alumnoForm') alumnoForm!: NgForm;
  carreras: strstrdto[] = [
    { value: 'Ingenieria en computacion', viewValue: 'ing. computacion' },
    { value: 'Medicina', viewValue: 'medicina' },
    { value: 'Arquitectura', viewValue: 'arquitectura' },
  ];

  cveAlumno: number = 0;
  nombre: string = '';
  apellido: string = '';
  fechaNacimiento: string = '';
  direccion: string = '';
  correoElectronico: string = '';
  telefono: string = '';
  carrera: string = '';

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

  ngOnInit(): void {}

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
      this.alumnoservice.saveNewAlumno(this.alumno).subscribe((data) => {});
    } else {
      console.log('El formulario no es válido');
    }
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
