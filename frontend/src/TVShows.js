import React from 'react';

/*Image imports */
import netflix from './images/netflix.jpg';

import theMagicians from './images/the_magicians.jpg';
import lockeKey from './images/locke&key.jpg';
import strangerThings from './images/stranger_things.jpg';
import lucifer from './images/lucifer.jpg';
import neverHaveIEver from './images/never_have_i_ever.jpg';
import community from './images/community.jpg';
import schittsCreek from './images/schitts_creek.jpg';
import arrestedDevelopment from './images/arrested_development.jpg';
import you from './images/you.jpg';
import breakingBad from './images/breaking_bad.jpg';
import peakyBlinders from './images/peaky_blinders.jpg';
import unbelievable from './images/unbelievable.jpg';
import the100 from './images/the_100.jpg';
import theUmbrellaAcademy from './images/the_umbrella_academy.jpg';
import legacies from './images/legacies.jpg';
import legendsOfTomorrow from './images/legends_of_tomorrow.jpg';

function existsAlready() {
    alert("This item has already been added to your checkout bin! Check out \
    your selected items by clicking the button on the top right.");
}

function TVShowRecs(props) {
    props.state.buttons[0] = true;

    const radioDramaFantasy = document.getElementById('radioDramaFantasy');
    const radioComedy = document.getElementById('radioComedy');
    const radioCrimeDrama = document.getElementById('radioCrimeDrama');
    const radioActionAdventure = document.getElementById('radioActionAdventure');

    const tvshow1 = document.getElementById('tvshow1');
    const tvshow2 = document.getElementById('tvshow2');
    const tvshow3 = document.getElementById('tvshow3');
    const tvshow4 = document.getElementById('tvshow4');

    if (radioDramaFantasy.checked) {
        tvshow1.src = theMagicians;
        tvshow1.alt = "The Magicians";
        tvshow2.src = lockeKey;
        tvshow2.alt = "Locke & Key";
        tvshow3.src = strangerThings;
        tvshow3.alt = "Stranger Things";
        tvshow4.src = lucifer;
        tvshow4.alt = "Lucifer";
    } else if (radioComedy.checked) {
        tvshow1.src = neverHaveIEver;
        tvshow1.alt = "Never Have I Ever";
        tvshow2.src = community;
        tvshow2.alt = "Community";
        tvshow3.src = schittsCreek;
        tvshow3.alt = "Schitt's Creek";
        tvshow4.src = arrestedDevelopment;
        tvshow4.alt = "Arrested Development";
    } else if (radioCrimeDrama.checked) {
        tvshow1.src = you;
        tvshow1.alt = "You";
        tvshow2.src = breakingBad;
        tvshow2.alt = "Breaking Bad";
        tvshow3.src = peakyBlinders;
        tvshow3.alt = "Peaky Blinders";
        tvshow4.src = unbelievable;
        tvshow4.alt = "Unbelievable";
    } else if (radioActionAdventure.checked) {
        tvshow1.src = the100;
        tvshow1.alt = "The 100";
        tvshow2.src = theUmbrellaAcademy;
        tvshow2.alt = "The Umbrella Academy";
        tvshow3.src = legacies;
        tvshow3.alt = "Legacies";
        tvshow4.src = legendsOfTomorrow;
        tvshow4.alt = "Legends of Tomorrow";
    } else {
        alert("Please select a genre to receive customized recommendations! ");
        props.state.buttons[0] = false;
        return;
    }

    const checkoutButtons = document.getElementById('checkoutButtons1');
    checkoutButtons.innerHTML = "";
    for (let i = 1; i <= 4; i++) {
        checkoutButtons.innerHTML += "<button name='addToCheckout' id='addTVShow" + i + "' >Add to Checkout</button>";
    }
    const addTVShow1 = document.getElementById('addTVShow1');
    addTVShow1.onclick = (e) => {
        props.findData(tvshow1.alt).then(response => {
            if (response === false) {
                props.postData(e, tvshow1.alt, "TV Show", "addTVShow1");
                addTVShow1.textContent = "Checked Out";
                addTVShow1.style = "background-color: yellowgreen; color: white";
            } else { existsAlready(); }
        });
    };
    const addTVShow2 = document.getElementById('addTVShow2');
    addTVShow2.onclick = (e) => {
        props.findData(tvshow2.alt).then(response => {
            if (response === false) {
                props.postData(e, tvshow2.alt, "TV Show", "addTVShow2");
                addTVShow2.textContent = "Checked Out";
                addTVShow2.style = "background-color: yellowgreen; color: white";
            } else { existsAlready(); }
        });
    };
    const addTVShow3 = document.getElementById('addTVShow3');
    addTVShow3.onclick = (e) => {
        props.findData(tvshow3.alt).then(response => {
            if (response === false) {
                props.postData(e, tvshow3.alt, "TV Show", "addTVShow3");
                addTVShow3.textContent = "Checked Out";
                addTVShow3.style = "background-color: yellowgreen; color: white";
            } else { existsAlready(); }
        });
    };
    const addTVShow4 = document.getElementById('addTVShow4');
    addTVShow4.onclick = (e) => {
        props.findData(tvshow4.alt).then(response => {
            if (response === false) {
                props.postData(e, tvshow4.alt, "TV Show", "addTVShow4");
                addTVShow4.textContent = "Checked Out";
                addTVShow4.style = "background-color: yellowgreen; color: white";
            } else { existsAlready(); }
        });
    };
}

function TVShows(props) {
    return (
        <div className="ItemComponent">
            <div className="category">
                <div className="subheading" id="tvshows">Netflix TV Show Recommendations</div>
                <div className="selection">
                    <form>
                        <input type="radio" id="radioDramaFantasy" name="tvshow" value="DramaFantasy" />Drama & Fantasy&emsp;
              <input type="radio" id="radioComedy" name="tvshow" value="Comedy" />Comedy&emsp;
              <input type="radio" id="radioCrimeDrama" name="tvshow" value="CrimeDrama" />Crime & Drama&emsp;
              <input type="radio" id="radioActionAdventure" name="tvshow" value="ActionAdventure" />Action & Adventure&emsp;&emsp;
              <input type="button" className="button" onClick={() => { TVShowRecs(props.componentData) }} value="Find TV Shows!" />
                    </form>
                </div>
            </div>

            <img src={netflix} id="tvshow1" alt="Recommendation incoming" />
            <img src={netflix} id="tvshow2" alt="Recommendation incoming" />
            <img src={netflix} id="tvshow3" alt="Recommendation incoming" />
            <img src={netflix} id="tvshow4" alt="Recommendation incoming" />
            <div id="checkoutButtons1"></div>
        </div>
    )
}

export default TVShows;
