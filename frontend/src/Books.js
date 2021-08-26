import React from 'react';

/*Image imports */
import goodreads from './images/goodreads.jpg';

import theHandmaidsTale from './images/the_handmaids_tale.jpg';
import the1984 from './images/1984.jpg';
import braveNewWorld from './images/brave_new_world.jpg';
import theHungerGames from './images/the_hunger_games.jpg';
import theGirlWithTheDragonTattoo from './images/the_girl_with_the_dragon_tattoo.jpg';
import andThenThereWereNone from './images/and_then_there_were_none.jpg';
import goneGirl from './images/gone_girl.jpg';
import theGodfather from './images/the_godfather.jpg';
import lordOfTheRings from './images/lord_of_the_rings.jpg';
import gameOfThrones from './images/game_of_thrones.jpg';
import animalFarm from './images/animal_farm.jpg';
import farenheit451 from './images/farenheit_451.jpg';
import prideAndPrejudice from './images/pride_and_prejudice.jpg';
import janeEyre from './images/jane_eyre.jpg';
import goneWithTheWind from './images/gone_with_the_wind.jpg';
import theNotebook from './images/the_notebook.jpg';

function existsAlready() {
    alert("This item has already been added to your checkout bin! Check out \
    your selected items by clicking the button on the top right.");
}

function BookRecs(props) {
    props.state.buttons[1] = true;

    const booksMenu = document.getElementById('booksMenu');
    const optionSelected = booksMenu[booksMenu.selectedIndex].value;

    const book1 = document.getElementById('book1');
    const book2 = document.getElementById('book2');
    const book3 = document.getElementById('book3');
    const book4 = document.getElementById('book4');

    if (optionSelected === "Dystopian") {
        book1.src = theHandmaidsTale;
        book1.alt = "The Handmaids Tale"
        book2.src = the1984;
        book2.alt = "1984";
        book3.src = braveNewWorld;
        book3.alt = "Brave New World";
        book4.src = theHungerGames;
        book4.alt = "The Hunger Games";
    } else if (optionSelected === "Mystery") {
        book1.src = theGirlWithTheDragonTattoo;
        book1.alt = "The Girl With the Dragon Tattoo";
        book2.src = andThenThereWereNone;
        book2.alt = "And Then There Were None";
        book3.src = goneGirl;
        book3.alt = "Gone Girl";
        book4.src = theGodfather;
        book4.alt = "The Godfather";
    } else if (optionSelected === "Science Fiction") {
        book1.src = lordOfTheRings;
        book1.alt = "Lord of the Rings";
        book2.src = gameOfThrones;
        book2.alt = "Game of Thrones";
        book3.src = animalFarm;
        book3.alt = "Animal Farm";
        book4.src = farenheit451;
        book4.alt = "Farenheit 451";
    } else if (optionSelected === "Romance") {
        book1.src = prideAndPrejudice;
        book1.alt = "Pride and Prejudice";
        book2.src = janeEyre;
        book2.alt = "Jane Eyre";
        book3.src = goneWithTheWind;
        book3.alt = "Gone With the Wind";
        book4.src = theNotebook;
        book4.alt = "The Notebook";
    } else {
        alert("Please select a genre to receive customized recommendations!");
        props.state.buttons[1] = false;
        return;
    }

    const checkoutButtons = document.getElementById('checkoutButtons2');
    checkoutButtons.innerHTML = "";
    for (let i = 1; i <= 4; i++) {
        checkoutButtons.innerHTML += "<button name='addToCheckout' id='addBook" + i + "'>Add to Checkout</button>";
    }
    const addBook1 = document.getElementById('addBook1');
    addBook1.onclick = (e) => {
        props.findData(book1.alt).then(response => {
            if (response === false) {
                props.postData(e, book1.alt, "Book", "addBook1");
                addBook1.textContent = "Checked Out";
                addBook1.style = "background-color: yellowgreen; color: white";
            } else { existsAlready(); }
        });
    };
    const addBook2 = document.getElementById('addBook2');
    addBook2.onclick = (e) => {
        props.findData(book2.alt).then(response => {
            if (response === false) {
                props.postData(e, book2.alt, "Book", "addBook2");
                addBook2.textContent = "Checked Out";
                addBook2.style = "background-color: yellowgreen; color: white";
            } else { existsAlready(); }
        });
    };
    const addBook3 = document.getElementById('addBook3');
    addBook3.onclick = (e) => {
        props.findData(book3.alt).then(response => {
            if (response === false) {
                props.postData(e, book3.alt, "Book", "addBook3");
                addBook3.textContent = "Checked Out";
                addBook3.style = "background-color: yellowgreen; color: white";
            } else { existsAlready(); }
        });
    };
    const addBook4 = document.getElementById('addBook4');
    addBook4.onclick = (e) => {
        props.findData(book4.alt).then(response => {
            if (response === false) {
                props.postData(e, book4.alt, "Book", "addBook4");
                addBook4.textContent = "Checked Out";
                addBook4.style = "background-color: yellowgreen; color: white";
            } else { existsAlready(); }
        });
    };
}

function Books(props) {
    return (
        <div className="itemComponent">
            <div className="category">
                <div className="subheading" id="books">Book Recommendations</div>
                <div className="selection">
                    <form>
                        <select id="booksMenu">
                            <option name="book" value="select">---Select a genre---</option>
                            <option name="book" value="Dystopian">Dystopian</option>
                            <option name="book" value="Mystery">Mystery</option>
                            <option name="book" value="Science Fiction">Science Fiction</option>
                            <option name="book" value="Romance">Romance</option>
                        </select>&emsp;

                            <input type="button" className="button" onClick={() => { BookRecs(props.componentData) }} value="Find Books!" />
                    </form>
                </div>
            </div>

            <img src={goodreads} id="book1" alt="Recommendation incoming" />
            <img src={goodreads} id="book2" alt="Recommendation incoming" />
            <img src={goodreads} id="book3" alt="Recommendation incoming" />
            <img src={goodreads} id="book4" alt="Recommendation incoming" />
            <div id="checkoutButtons2"></div>
        </div>
    )
}

export default Books;
