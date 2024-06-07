const allPlayers = (searchQuery = 'Danny_Welbeck') => {
    fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${searchQuery}`)
        .then((res) => res.json())
        .then((data) => {
            if (data.player) {
                displayPlayers(data.player);
            } else {
                document.getElementById("playerdisplay").innerHTML = "<p>No players found</p>";
            }
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
};

const displayPlayers = (players) => {
    const playerContainer = document.getElementById("playerdisplay");
    playerContainer.innerHTML = '';  // Clear the container first

    players.forEach((element) => {
        const div = document.createElement("div");
        div.classList.add("display", "mt-4");
        div.innerHTML = `
            <div class="card">
                <img class="card-img-top" src="${element.strThumb}" alt="${element.strPlayer}" style="object-fit: cover; height: 200px; width: 100%;">
                <div class="card-body">
                    <button class="btn btn-primary add" onclick="addToCart('${element.idPlayer}')">Add To cart</button>
                    <button class="btn btn-secondary detail" onclick="fetchPlayerDetails('${element.idPlayer}')">Details</button>
                </div>
            </div>
        `;
        playerContainer.appendChild(div);
    });
};

const fetchPlayerDetails = (playerId) => {
    fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${playerId}`)
        .then((res) => res.json())
        .then((data) => {
            if (data.players) {
                displayPlayerDetails(data.players[0]);
            } else {
                document.getElementById("modal-body").innerHTML = "<p>Player details not found</p>";
            }
            // Show the modal
            const playerModal = new bootstrap.Modal(document.getElementById('playerModal'));
            playerModal.show();
        })
        .catch((error) => {
            console.error('Error fetching player details:', error);
        });
};

const displayPlayerDetails = (player) => {
    const playerDetailsContainer = document.getElementById("modal-body");
    playerDetailsContainer.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h2 class="card-title">${player.strPlayer}</h2>
                <p><strong>Position:</strong> ${player.strPosition}</p>
                <p><strong>Team:</strong> ${player.strTeam}</p>
                <p><strong>Nationality:</strong> ${player.strNationality}</p>
                <p><strong>Bio:</strong> ${player.strDescriptionEN}</p>
            </div>
        </div>
    `;
};

const addToCart = (playerId) => {
    const currentCount = document.querySelectorAll("#add2 .cart2").length;
    if (currentCount >= 11) {
        alert("You cannot add more than 11 players.");
        return;
    }
    fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${playerId}`)
        .then((res) => res.json())
        .then((data) => {
            if (data.players) {
                const player = data.players[0];
                const cardcount=document.getElementById("add3").innerText;
    let convertedCount=parseInt(cardcount);
    convertedCount=convertedCount+1;
    document.getElementById("add3").innerText=convertedCount;
                const add2Container = document.getElementById("add2");
                const div = document.createElement("div");
                div.classList.add("cart2");
                div.innerHTML = `
                    <div class="card">
                       
                        <div class="card-body">
                            <h5 class="card-title">${player.strPlayer}</h5>
                            <p><strong>Position:</strong> ${player.strPosition}</p>
                            <p><strong>Team:</strong> ${player.strTeam}</p>
                        </div>
                    </div>
                `;
                add2Container.appendChild(div);
            }
        })
        .catch((error) => {
            console.error('Error adding player to cart:', error);
        });
};

document.getElementById("btn").addEventListener("click", () => {
    const userSearch = document.getElementById("user").value;
    allPlayers(userSearch);
});

// Initial call to display a default player
allPlayers();
