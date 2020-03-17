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

  sendSymbol() {
    /* start block 01 */
    // 受け取りアドレス
    const rawAddress = 'TBONKW-COWBZY-ZB2I5J-D3LSDB-QVBYHB-757VN3-SKPP';
    // アドレスの文字列から受信するアドレスを復元する
    const recipientAddress = Address.createFromRawAddress(rawAddress);
    // ネットワークタイプの選択
    const networkType = NetworkType.TEST_NET;
    // 送信モザイクのid
    const networkCurrencyMosaicId = new MosaicId('51A99028058245A8');
    // ６乗
    const networkCurrencyDivisibility = 6;
    // トランザクションの作成
    const transferTransaction = TransferTransaction.create(
        Deadline.create(),
        recipientAddress,
        [new Mosaic (networkCurrencyMosaicId,
            UInt64.fromUint(10 * Math.pow(10, networkCurrencyDivisibility)))], // 10の６乗することで送信する通貨を1単位にすることができる
        PlainMessage.create('This is a test message'),
        networkType,
        UInt64.fromUint(2000000));
    /* end block 01 */

    /* start block 02 */
    // 送信者のプライベートキー
    const privateKey = '1111111111111111111111111111111111111111111111111111111111111111';
    // プライベートキーからアカウントを復元
    const account = Account.createFromPrivateKey(privateKey, networkType);
    // ジェネレーションハッシュはノードに必ず一つあります
    const networkGenerationHash = '44D2225B8932C9A96DCB13508CBCDFFA9A9663BFBA2354FEEC8FCFCB7E19846C';
    // トランザクションに署名します。transferTransactionとnetworkGenerationHashが必要になります
    const signedTransaction = account.sign(transferTransaction, networkGenerationHash);
    /* end block 02 */

    /* start block 03 */
    // nodeのエンドポイントを指定します。動いていないノードを選択すると送金できません
    const nodeUrl = 'http://api-01.us-west-1.symboldev.network:3000';
    // アドレスからどのノードなのかを指定
    const repositoryFactory = new RepositoryFactoryHttp(nodeUrl);
    // ブロックにトランザクションを書き込む
    const transactionHttp = repositoryFactory.createTransactionRepository();

    transactionHttp
        .announce(signedTransaction)
        .subscribe((x) => console.log(x), (err) => console.error(err));
    /* end block 03 */
  }

}
