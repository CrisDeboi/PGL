import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ClienteForm } from '../cliente-form/cliente-form';
import { Pedido, PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-pedido-list',
  templateUrl: './pedido-list.html',
  styleUrls: ['./pedido-list.scss'],
})
export class PedidoList implements OnInit {
  pedidos: Pedido[] = [];

  constructor(
    private pedidoService: PedidoService,
    private modalController: ModalController,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadPedidos();
  }

  loadPedidos() {
    this.pedidoService.getPedidos().subscribe((data) => {
      this.pedidos = data;
    });
  }  

  dismiss() {
    this.modalController.dismiss();
  }

  async addPedido() {
    const modal = await this.modalController.create({
      component: ClienteForm,
    });
    modal.onDidDismiss().then(() => {
      this.loadPedidos();
    });
    return await modal.present();
  }

  async editPedido(pedido: Pedido) {
    const modal = await this.modalController.create({
      component: ClienteForm,
      componentProps: { pedido },
    });
    modal.onDidDismiss().then(() => {
      this.loadPedidos();
    });
    return await modal.present();
  }

  async deletePedido(idPedido: number) {
    console.log('Eliminando pedido con idPedido:', idPedido); // Agrega un log para depuración
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
