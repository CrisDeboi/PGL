import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Cliente, ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.html',
  styleUrls: ['./cliente-form.scss'],
})
export class ClienteForm implements OnInit {
  @Input() cliente!: Cliente;
  clienteForm!: FormGroup;

  constructor(
    private modalController: ModalController,
    private clienteService: ClienteService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.clienteForm = this.formBuilder.group({
      nombre: [this.cliente?.nombre || '', Validators.required],
      suscripcion: [this.cliente?.suscripcion || '', Validators.required],
      email: [this.cliente?.email || '', [Validators.required]],
      telefono: [this.cliente?.telefono || '', [Validators.required]],
     
    });
  }

  dismiss() {
    this.modalController.dismiss();
  }

  saveCliente() {
    if (this.clienteForm.valid) {
      const clienteData = this.clienteForm.value;
      if (this.cliente && this.cliente.idCliente) {
        this.clienteService
          .updateCliente(this.cliente.idCliente, clienteData)
          .subscribe(() => {
            this.dismiss();
          });
      } else {
        this.clienteService.addCliente(clienteData).subscribe(() => {
          this.dismiss();
        });
      }
    }
  }
}
