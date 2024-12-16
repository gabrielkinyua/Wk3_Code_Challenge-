const filmList = document.getElementById("films"); // selects the HTML element with the specified id

// Remove the placeholder li if it exists
const placeholder = document.querySelector("#films li");
if (placeholder) {
    placeholder.remove();
}

fetch("http://localhost:3000/films")  // fetch data from the server
.then(response => response.json()) // parses JSON into usable JS object
.then(films => {
    films.forEach(film => {
        const li = document.createElement("li"); // create an <li> element for each film
        li.classList.add("film", "item"); // add the classes to the li

        li.innerHTML = `
            <h3>${film.title}</h3>
            <img src = "${film.poster}" alt = "${film.title} poster">
            <p>${film.description}</p>
            <p><strong>Showtime:</strong> ${film.showtime}</p>
            <p><strong>Tickets Sold:</strong> ${film.tickets_sold} / ${film.capacity}</p>
            <button class="buy-ticket" data-id="${film.id}">Buy Ticket</button>
        `;
        filmList.appendChild(li);

        // Add the event listener 
        const buyButton = li.querySelector(".buy-ticket"); // Get the specific button just added
        buyButton.addEventListener("click", (event) => {
            const filmId = event.target.dataset.id;  // Get the id of the clicked film
            const clickedFilm = films.find(film => film.id === filmId);  // Find the film in the array by id
            if (clickedFilm.tickets_sold < clickedFilm.capacity) {  // Check if there are tickets available
                clickedFilm.tickets_sold++;  // Increase the number of tickets sold
                console.log(`Tickets sold for "${clickedFilm.title}": ${clickedFilm.tickets_sold} / ${clickedFilm.capacity}`);
                
                event.target.previousElementSibling.textContent = `Tickets Sold: ${clickedFilm.tickets_sold} / ${clickedFilm.capacity}`;
            } else {
                alert("This movie is sold out!");
            }
        });
    });
})
.catch(error => console.error("Error fetching data:", error));

