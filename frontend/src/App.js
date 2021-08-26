import React from 'react';
import './App.css';

import TVShows from './TVShows';
import Books from './Books';
import Albums from './Albums';

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          checkout: [],
          buttons: [false, false, false]
      };
  }

  componentDidMount() {
      console.log('COMPONENT DID MOUNT');
      fetch('http://localhost:3001/recommendations/')
          .then(response => response.json())
          .then((data) => {
              console.log('This is your data', data);
              this.setState(
                  (prevState) => { return { checkout: data } }
              )
          });
  }

  postData(event, itemName, itemType, buttonId) {
      event.preventDefault();
      console.log("POST DATA");
      let data = { item: itemName, type: itemType, button: buttonId };
      console.log(data);
      let options = {
          method: 'post',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      }
      fetch('http://localhost:3001/recommendations/post', options)
          .then(response => response.json())
          .then(data => console.log('This is your posted data', data.info));
  }

  deleteData(itemName) {
      console.log('DELETE DATA');
      let data = { item: itemName };
      let options = {
          method: 'delete',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      }
      fetch('http://localhost:3001/recommendations/delete', options)
          .then(response => response.json())
          .then(data => console.log('This is your deleted data', data.info));
  }

  updateData(itemName, itemType) {
      console.log('UPDATE DATA');
      let data = { item: itemName };
      let options = {
          method: 'put',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      }
      fetch('http://localhost:3001/recommendations/update', options)
          .then(response => response.json())
          .then(data => console.log('This is your updated data', data.info));
  }

  getData() {
      console.log('GET DATA');
      fetch('http://localhost:3001/recommendations/')
          .then(response => response.json())
          .then(data => {
              console.log('This is your get data', data);
              this.setState(
                  (prevState) => { return { checkout: data } }
              )
          });
      return this.state.checkout;
  }

  findData(itemName) {
      console.log('FIND DATA');
      let data = { item: itemName };
      let options = {
          method: 'post',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      }
      return fetch('http://localhost:3001/recommendations/find', options)
          .then(response => response.json())
          .then(data => {
              console.log('This is your found data', data.info);
              return data.info;
          });
  }

  clearData() {
      let options = {
          method: 'delete',
          headers: {
              'Content-Type': 'application/json'
          }
      }
      fetch('http://localhost:3001/recommendations/clear', options)
          .then(response => response.json())
          .then(data => console.log('This is your cleared data', data.info));
  }

  handleChange(event) {
      this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div className="App">
        <header id="header">Welcome!</header>
        <h1 id="pageTitle">RecsCreational</h1>

        <div className="navbar">
          <div className="navbarleft">
            <a href="#tvshows">&emsp;TV Shows&emsp;</a>
            <a href="#books">&emsp;Books&emsp;</a>
            <a href="#music">&emsp;Music&emsp;</a>
            </div>
            <div className="navbarright">
              <button onClick={(e) => { checkout(this, e) }}>Check Out</button>
              <button onClick={() => { clear(this) }}>Clear Bin</button>
              <button onClick={() => { reset(this) }}>Reset Preferences</button>
              <button id="share" onClick={() => { share() }}>Share</button>
              <div className="modalBox" id="shareBox">
                <div>
                  <span className="modalClose" id="shareClose">&times;</span>
                  <input type="text" id="friendPhone" size="30" placeholder="(Enter your friend's phone number)" /> OR
                  <input type="text" id="friendEmail" size="45" placeholder="(Enter your friend's email address)" />
                  <input type="button" id="shareSubmit" value="Submit" />
                  <input type="reset" id="shareReset" />
                  <div id="confirmShare"></div>
                </div>
              </div>
            </div>
        </div>

        <div className="modalBox" id="checkoutBox">
          <span className="modalClose" id="checkoutClose">&times;</span>
          <div id="checkoutMessage"></div>
        </div>

        <p> Subscribe for monthly recommendations directly to your inbox!</p>
        <button id="subscribe" className="button" onClick={() => { subscribe() }}>Subscribe!</button><br></br>

        <div className="modalBox" id="subscribeBox">
          <div>
            <span className="modalClose" id="subscribeClose">&times;</span>
            <input type="text" id="name" size="25" placeholder="(Enter your name)" />&nbsp;
            <input type="text" id="email" size="45" placeholder="(Enter your email address)" />&nbsp;&nbsp;
            <input type="button" id="submit" value="Submit" />&nbsp;
            <input type="reset" id="reset" />
            <div id="confirmEmail"></div>
          </div>
        </div>

        <TVShows componentData={this} />

        <Books componentData={this} />

        <Albums componentData={this} />

        <footer id="pageEnd">
          Thanks for visiting! See you later!
          <p id="backToTop">
            <a href="#pageTitle">Back to Top</a>
          </p>
        </footer>

        </div>
    );
  }
}

function subscribe() {
  const modalBox = document.getElementById('subscribeBox');
  modalBox.style.display = "block";

  const modalClose = document.getElementById('subscribeClose');
  modalClose.onclick = function () {
      modalBox.style.display = "none";
  }

  const submit = document.getElementById('submit');
  const confirm = document.getElementById('confirmEmail');

  submit.onclick = function () {
      const name = document.getElementById('name');
      const nameRegex = new RegExp('[A-Za-z]+');
      if (nameRegex.test(name.value)) {
          const email = document.getElementById('email');
          const emailRegex = new RegExp('[A-Za-z0-9.]+@[A-Za-z]+.[A-Za-z]{3}');
          if (emailRegex.test(email.value)) {
              confirm.innerHTML = "Is this your correct email address: &nbsp" + email.value + " ? &nbsp";
              let yes = "<input type='button' id='submitResponse' value='Yes'>";
              let no = "<input type='button' id='tryAgain' value='No'>";
              confirm.innerHTML += yes + "&nbsp" + no;
              const submitResponse = document.getElementById('submitResponse');
              const tryAgain = document.getElementById('tryAgain');
              submitResponse.onclick = function () {
                  const header = document.getElementById('header');
                  header.innerHTML = "Welcome " + name.value + "!";
                  confirm.innerHTML = "You're subscribed! You'll receive personalized recommendations straight to your inbox!";
                  name.value = "";
                  email.value = "";
              }
              tryAgain.onclick = function () {
                  confirm.innerHTML = "Try again.";
                  email.value = "";
              }
          } else {
              confirm.innerHTML = "Email address is invalid. Please try again."
          }
      } else {
          confirm.innerHTML = "Please enter your name."
      }
  }

  const reset = document.getElementById('reset');
  reset.onclick = function () {
      confirm.innerHTML = "";
  }
}

function checkout(props, e) {
  props.handleChange(e);
  const modalBox = document.getElementById('checkoutBox');
  modalBox.style.display = "block";

  const modalClose = document.getElementById('checkoutClose');
  modalClose.onclick = function () {
      modalBox.style.display = "none";
  }
  let checkoutMessage = document.getElementById('checkoutMessage');
  checkoutMessage.innerHTML = "<h3>Here are the items you've checked out:</h3><p>(Click to remove any item. May need to refresh page.)</p>";

  if (props.state.checkout.length === 0) {
      checkoutMessage.innerHTML += "No items yet. Go back and add some items!";
  }

  props.state.checkout.info.forEach(function (item, index) {
      var button = document.createElement("button");
      button.name = "addToCheckout";
      button.innerText = item.type + ": " + item.item;
      checkoutMessage.appendChild(button);
      button.addEventListener("click", function (e) {
          console.log('clicked!');
          props.deleteData(item.item);
          checkoutMessage.removeChild(button);
      })
  })
}
  
function clear(props) {
  props.clearData();
  if (props.state.buttons[0] &&
      (document.getElementById('radioDramaFantasy').checked ||
          document.getElementById('radioComedy').checked ||
          document.getElementById('radioCrimeDrama').checked ||
          document.getElementById('radioActionAdventure').checked)) {
      const addTVShow1 = document.getElementById('addTVShow1');
      addTVShow1.textContent = "Add to Checkout";
      addTVShow1.style = "background-color: snow, color: tomato";
      const addTVShow2 = document.getElementById('addTVShow2');
      addTVShow2.textContent = "Add to Checkout";
      addTVShow2.style = "background-color: snow, color: tomato";
      const addTVShow3 = document.getElementById('addTVShow3');
      addTVShow3.textContent = "Add to Checkout";
      addTVShow3.style = "background-color: snow, color: tomato";
      const addTVShow4 = document.getElementById('addTVShow4');
      addTVShow4.textContent = "Add to Checkout";
      addTVShow4.style = "background-color: snow, color: tomato";
  }

  const booksMenu = document.getElementById('booksMenu');
  if (props.state.buttons[1] && booksMenu[booksMenu.selectedIndex].value !== "select") {
      const addBook1 = document.getElementById('addBook1');
      addBook1.textContent = "Add to Checkout";
      addBook1.style = "background-color: snow, color: tomato";
      const addBook2 = document.getElementById('addBook2');
      addBook2.textContent = "Add to Checkout";
      addBook2.style = "background-color: snow, color: tomato";
      const addBook3 = document.getElementById('addBook3');
      addBook3.textContent = "Add to Checkout";
      addBook3.style = "background-color: snow, color: tomato";
      const addBook4 = document.getElementById('addBook4');
      addBook4.textContent = "Add to Checkout";
      addBook4.style = "background-color: snow, color: tomato";
  }

  if (props.state.buttons[2] &&
      (document.getElementById('radioPop').checked ||
          document.getElementById('radioHipHop').checked ||
          document.getElementById('radioRock').checked ||
          document.getElementById('radioKPop').checked)) {
      const addAlbum1 = document.getElementById('addAlbum1');
      addAlbum1.textContent = "Add to Checkout";
      addAlbum1.style = "background-color: snow, color: tomato";
      const addAlbum2 = document.getElementById('addAlbum2');
      addAlbum2.textContent = "Add to Checkout";
      addAlbum2.style = "background-color: snow, color: tomato";
      const addAlbum3 = document.getElementById('addAlbum3');
      addAlbum3.textContent = "Add to Checkout";
      addAlbum3.style = "background-color: snow, color: tomato";
      const addAlbum4 = document.getElementById('addAlbum4');
      addAlbum4.textContent = "Add to Checkout";
      addAlbum4.style = "background-color: snow, color: tomato";
  }
}

function reset(props) {
  document.location.reload();
}

function share(props) {
  const modalBox = document.getElementById('shareBox');
  modalBox.style.display = "block";

  const modalClose = document.getElementById('shareClose');
  modalClose.onclick = function () {
      modalBox.style.display = "none";
  }

  const submit = document.getElementById('shareSubmit');
  const confirm = document.getElementById('confirmShare');

  submit.onclick = function () {
      const phone = document.getElementById('friendPhone');
      const email = document.getElementById('friendEmail');
      const phoneRegex = new RegExp('^(\()*[0-9]{3}(\))*[\-\s.]*[0-9]{3}[\-\s.]*[0-9]{4}$');
      const emailRegex = new RegExp('[A-Za-z0-9.]+@[A-Za-z]+.[A-Za-z]{3}');
      if (phone.value.length !== 0) {
          if (!phoneRegex.test(phone.value)) {
              confirm.innerHTML = "Phone number is invalid. Please try again."
              if (email.value.length !== 0) {
                  if (emailRegex.test(email.value)) {
                      confirm.innerHTML += "<br/>Your items have been shared with " + email.value + ".";
                  } else {
                      confirm.innerHTML = "Phone number and email address are invalid. Please try again.";
                  }
                  email.value = "";
              }
          } else {
              confirm.innerHTML = "Your items have been shared with " + phone.value;
              if (email.value.length !== 0) {
                  if (emailRegex.test(email.value)) {
                      confirm.innerHTML += " and " + email.value + ".";
                  } else {
                      confirm.innerHTML += ".<br/>Email address is invalid. Please try again.";
                  }
                  email.value = "";
              } else {
                  confirm.innerHTML += ".";
              }
          }
          phone.value = "";
      } else if (email.value.length !== 0) {
          if (emailRegex.test(email.value)) {
              confirm.innerHTML = "Your items have been shared with " + email.value + ".";
          } else {
              confirm.innerHTML = "Email address is invalid. Please try again.";
          }
          email.value = "";
      } else {
          confirm.innerHTML = "Please enter either a phone number or email address."
      }
  }

  const reset = document.getElementById('shareReset');
  reset.onclick = function () {
      confirm.innerHTML = "";
  }
}

export default App;
