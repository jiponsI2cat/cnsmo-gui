export class Rule {

  private direction: string;
  private protocol: string;
  private dst_port: string;
  private dst_src: string;
  private ip_range: string;
  private action: string;

  constructor(data?) {
    const rule = data || {};
    this.direction = rule.direction;
    this.protocol = rule.protocol;
    this.dst_port = rule.dst_port.toString();
    this.dst_src = rule.dst_src;
    this.ip_range = rule.ip_range;
    this.action = rule.action;
  }

}
