import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Pedido, PedidoService } from 'src/app/services/pedido.service';
import { Cliente } from 'src/app/services/cliente.service';

@Component({
    selector: 'app-pedido-form',
    templateUrl: './pedido-form.html',
    styleUrls: ['./pedido-form.scss'],
})
export class PedidoForm implements OnInit {
    @Input() pedido!: Pedido;
    @Input() cliente!: Cliente;
    pedidoForm!: FormGroup;

    constructor(
        private modalController: ModalController,
        private pedidoService: PedidoService,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.pedidoForm = this.formBuilder.group({
            coste_total: [this.pedido?.coste_total || '', Validators.required],
            direccion: [this.pedido?.direccion || '', Validators.required],
            metodo_pago: [this.pedido?.metodo_pago || '', [Validators.required]],
            id_cliente: [this.cliente.idCliente]

        });
    }

    dismiss() {
        this.modalController.dismiss();
    }

    savePedido() {
        if (this.pedidoForm.invalid) {
            return;
        }      
    
        const pedido: Pedido = {
            coste_total: this.pedidoForm.value.coste_total,
            direccion: this.pedidoForm.value.direccion,
            metodo_pago: this.pedidoForm.value.metodo_pago,
            cliente: { idCliente: this.pedidoForm.value.id_cliente } 
        };
    
        this.pedidoService.addPedido(pedido).subscribe({
            next: (response) => {
                console.log('Pedido creado con éxito:', response);
                this.dismiss();
            },
            error: (error) => {
                console.error('Error al crear el pedido:', error);
            },
        });
    }
    



}
