webpackJsonp(["nodes.module"],{

/***/ "../../../../../src/app/layout/nodes/nodes-list/nodes-list.component.html":
/***/ (function(module, exports) {

module.exports = "\n<div class=\"table-container\">\n  <table class=\"table table-striped\">\n    <thead>\n      <tr>\n        <th>#</th>\n        <th>Instance Id</th>\n        <th>Services</th>\n        <th>VPN Address</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr *ngFor=\"let node of nodes; index as i\">\n        <td>{{i}}</td>\n        <td>{{node?.instanceId}}</td>\n        <td>{{node?.services.toString()}}</td>\n        <td>{{node?.vpnAddress}}</td>\n      </tr>\n    </tbody>\n  </table>\n</div>"

/***/ }),

/***/ "../../../../../src/app/layout/nodes/nodes-list/nodes-list.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/nodes/nodes-list/nodes-list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NodesListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shared_nodes_service__ = __webpack_require__("../../../../../src/app/layout/nodes/shared/nodes.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var NodesListComponent = (function () {
    function NodesListComponent(nodesService) {
        var _this = this;
        this.nodesService = nodesService;
        nodesService.nodesUpdated$.subscribe(function (nodes) { _this.nodes = nodes; });
    }
    NodesListComponent.prototype.ngOnInit = function () {
        this.nodesService.getNodes();
    };
    return NodesListComponent;
}());
NodesListComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'app-nodes-list',
        template: __webpack_require__("../../../../../src/app/layout/nodes/nodes-list/nodes-list.component.html"),
        styles: [__webpack_require__("../../../../../src/app/layout/nodes/nodes-list/nodes-list.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__shared_nodes_service__["a" /* NodesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__shared_nodes_service__["a" /* NodesService */]) === "function" && _a || Object])
], NodesListComponent);

var _a;
//# sourceMappingURL=nodes-list.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/nodes/nodes-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NodesRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__nodes_component__ = __webpack_require__("../../../../../src/app/layout/nodes/nodes.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_2__nodes_component__["a" /* NodesComponent */] }
];
var NodesRoutingModule = (function () {
    function NodesRoutingModule() {
    }
    return NodesRoutingModule;
}());
NodesRoutingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */].forChild(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */]]
    })
], NodesRoutingModule);

//# sourceMappingURL=nodes-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/layout/nodes/nodes.component.html":
/***/ (function(module, exports) {

module.exports = "<div [@routerTransition]>\n    <app-page-header [heading]=\"'Nodes'\" [icon]=\"'fa-server'\"></app-page-header>\n    <div class=\"row\">\n        <div class=\"col col-sm-12\">\n            <div class=\"card mb-3\">\n                <div class=\"card-header\">\n                    Nodes\n                </div>\n                <app-nodes-list></app-nodes-list>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/layout/nodes/nodes.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/nodes/nodes.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NodesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__router_animations__ = __webpack_require__("../../../../../src/app/router.animations.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var NodesComponent = (function () {
    function NodesComponent() {
    }
    NodesComponent.prototype.ngOnInit = function () {
    };
    return NodesComponent;
}());
NodesComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'app-nodes',
        template: __webpack_require__("../../../../../src/app/layout/nodes/nodes.component.html"),
        styles: [__webpack_require__("../../../../../src/app/layout/nodes/nodes.component.scss")],
        animations: [Object(__WEBPACK_IMPORTED_MODULE_0__router_animations__["a" /* routerTransition */])()]
    }),
    __metadata("design:paramtypes", [])
], NodesComponent);

//# sourceMappingURL=nodes.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/nodes/nodes.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NodesModule", function() { return NodesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shared_nodes_service__ = __webpack_require__("../../../../../src/app/layout/nodes/shared/nodes.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__nodes_component__ = __webpack_require__("../../../../../src/app/layout/nodes/nodes.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_layout_nodes_nodes_routing_module__ = __webpack_require__("../../../../../src/app/layout/nodes/nodes-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_layout_nodes_nodes_list_nodes_list_component__ = __webpack_require__("../../../../../src/app/layout/nodes/nodes-list/nodes-list.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var NodesModule = (function () {
    function NodesModule() {
    }
    return NodesModule;
}());
NodesModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_4__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_5_app_layout_nodes_nodes_routing_module__["a" /* NodesRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_1__shared_shared_module__["a" /* SharedModule */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__nodes_component__["a" /* NodesComponent */],
            __WEBPACK_IMPORTED_MODULE_6_app_layout_nodes_nodes_list_nodes_list_component__["a" /* NodesListComponent */]
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_0__shared_nodes_service__["a" /* NodesService */]]
    })
], NodesModule);

//# sourceMappingURL=nodes.module.js.map

/***/ }),

/***/ "../../../../../src/app/layout/nodes/shared/node.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Node; });
var Node = (function () {
    function Node(data) {
        var node = data || {};
        this.instanceId = node.instanceId;
        this.services = node.services;
        this.vpnAddress = node.vpnAddress;
    }
    return Node;
}());

//# sourceMappingURL=node.js.map

/***/ }),

/***/ "../../../../../src/app/layout/nodes/shared/nodes.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NodesService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node__ = __webpack_require__("../../../../../src/app/layout/nodes/shared/node.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_core_http_client_service__ = __webpack_require__("../../../../../src/app/core/http-client.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var NodesService = (function () {
    /************************************************************/
    function NodesService(http, router) {
        this.http = http;
        this.router = router;
        /******** Client Nodes: Source, Observable and List *********/
        this.nodesUpdatedSource = new __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__["Subject"](); /**/
        this.nodesUpdated$ = this.nodesUpdatedSource.asObservable(); /**/
    }
    /**
     * This method do a request for the list of nodes and update the status
     * of nodes source in order to ensure that subscribers will fire
     * subscribe event and update their list of sdn nodes
     * @param callback
     */
    NodesService.prototype.getNodes = function (callback) {
        var _this = this;
        // TODO: hacer el get de las nodes ya iniciadas en el server y llamar el
        // metodo updateNodes
        var response = this.http.get('/services/sdn/nodes').finally(function () {
            if (callback) {
                callback.apply();
            }
        });
        response.subscribe(function (data) {
            _this.nodes = data;
            _this.updateNodes(data);
        }, function (error) {
            console.log(error);
            // this.notification.error('Cannot Login!');
        });
    };
    /**
     * This add a new node to sdn and notify the result
     * @param node {object} An object with sdn nodes parameters
     * @param callback
     */
    NodesService.prototype.addNode = function (node, callback) {
        var _this = this;
        var response = this.http.post('/services/sdn/nodes', node).finally(function () {
            if (callback) {
                callback.apply();
            }
        });
        response.subscribe(function (data) {
            _this.nodes.push(new __WEBPACK_IMPORTED_MODULE_0__node__["a" /* Node */](node));
            _this.updateNodes(_this.nodes);
            console.log(data);
        }, function (error) {
            console.log(error);
            // this.notification.error('Cannot Login!');
        });
        return response;
    };
    NodesService.prototype.updateNodes = function (nodes) {
        // crear servicio con sistema de loading y loader component
        this.nodesUpdatedSource.next(nodes);
    };
    return NodesService;
}());
NodesService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2_app_core_http_client_service__["a" /* HttpClientService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_app_core_http_client_service__["a" /* HttpClientService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object])
], NodesService);

var _a, _b;
//# sourceMappingURL=nodes.service.js.map

/***/ })

});
//# sourceMappingURL=nodes.module.chunk.js.map