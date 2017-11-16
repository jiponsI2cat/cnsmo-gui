import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-certs',
  templateUrl: './certs.component.html',
  styleUrls: ['./certs.component.scss']
})
export class CertsComponent implements OnInit {

  private exampleText = `
  -----BEGIN PRIVATE KEY-----
  MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDPaRGzmxP1yPu7
  QQetW0/psKjJTE5UXX0Fb3Kg47ZY1cwBaip50LR6PVseU7ZrXnr0FGgeGSyXA0lw
  3nwkExWzUAOZEOggfzEuMcx/izBixCprgpArDn+8rfSXDoNpzeESrtRf/L+mzMoU
  n063GHi/6tx58knbbeamkJSHwUtPvhUf0IKRZSLiO6A6MH/uyeIdt9IWsa8rTHyD
  /Jb57BNJ5uUv9PbI0Xu8eE3FSwUbD7TY/0ILpWyf5HUxB942bMywBO3ng59hZFFE
  LbljZvOVcmxeFPxmX+TyfERP4hUeyX4lBDHaRvrzUbhYo+lF2jY5Du81Uk4OKJRf
  CHyTmaZpAgMBAAECggEARXXuk7PPz3RruZ5hr9DwxlZ/cEq5wM8+W1+jh/Y6zy1q
  kN65MuqORpHdvh5S7UpK6wsag1ny8PAM3FvmPz6U+eRGEDD1TEzMb6gF0IEQx0Li
  4fZryb+lT88CJsSZhgmI4vTh8vN2S6ox0w43EmKDreI9zCk0SuRXZljtJTm6uw1X
  NYvu1Fpfd8vm4EeZDj+Mr5k5cveqMg9KfG6U3CrFrcG45qrv9Uu2TPJUcLTxicyy
  VWgaOBsZCsUYQErlqWQeHrJfttf3QNA1B1HFGsZ/vNs20ag01iesydVr2+ykDLLl
  sS5isXXAEIMGbgPJ/npJdt3U5UWsQ1hXaC9cTMx9sQKBgQDoD8YfMevtgw4VtTqd
  jnkKHmlLaKhUECJCFpNLs4pCv+kn028WOjqCrzRLXvOXH48CsGTj/iScssTaCF8i
  MK4cXOrikWFi7fF/v/FEOeOvMMM39g8aFj38D4YN/7booBvicyWJVIruoJ/5ANxz
  HL4i77uLIwxGAIz2dPU5QInt5wKBgQDkzlAKcZvIT+HVlhnXHFTSaJYhY1Pl7vby
  fMuVJULEWw//a9/kYUp2UJUgpNgUdvlwfU0oEdOozpXvur+GvPzi9bzkLZf4gtnn
  9qZoazVqhL/Fcue3IQETjxh8AEnHv95V5Zws4vKSJuUspSe2VRpNl7cwtsBwLUey
  n5SWRsgfLwKBgDxctgUxQBQkzcoZvOh0wck/BdaGn5pWJAMayi+bwPAB6Uzhs3iN
  puCNYEXmqef6XoGtjmC7n5xe59Nq8Av9q5xXEwXiGPnZuMKpE8HSaQYN4gmxaFY5
  yN/CzfTgOhyiYP5zQyVIp2bQwyvK7IzIwjBmOVtEv5GJ3SDSZWMCBZ6rAoGAXcn0
  JVPMd5/HArY0gWirnFQitizxBx+dOmjNSqWraLGrLRga/pKi4zzE5EyuBjV+qg2y
  wuoLyPZln479U03Em4P/mcjWspdwmxUPwV2w16jysw0WzopI1quhbbLwi2Cq0qr8
  Cao9pIstBc/tJ2BbF9NI1D8VQuZMrXucfL0m6yECgYBjdmOcLBCIb9Fj3RXpXSQI
  BCD1dyfK3c0EZwsF2kLbuvE51WoHQh+NDEs+M+zexO1Ib7+FwtL4QmpTblPPxmnb
  TwxFoc/t5pYRC5OXkyfCDGpwFKaEjVz6h+oIioSIIDXXmOEKVP9NFW3RCmXVzCj+
  Guvib95XO/q0CKS97BiWCA==
  -----END PRIVATE KEY-----
  `;

  constructor() { }

  ngOnInit() {
  }

}
