import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Cliente, ClienteService } from 'src/app/services/cliente.service';
import { Router } from '@angular/router';
import { ClienteForm } from '../cliente-form/cliente-form';
import { PedidoList } from '../pedido-list/pedido-list';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.html',
  styleUrls: ['./cliente-list.scss'],
})


export class ClienteList implements OnInit {

  clientes: Cliente[] = [];

  constructor(
    private clienteService: ClienteService,
    private modalController: ModalController,
    private alertController: AlertController,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loadClientes();
  }

  onRowClick(event: Event, cliente: Cliente) {
    const target = event.target as HTMLElement;
    if (!target.closest('ion-button')) {
      this.showPedidos(cliente);
    }
  }
  

  loadClientes() {
    this.clienteService.getClientes().subscribe(data => {
      console.log(data);
      this.clientes = data;
    });
  }

  goToPlatos(){    
    this.router.navigate(['/platos'])
  }
  

  async showPedidos(cliente: Cliente) {
    const modal = await this.modalController.create({
      component: PedidoList,
      componentProps: {cliente},
    });
    modal.onDidDismiss().then(() => {
      this.loadClientes();
    });
    return await modal.present();
  }

  async showAllPedidos() {
    const modal = await this.modalController.create({
      component: PedidoList, 
      componentProps: {showAll: true}     
    });
    modal.onDidDismiss().then(() => {
      this.loadClientes();
    });
    return await modal.present();
  }

  async addCliente() {
    const modal = await this.modalController.create({
      component: ClienteForm
    });
    modal.onDidDismiss().then(() => {
      this.loadClientes();
    });
    return await modal.present();
  }

  async editCliente(cliente: Cliente) {
    const modal = await this.modalController.create({
      component: ClienteForm,
      componentProps: { cliente }
    });
    modal.onDidDismiss().then(() => {
      this.loadClientes();
    });
    return await modal.present();
  }

  async deleteCliente(idCliente: number) {
    console.log('Eliminando cliente con idCliente:', idCliente);  
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que deseas eliminar este cliente?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.clienteService.deleteCliente(idCliente).subscribe(() => {
              this.loadClientes();
            });
          },
        },
      ],
    });
    await alert.present();
  }
  

}