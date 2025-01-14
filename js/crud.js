document.addEventListener('DOMContentLoaded', () => {
    const playerForm = document.getElementById('player-form');
    const playerIdInput = document.getElementById('player-id');
    const firstNameInput = document.getElementById('first-name');
    const lastNameInput = document.getElementById('last-name');
    const positionInput = document.getElementById('position');
    const numberInput = document.getElementById('number');
    const roleInput = document.getElementById('role');
    const playersTable = document.getElementById('players-table').getElementsByTagName('tbody')[0];

    const apiUrl = '../server/players.php';

    const fetchPlayers = async () => {
        const response = await fetch(apiUrl);
        const players = await response.json();
        playersTable.innerHTML = '';
        players.forEach(player => {
            const row = playersTable.insertRow();
            row.innerHTML = `
                <td>${player.first_name}</td>
                <td>${player.last_name}</td>
                <td>${player.position}</td>
                <td>${player.number}</td>
                <td>${player.role}</td>
                <td>
                    <button onclick="editPlayer(${player.id})">Edit</button>
                    <button onclick="deletePlayer(${player.id})">Delete</button>
                </td>
            `;
        });
    };

    const savePlayer = async (e) => {
        e.preventDefault();
        const player = {
            first_name: firstNameInput.value,
            last_name: lastNameInput.value,
            position: positionInput.value,
            number: numberInput.value,
            role: roleInput.value
        };
        const id = playerIdInput.value;
        const method = id ? 'PUT' : 'POST';
        const url = id ? `${apiUrl}/${id}` : apiUrl;
        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(player)
        });
        await response.json();
        playerForm.reset();
        fetchPlayers();
    };

    const editPlayer = async (id) => {
        const response = await fetch(`${apiUrl}/${id}`);
        const player = await response.json();
        playerIdInput.value = player.id;
        firstNameInput.value = player.first_name;
        lastNameInput.value = player.last_name;
        positionInput.value = player.position;
        numberInput.value = player.number;
        roleInput.value = player.role;
    };

    const deletePlayer = async (id) => {
        await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
        fetchPlayers();
    };

    playerForm.addEventListener('submit', savePlayer);
    fetchPlayers();
});