import { Component } from '@angular/core';
import {
  Account,
  Address,
  Deadline,
  Mosaic,
  MosaicId,
  NetworkType,
  PlainMessage,
  RepositoryFactoryHttp,
  TransferTransaction,
  UInt64,
} from 'symbol-sdk';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor() {}

  semdSymbol() {
    const rawAddress = 'TBONKW-COWBZY-ZB2I5J-D3LSDB-QVBYHB-757VN3-SKPP';
    const recipientAddress = Address.createFromRawAddress(rawAddress);
    // replace with network type
    const networkType = NetworkType.TEST_NET;
    // replace with symbol.xym id
    const networkCurrencyMosaicId = new MosaicId('51A99028058245A8');
    // replace with network currency divisibility
    const networkCurrencyDivisibility = 6;

    const transferTransaction = TransferTransaction.create(
        Deadline.create(),
        recipientAddress,
        [new Mosaic (networkCurrencyMosaicId,
            UInt64.fromUint(10 * Math.pow(10, networkCurrencyDivisibility)))],
        PlainMessage.create('This is a test message'),
        networkType,
        UInt64.fromUint(2000000));
  }

}
