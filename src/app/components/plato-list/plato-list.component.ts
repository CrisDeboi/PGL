import { Component, OnInit } from '@angular/core';
import { PlatoService, Plato } from '../../services/plato.service';
import { ModalController, AlertController } from '@ionic/angular';
import { PlatoFormComponent } from '../plato-form/plato-form.component';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-plato-list',
  templateUrl: './plato-list.component.html',
  styleUrls: ['./plato-list.component.scss'],
})


export class PlatoListComponent implements OnInit {

  platos: Plato[] = [];

  constructor(
    private platoService: PlatoService,
    private modalController: ModalController,
    private alertController: AlertController,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loadPlatos();
  }

  goToClientes(){
    this.router.navigate(['/clientes'])
  }

  loadPlatos() {
    this.platoService.getPlatos().subscribe(data => {
      this.platos = data;
    });
  }

  async addPlato() {
    const modal = await this.modalController.create({
      component: PlatoFormComponent
    });
    modal.onDidDismiss().then(() => {
      this.loadPlatos();
    });
    return await modal.present();
  }

  async editPlato(plato: Plato) {
    const modal = await this.modalController.create({
      component: PlatoFormComponent,
      componentProps: { plato }
    });
    modal.onDidDismiss().then(() => {
      this.loadPlatos();
    });
    return await modal.present();
  }

  async deletePlato(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que deseas eliminar este plato?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.platoService.deletePlato(id).subscribe(() => {
              this.loadPlatos();
            });
          },
        },
      ],
    });

   

    await alert.present();
  
  }

}