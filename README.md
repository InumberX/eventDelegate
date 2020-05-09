# はじめに

eventDelegate（イベントデリゲート）は、その名の通りイベントデリゲートを利用できるようにするライブラリです。<br>
イベントデリゲートは、イベントバブリング（子要素で発生したイベントが親要素に伝播して親要素のイベントが発生すること）の仕組みを利用しています。<br>
イベントデリゲートを利用することにより処理を親要素に設定できるため、以下のような効果が期待できます。<br>

- 複数の要素に共通の処理を設定する場合（画面内の全ての a タグに click イベントを設定したいなど）、処理自体は親要素のみに設定されるためブラウザの負荷軽減につながります
- 親要素に処理を設定するため、対象となる要素が非同期処理などで後から追加された要素であっても処理が実行されます

# 使い方

HTML 上で「event-delegate.js」もしくは「event-delegate.min.js」を読み込んでください。

```
<script src="event-delegate.js"></script>
or
<script src="event-delegate.min.js"></script>
```

処理の設定は「setEventDelegate メソッド」で行います。
引数には以下を指定してください。

- 第 1 引数：イベント名（カンマ区切りで複数指定可能）
- 第 2 引数：イベント発火時の処理
- 第 3 引数：イベント発火対象の要素

使用例は以下となります。

```
document.setEventDelegate(
 'click,change',
 function (e) {
  alert(this.id + ' is ' + e.type);
 },
 'button,input[type="text"]'
);

document.querySelector('body').setEventDelegate(
 'change',
 function (e) {
  alert(this.id + ' is ' + e.type);
 },
 '#XXX'
);
```
