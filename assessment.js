'use struct'
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivision = document.getElementById('result-area');
const tweetDivision = document.getElementById('tweet-area');

assessmentButton.addEventListener(
  'click',
  /* 無名関数 */
  // function (){
  //   console.log('ボタンを推されました');
  // }
  () => {
    const userName = userNameInput.value;

    if (userName.length === 0) {
      return;
    }
    /* 値の初期化 これをすることで配下の要素も削除される。 */
    resultDivision.innerText = '';
    tweetDivision.innerText = '';
    //tweetのaタグを作成
    // ヘッダー作成
    /*
    const header = document.createElement('h3');
    // 文字列の登録
    header.innerText = '診断結果';
    
    resultDivision.appendChild(header);
    // 表示エリアに追加
    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivision.appendChild(paragraph);
    */

    //headerDivisionの作成
    const headerDivision = document.createElement('div');
    headerDivision.setAttribute('class','card-header text-bg-info');
    headerDivision.innerText="診断結果";

    //bodyDivisionの作成
    const bodyDivision = document.createElement('div');
    bodyDivision.setAttribute('class','card-body');


    const paragraph = document.createElement('p');
    paragraph.setAttribute('class','card-text');
    const result=assessment(userName);
    paragraph.innerText = result;
    bodyDivision.appendChild(paragraph);

    resultDivision.setAttribute('class','card');
    resultDivision.appendChild(headerDivision);
    resultDivision.appendChild(bodyDivision);
    console.log(userName);

    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=' +
      encodeURIComponent('あなたのいいところ診断') +
      '&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href', hrefValue);
    anchor.setAttribute('class', 'twitter-hashtag-button');
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたのいいところ';
    tweetDivision.appendChild(anchor);

    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivision.appendChild(script);


  }
);

userNameInput.addEventListener(
  'keydown',
  (event) => {
    if(event.code === 'Enter'){
      assessmentButton.dispatchEvent(new Event('click'));
    }
  }
)

const answers = [
  '###userName###のいいところは声です。###userName###の特徴的な声は皆を惹きつけ、心に残ります。',
  '###userName###のいいところはまなざしです。###userName###に見つめられた人は、気になって仕方がないでしょう。',
  '###userName###のいいところは情熱です。###userName###の情熱に周りの人は感化されます。',
  '###userName###のいいところは厳しさです。###userName###の厳しさがものごとをいつも成功に導きます。',
  '###userName###のいいところは知識です。博識な###userName###を多くの人が頼りにしています。',
  '###userName###のいいところはユニークさです。###userName###だけのその特徴が皆を楽しくさせます。',
  '###userName###のいいところは用心深さです。###userName###の洞察に、多くの人が助けられます。',
  '###userName###のいいところは見た目です。内側から溢れ出る###userName###の良さに皆が気を惹かれます。',
  '###userName###のいいところは決断力です。###userName###がする決断にいつも助けられる人がいます。',
  '###userName###のいいところは思いやりです。###userName###に気をかけてもらった多くの人が感謝しています。',
  '###userName###のいいところは感受性です。###userName###が感じたことに皆が共感し、わかりあうことができます。',
  '###userName###のいいところは節度です。強引すぎない###userName###の考えに皆が感謝しています。',
  '###userName###のいいところは好奇心です。新しいことに向かっていく###userName###の心構えが多くの人に魅力的に映ります。',
  '###userName###のいいところは気配りです。###userName###の配慮が多くの人を救っています。',
  '###userName###のいいところはその全てです。ありのままの###userName###自身がいいところなのです。',
  '###userName###のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる###userName###が皆から評価されています。'
];


/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {StringString} userName ユーザーの名前
 * @returns ｛String｝ 診断結果
 */
function assessment(userName) {
  let sum = 0;

  for (let i = 0; i < userName.length; i++) {
    sum += userName.charCodeAt(i);
  }

  let index = sum % answers.length;

  let result = answers[index];

  result = result.replaceAll('###userName###', userName);

  return result;
}

// console.log(assessment('太郎'));
// console.log(assessment('次郎'));
// console.log(assessment('太郎'));

function test() {
  let name = '太郎'
  console.log(name);
  console.assert(assessment(name) === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。', '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。');
  name = '次郎'
  console.log(name);
  console.assert(assessment(name) === '次郎のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる次郎が皆から評価されています。', '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。');
  name = '花子'
  console.log(name);
  console.assert(assessment(name) === '花子のいいところはまなざしです。花子に見つめられた人は、気になって仕方がないでしょう。', '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。');

  name = '太郎'
  console.log(name);
  console.assert(assessment(name) === assessment(name), '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。');
  name = '次郎'
  console.log(name);
  console.assert(assessment(name) === assessment(name), '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。');
  name = '花子'
  console.log(name);
  console.assert(assessment(name) === assessment(name), '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。');
  console.log('診断結果の文章のテスト終了');
}

let obake = document.getElementById("image");
let degree = 0 ;
function rotateHeading(){
  degree += 6;
  degree = degree % 360;
  if(degree === 90){
    // obake.setAttribute('src', 'img/omote.PNG');
    //obake.setAttribute('src', 'img/image.png');
    
  }else if(degree === 270 ){
    // obake.setAttribute('src', 'img/ura.PNG');
    //obake.setAttribute('src', 'img/image.png');

  }
  obake.style.transform = 'rotateY('+degree + 'deg)'; 
}
setInterval(rotateHeading,100);
