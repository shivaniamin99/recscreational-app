import React from 'react';

/*Image imports */
import spotify from './images/spotify.jpg';

import plasticHearts from './images/plastic_hearts.jpg';
import sweetener from './images/sweetener.jpg';
import fineLine from './images/fine_line.jpg';
import futureNostalgia from './images/future_nostalgia.jpg';
import astroworld from './images/astroworld.jpg';
import invasionOfPrivacy from './images/invasion_of_privacy.jpg';
import takeCare from './images/take_care.jpg';
import yeezus from './images/yeezus.jpg';
import theDarkSideOfTheMoon from './images/the_dark_side_of_the_moon.jpg';
import abbeyRoad from './images/abbey_road.jpg';
import ledZeppelin from './images/led_zeppelin.jpg';
import hotelCalifornia from './images/hotel_california.jpg';
import blackpink from './images/blackpink.jpg';
import bts from './images/bts.jpg';
import perfectVelvet from './images/perfect_velvet.jpg';
import exo from './images/exo.jpg';

function existsAlready() {
    alert("This item has already been added to your checkout bin! Check out \
    your selected items by clicking the button on the top right.");
}

function AlbumRecs(props) {
    props.state.buttons[2] = true;

    const radioPop = document.getElementById('radioPop');
    const radioHipHop = document.getElementById('radioHipHop');
    const radioRock = document.getElementById('radioRock');
    const radioKPop = document.getElementById('radioKPop');

    const album1 = document.getElementById('album1');
    const album2 = document.getElementById('album2');
    const album3 = document.getElementById('album3');
    const album4 = document.getElementById('album4');

    if (radioPop.checked) {
        album1.src = plasticHearts;
        album1.alt = "Plastic Hearts";
        album2.src = sweetener;
        album2.alt = "Sweetener";
        album3.src = fineLine;
        album3.alt = "Fine Line";
        album4.src = futureNostalgia;
        album4.alt = "Future Nostalgia";
    } else if (radioHipHop.checked) {
        album1.src = astroworld;
        album1.alt = "Astroworld";
        album2.src = invasionOfPrivacy;
        album2.alt = "Invasion of Privacy";
        album3.src = takeCare;
        album3.alt = "Take Care";
        album4.src = yeezus;
        album4.alt = "Yeezus";
    } else if (radioRock.checked) {
        album1.src = theDarkSideOfTheMoon;
        album1.alt = "The Dark Side of the Moon";
        album2.src = abbeyRoad;
        album2.alt = "Abbey Road";
        album3.src = ledZeppelin;
        album3.alt = "Led Zeppelin";
        album4.src = hotelCalifornia;
        album4.alt = "Hotel California";
    } else if (radioKPop.checked) {
        album1.src = blackpink;
        album1.alt = "Blackpink";
        album2.src = bts;
        album2.alt = "BTS";
        album3.src = perfectVelvet;
        album3.alt = "Perfect Velvet";
        album4.src = exo;
        album4.alt = "Exo";
    } else {
        alert("Please select a genre to receive customized recommendations!");
        props.state.buttons[2] = false;
        return;
    }

    const checkoutButtons = document.getElementById('checkoutButtons3');
    checkoutButtons.innerHTML = "";
    for (let i = 1; i <= 4; i++) {
        checkoutButtons.innerHTML += "<button name='addToCheckout' id='addAlbum" + i + "'>Add to Checkout</button>";
    }
    const addAlbum1 = document.getElementById('addAlbum1');
    addAlbum1.onclick = (e) => {
        props.findData(album1.alt).then(response => {
            if (response === false) {
                props.postData(e, album1.alt, "Album", "addAlbum1");
                addAlbum1.textContent = "Checked Out";
                addAlbum1.style = "background-color: yellowgreen; color: white";
            } else { existsAlready(); }
        });
    };
    const addAlbum2 = document.getElementById('addAlbum2');
    addAlbum2.onclick = (e) => {
        props.findData(album2.alt).then(response => {
            if (response === false) {
                props.postData(e, album1.alt, "Album", "addAlbum2");
                addAlbum2.textContent = "Checked Out";
                addAlbum2.style = "background-color: yellowgreen; color: white";
            } else { existsAlready(); }
        });
    };
    const addAlbum3 = document.getElementById('addAlbum3');
    addAlbum3.onclick = (e) => {
        props.findData(album3.alt).then(response => {
            if (response === false) {
                props.postData(e, album3.alt, "Album", "addAlbum3");
                addAlbum3.textContent = "Checked Out";
                addAlbum3.style = "background-color: yellowgreen; color: white";
            } else { existsAlready(); }
        });
    };
    const addAlbum4 = document.getElementById('addAlbum4');
    addAlbum4.onclick = (e) => {
        props.findData(album4.alt).then(response => {
            if (response === false) {
                props.postData(e, album4.alt, "Album", "addAlbum4");
                addAlbum4.textContent = "Checked Out";
                addAlbum4.style = "background-color: yellowgreen; color: white";
            } else { existsAlready(); }
        });
    };
}

function Albums(props) {
    return (
        <div className="category">
            <div className="subheading" id="music">Music Album Recommendations</div>
            <div className="selection">
                <form>
                    <input type="radio" id="radioPop" name="music" value="Pop" />Pop&emsp;
                <input type="radio" id="radioHipHop" name="music" value="HipHop" />Hip Hop&emsp;
                <input type="radio" id="radioRock" name="music" value="Rock" />Rock&emsp;
                <input type="radio" id="radioKPop" name="music" value="KPop" />KPop&emsp;&emsp;
                <input type="button" className="button" onClick={() => { AlbumRecs(props.componentData) }} value="Find Albums!" />
                </form>
            </div>

            <img src={spotify} id="album1" alt="Recommendation incoming" />
            <img src={spotify} id="album2" alt="Recommendation incoming" />
            <img src={spotify} id="album3" alt="Recommendation incoming" />
            <img src={spotify} id="album4" alt="Recommendation incoming" />
            <div id="checkoutButtons3"></div>
        </div>
    )
}

export default Albums;
