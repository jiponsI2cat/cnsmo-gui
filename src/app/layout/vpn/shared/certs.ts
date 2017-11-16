export class Certs {

    public cert: string;
    public key: string;
    public ca: string;
    public config: string;

    constructor(data?) {
        const cert = data || {};
        this.cert = cert.cert;
        this.key = cert.key;
        this.ca = cert.ca;
        this.config = cert.config;
    }

}
