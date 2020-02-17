let resultsList = document.querySelector('#results');

function enterSearch() {
    let key = event.keyCode;
    if (key === 13) {
        fetchData();
    }
}

function fetchData() {
    let bandSearch = document.querySelector('#bandNameTextArea');
    let artist = bandSearch.value;
    if (artist !== "") {
        var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?&countryCode=ES&sort'date,asc'&keyword=" +
            artist + "&apikey=UPZ5QoSaUAQ8kBvUZD6s3X7HT9z3p2wl";
        var request = new XMLHttpRequest();
        request.open('GET', queryURL);
        request.responseType = 'json';
        request.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                const response = request.response;
                addShow(response);
            }
        };
        request.send();
        bandSearch.value = "";
    }
}

function addShow(response) {
    resultsList.innerHTML = ``;
    let citySearch = document.querySelector('#cityTextArea');
    let evts = response._embedded.events;
    for (let i = 0; i < evts.length; i++) {
        let tourName = evts[i].name;
        let tourDate = evts[i].dates.start.localDate;
        let tourTime = evts[i].dates.start.localTime;
        let venue = evts[i]._embedded.venues[0].name;
        let showCity = evts[i]._embedded.venues[0].city.name;
        let buyLink = evts[i].url;
        let imageLink = evts[i].images[0].url;


        let city = citySearch.value.trim().toLowerCase();
        if (city === "" || showCity.toLowerCase() === city) {
            resultsList.innerHTML += `
        <li class="result">
            <div class="imageContainer">
                <img class="bandImage" src="${imageLink}">
            </div>
            <div class="showInfo">
                <div class="nameAndDate">
                    <span class="tourName">${tourName}</span>
                    <span class="tourDate">${tourDate}</span> 
                </div>
                <div class="details">
                    <span class="tourTime">${tourTime}</span>
                    <span class="venue">${venue}</span>
                    <span class="showCity">${showCity}</span>
                </div>
                <div class="buyTickets">
                    <a class="buyLink" href="${buyLink}">BUY TICKETS</a>   
                </div>
            </div>
            
        </li>
        `;
        }
    }
    citySearch.value = "";
}