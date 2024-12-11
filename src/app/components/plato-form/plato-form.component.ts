import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PlatoService, Plato } from '../../services/plato.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-plato-form',
  templateUrl: './plato-form.component.html',
  styleUrls: ['./plato-form.component.scss'],
})
export class PlatoFormComponent implements OnInit {

  @Input() plato!: Plato;
  platoForm!: FormGroup;

  constructor(
    private modalController: ModalController,
    private platoService: PlatoService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.platoForm = this.formBuilder.group({
      nombre: [this.plato?.nombre || '', Validators.required],
      descripcion: [this.plato?.descripcion || '', Validators.required],
      precio: [this.plato?.precio || '', [Validators.required, Validators.min(0)]],
      rotacion: [this.plato?.rotacion || '', [Validators.required]],
    });
  }

  dismiss() {
    this.modalController.dismiss();
  }

  savePlato() {
    if (this.platoForm.valid) {
      const platoData = this.platoForm.value;
      if (this.plato && this.plato.id) {
        this.platoService.updatePlato(this.plato.id, platoData).subscribe(() => {
          this.dismiss();
        });
      } else {
        this.platoService.addPlato(platoData).subscribe(() => {
          this.dismiss();
        });
      }
    }
  }

}
