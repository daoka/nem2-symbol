import { Component } from '@angular/core';
// アカウント作成に必要な機能がsymbol-sdkにあります
import {Account, NetworkType} from 'symbol-sdk';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor() {}

  createWallet() {
    // アカウント作成
    const account = Account.generateNewAccount(NetworkType.TEST_NET);
    console.log('Your new account address is:', account.address.pretty(), 'and its private key', account.privateKey);
  }

}
