export class DnsRecord {

  private dnsRecord: string;

  constructor(data?) {
    console.log(data);
    this.dnsRecord = data || '';
  }

}
