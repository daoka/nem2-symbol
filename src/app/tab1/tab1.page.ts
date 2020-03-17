import { Component } from '@angular/core';
import {Account, NetworkType} from 'symbol-sdk';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor() {}

  createWallet() {
    const account = Account.generateNewAccount(NetworkType.TEST_NET);
    console.log('Your new account address is:', account.address.pretty(), 'and its private key', account.privateKey);
  }

}
