import Service from "crud-lib/Service";

export default class Controller {
    
    service: Service

    constructor() {
        this.service = new Service();
    }

    message() {
        return this.service.request();
    }

} 