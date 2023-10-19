import { Component } from '@angular/core';
import { Container } from 'src/app/models/container-interface';
import { ContainerService } from 'src/app/servicios/container.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent {

  containers: Container[] = [];
  selectedContainer!: Container;

  constructor(private containerService: ContainerService) {}

  onContainerCreated(container: Container) {
    this.loadContainers();
  }

  onContainerUpdated(updated: boolean) {
    if (updated) {
      this.loadContainers();
    }
  }

  async loadContainers() {
    this.containerService.getContainers().subscribe((containers) => {
      this.containers = containers;
    });
  }

  onSelectContainer(container: Container) {
    this.selectedContainer = container;
  }

  onContainerDeleted(deleted: boolean) {
    if (deleted) {
      this.loadContainers();
    }
  }



  
}
