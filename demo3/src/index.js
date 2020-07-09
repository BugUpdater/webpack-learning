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

sendXHR('/api/user');
sendXHR('/api/address');
