document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("addRowButton").addEventListener("click", addRow);
  document.getElementById("saveButton").addEventListener("click", saveList);
  document.getElementById("removeButton").addEventListener("click", removeRow);
  pushFirstToAPI();
  setInterval(pushToAPI, 10000); // Uruchamia pushToAPI co 30 sekund
});

function addRow() {
  let table = document.getElementById("dataTable").getElementsByTagName('tbody')[0];
  let newRow = table.insertRow();

  for (let i = 0; i < 4; i++) {
    let newCell = newRow.insertCell(i);
    if (i === 1) {
      newCell.innerHTML = '<input type="checkbox" name="isComplete">';
    } else {
      let placeholders = ["Room", "Signer", "Comment"];
      newCell.innerHTML = `<input type="text" name="${['roomNumber', 'signer', 'comment'][i > 1 ? i - 1 : i]}" placeholder="${placeholders[i > 1 ? i - 1 : i]}">`;
    }
  }
}

function removeRow() {
  let table = document.getElementById("dataTable").getElementsByTagName('tbody')[0];
  if (table.rows.length > 0) {
    table.deleteRow(table.rows.length - 1);
  } else {
    alert("Nie można usunąć więcej wierszy!");
  }
}


function saveList() {
  let table = document.getElementById("dataTable");
  let data = [];

  for (let i = 1; i < table.rows.length; i++) {
    let row = table.rows[i];

    let rowData = {
      roomNumber: parseInt(row.cells[0].querySelector("input").value) || null,
      complete: row.cells[1].querySelector("input").checked,
      signer: row.cells[2].querySelector("input").value.trim(),
      comment: row.cells[3].querySelector("input").value.trim()
    };

    data.push(rowData);
  }

  return { rooms: data }; // Zwraca obiekt w wymaganym formacie API
}

async function pushFirstToAPI() {
  let payload = saveList(); // Pobieramy dane z tabeli w odpowiednim formacie

  console.log("Wysyłane dane:", JSON.stringify(payload, null, 2));

  try {
    let response = await fetch("http://localhost:8080/api/v1/checklists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error(`Błąd: ${response.status}`);

    let responseData = await response.json();
    console.log("Odpowiedź API:", responseData);
  } catch (error) {
    console.error("Błąd podczas wysyłania:", error);
    alert("Błąd podczas wysyłania danych.");
  }
}

// Dodajemy nasłuchiwanie na kliknięcie przycisku
document.getElementById("saveButton").addEventListener("click", pushToAPI);

async function pushToAPI() {
  let payload = saveList(); // Pobieramy dane z tabeli w odpowiednim formacie

  console.log("Wysyłane dane:", JSON.stringify(payload, null, 2));

  try {
    let response = await fetch("http://localhost:8080/api/v1/checklists/1", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error(`Błąd: ${response.status}`);

    let responseData = await response.json();
    console.log("Odpowiedź API:", responseData);
  } catch (error) {
    console.error("Błąd podczas wysyłania:", error);
    alert("Błąd podczas wysyłania danych.");
  }

}
