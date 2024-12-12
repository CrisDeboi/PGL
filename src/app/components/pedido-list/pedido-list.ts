import { Component, Input, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Pedido, PedidoService } from 'src/app/services/pedido.service';
import { Cliente } from 'src/app/services/cliente.service';
import { PedidoForm } from '../pedido-form/pedido-form';

@Component({
  selector: 'app-pedido-list',
  templateUrl: './pedido-list.html',
  styleUrls: ['./pedido-list.scss'],
})
export class PedidoList implements OnInit {
  @Input() cliente!: Cliente;
  @Input() showAll: boolean = false;
  pedidos: Pedido[] = [];

  constructor(
    private pedidoService: PedidoService,
    private modalController: ModalController,
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    
    console.log('Cliente recibido en PedidoList:', this.cliente);
  
    // Asignamos directamente los pedidos del cliente a la variable 'pedidos'
    if (this.cliente && this.cliente.pedidos) {
      this.pedidos = this.cliente.pedidos;  // Usamos los pedidos que ya vienen en el cliente
    }
  }  
  

  loadPedidos() {
    this.pedidoService.getPedidos().subscribe((data) => {
      console.log(data);
      this.pedidos = data;
    });
  }

  loadPedidosCliente() {
    this.pedidoService.getPedidosCliente(this.cliente.idCliente).subscribe((data) => {
      console.log('Pedidos recargados desde el servidor:', data);
      this.pedidos = data;
    }, (error) => {
      console.error('Error al cargar los pedidos:', error);
    });
  }



  dismiss() {
    this.modalController.dismiss();
  }

  async addPedido(cliente: Cliente) {    
    const modal = await this.modalController.create({
      component: PedidoForm,
      componentProps: {cliente},
    });
    modal.onDidDismiss().then(() => {
      this.pedidos = this.cliente.pedidos;
      this.loadPedidosCliente();
    });    
    return await modal.present();
    
  }

  async editPedido(pedido: Pedido) {
    const modal = await this.modalController.create({
      component: PedidoForm,
      componentProps: { pedido },
    });
    modal.onDidDismiss().then(() => {
      this.loadPedidosCliente();
    });
    return await modal.present();
  }

  async deletePedido(idPedido: number) {
    console.log('Eliminando pedido con idPedido:', idPedido); 
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que deseas eliminar este pedido?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.pedidoService.deletePedido(idPedido).subscribe(() => {
              this.loadPedidos();
            });
          },
        },
      ],
    });
    await alert.present();
  }
}
