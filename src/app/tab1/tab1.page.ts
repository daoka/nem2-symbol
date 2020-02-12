import { Component } from '@angular/core';
import {NetworkType, Password, SimpleWallet} from 'nem2-sdk';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor() {}

  createWallet() {
    const password = new Password('password');

    const wallet = SimpleWallet.create('wallet-name', password, NetworkType.TEST_NET);
    const account = wallet.open(password);
    console.log('Your new account address is:', account.address.pretty(), 'and its private key', account.privateKey);
    /* end block 01 */
  }

}
