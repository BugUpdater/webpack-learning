// import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';

// import './style.css';
import './style';

console.log('index');

// XHR
const sendXHR = url => {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onload = function () {
    console.log('invoke api:', xhr.response);
  }
  xhr.send();
};

// sendXHR('/user');
// sendXHR('/address');

// sendXHR('/api/user');
// sendXHR('/api/address');

// 利用 webpack.DefinePlugin 注入环境变量
let url;
if (DEV_ENV === 'production') {
  url = 'http://www.example.com';
} else {
  url = 'http://localhost:3000';
}
console.log(`\n【 url 】===>\n`, url);

console.log(`\n【 BoolTest 】===>\n`, typeof BoolTest === 'boolean');
console.log(`\n【 NumberTest1 】===>\n`, NumberTest1);
console.log(`\n【 NumberTest2 】===>\n`, NumberTest2);
console.log(`\n【 NumberTest3 】===>\n`, NumberTest3);
