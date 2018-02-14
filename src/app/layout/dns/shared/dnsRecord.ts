export class DnsRecord {

  public dnsRecord: string;

  constructor(data?) {
    console.log(data);
    this.dnsRecord = data || '';
  }

}
