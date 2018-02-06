import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NodesService } from 'app/layout/nodes/shared/nodes.service';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit, OnDestroy {
    public nodesCount;
    public nodesServices;
    public subscriptionNodesStats: Subscription;
    loadingCount = true;
    loadingNodesServices = true;

    constructor(private nodesService: NodesService) {
        this.subscriptionNodesStats = nodesService.getStats().subscribe((nodesStats) => {
            this.nodesCount = nodesStats[0];
            this.nodesServices = nodesStats[1];
            this.loadingCount = false;
            this.loadingNodesServices = false;
        });
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.subscriptionNodesStats.unsubscribe();
    }
}
