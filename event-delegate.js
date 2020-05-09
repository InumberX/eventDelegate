/*!
 * event-delegate.js v1.0.0
 * https://github.com/InumberX/eventDelegate
 * (c) 2020-2020 N/NE
 * Released under the MIT License.
 */

/*------------------------------------------
  Polyfill
--------------------------------------------*/
// IE11対応
if (!Element.prototype.matches && Element.prototype.msMatchesSelector) {
 Element.prototype.matches = Element.prototype.msMatchesSelector;
}

/*------------------------------------------
  イベントを設定する処理 / Set event
--------------------------------------------*/
document.setEventDelegate = function (
 eventDelegateTypes,
 eventDelegateAction,
 eventDelegateTarget
) {
 actEventDelegate(eventDelegateTypes, eventDelegateAction, eventDelegateTarget);
};

window.setEventDelegate = function (
 eventDelegateTypes,
 eventDelegateAction,
 eventDelegateTarget
) {
 actEventDelegate(eventDelegateTypes, eventDelegateAction, eventDelegateTarget);
};

Element.prototype.setEventDelegate = function (
 eventDelegateTypes,
 eventDelegateAction,
 eventDelegateTarget
) {
 actEventDelegate(eventDelegateTypes, eventDelegateAction, eventDelegateTarget);
};

function actEventDelegate(
 eventDelegateTypes,
 eventDelegateAction,
 eventDelegateTarget
) {
 // イベント名をカンマ区切りで配列にする
 eventDelegateTypes = eventDelegateTypes.split(',');
 // 指定されたイベント分だけ処理を設定する
 for (
  let i = 0, iLength = eventDelegateTypes.length;
  i < iLength;
  i = (i + 1) | 0
 ) {
  // イベントが発火した時の処理
  this.addEventListener(
   eventDelegateTypes[i],
   function (e) {
    let el = e.target;
    // 親セレクタに当たるまで親要素を参照する
    while (el && el !== this) {
     // matchesが使用できない場合
     if (typeof el.matches !== 'function') {
      break;
     }
     // 指定した要素にマッチした場合
     else if (el.matches(eventDelegateTarget)) {
      // thisを束縛して処理を行う
      eventDelegateAction.call(el, e);
      break;
     }
     el = el.parentNode;
    }
   },
   false
  );
 }
}
