var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Pipe } from "@angular/core";
export var PurchaseDatePipe = (function () {
    function PurchaseDatePipe() {
        this.monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        this.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    }
    PurchaseDatePipe.prototype.transform = function (dateString, args) {
        var date = new Date(dateString);
        return this.days[date.getDay()] + " " + date.getDate() + " " + this.monthNames[date.getMonth()] + " " + date.getFullYear() + ", " + date.getHours() + ":" + ((date.getMinutes() < 10 ? '0' : '') + date.getMinutes());
    };
    PurchaseDatePipe = __decorate([
        Pipe({
            name: 'purchaseDate'
        }), 
        __metadata('design:paramtypes', [])
    ], PurchaseDatePipe);
    return PurchaseDatePipe;
}());
//# sourceMappingURL=/home/kraytsman/workspace/softjourn/sj_coins_vending_frontend/src/src/app/purchases/shared/purchase-date.pipe.js.map