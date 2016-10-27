import { Component, OnInit } from '@angular/core';
import { Machine } from "./shared/machine";
import { MachineService } from "../shared/services/machine.service";
import { Response } from "@angular/http";
import { ErrorDetail } from "../shared/entity/error-detail";
import { NotificationsService } from "angular2-notifications/lib/notifications.service";

@Component({
  selector: 'machines-list',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.scss']
})
export class MachinesComponent implements OnInit {
  machines: Machine[];

  constructor(private machineService: MachineService,
              private notificationService: NotificationsService) {
  }

  ngOnInit() {
    this.getMachines();
  }

  private getMachines(): void {
    this.machineService.findAll().subscribe(
      machines => this.machines = machines,
      error => {
      }
    )
  }

  onDelete(id: number) {
    this.machineService.delete(id)
      .subscribe(
        () => {
        },
        (error: Response) => {
          var errorDetail: ErrorDetail = error.json();
          if (errorDetail.code == 1451) {
            this.notificationService.error('Error', 'Can not delete, this machine is being used!');
          } else {
            this.notificationService.error('Error', errorDetail.detail);
          }
        },
        () => this.getMachines()
      );
  }
}
