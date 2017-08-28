import { TestBed, inject } from '@angular/core/testing';

import { FirewallService } from './firewall.service';

describe('FirewallService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirewallService]
    });
  });

  it('should be created', inject([FirewallService], (service: FirewallService) => {
    expect(service).toBeTruthy();
  }));
});
