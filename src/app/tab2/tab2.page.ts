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
  NetworkCurrencyPublic, // これはsymを送金するもの
  TransactionService,
  Listener,
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
    // 受け取りアドレスはデスクトップウォレットで作成したウォレットのアドレスがいいかと思います
    const rawAddress = 'TBFOFT-ZIFH3G-GXFBYO-WXMN6M-YM2LBU-43PMHH-6EBS';
    // アドレスの文字列から受信するアドレスを復元する
    const recipientAddress = Address.createFromRawAddress(rawAddress);
    // ネットワークタイプの選択
    const networkType = NetworkType.TEST_NET;
    // 送信モザイクのid
    const networkCurrencyMosaicId = new MosaicId('51A99028058245A8');
    // ６乗
    const networkCurrencyDivisibility = 6;
    // トランザクションの作成
    // const transferTransaction = TransferTransaction.create(
    //     Deadline.create(),
    //     recipientAddress,
    //     [new Mosaic (networkCurrencyMosaicId,
    //         UInt64.fromUint(10 * Math.pow(10, networkCurrencyDivisibility)))], // 10の６乗することで送信する通貨を1単位にすることができる
    //     PlainMessage.create('This is a test message'),
    //     networkType,
    //     UInt64.fromUint(2000000));
    const transferTransaction = TransferTransaction.create(
      Deadline.create(),
      recipientAddress,
      // NetworkCurrencyPublicでsymbol.xymを指定することができます
      [NetworkCurrencyPublic.createAbsolute(10)],
      PlainMessage.create('This is a test message'),
      networkType,
      UInt64.fromUint(20000)
    );
    /* end block 01 */

    /* start block 02 */
    /**
     * 送信者のプライベートキー
     * この部分はアカウントを作成して蛇口から回収しておくと楽しいかもしれません
     */
    const privateKey = '6DC6BA3220098E81297220ED760A482C2DEFF456B318F2BBAE48385C81340180';
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
    const transactionRepository = repositoryFactory.createTransactionRepository();
    const receiptRepository = repositoryFactory.createReceiptRepository();
    const wsEndpoint = nodeUrl.replace('http', 'ws');
    const listener = new Listener(wsEndpoint, WebSocket);
    const transactionService = new TransactionService(transactionRepository, receiptRepository);

    console.log(signedTransaction.hash);

    // これを使うと, トランザクションのアナウンスが成功したか、どんなエラーが返ってきたか確認することができます
    listener.open().then(() => {
      transactionService.announce(signedTransaction, listener).subscribe(
        (x) => {
          console.log(x);
          listener.close();
        }, (err) => {
          console.error(err);
          listener.close();
        }
      );
    }).catch((err) => {
      console.error(err);
    });
  }

}
