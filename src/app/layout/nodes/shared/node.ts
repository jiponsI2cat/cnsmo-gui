export class Node {

  private instanceId: string;
  private services: string;
  private vpnAddress: string;

  constructor(data?) {
    const node = data || {};
    this.instanceId = node.instanceId;
    this.services = node.services;
    this.vpnAddress = node.vpnAddress;
  }

}
