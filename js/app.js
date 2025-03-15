console.log('hello');

//window.alert(`i do really like a pizza`);

//that is a command
document.getElementById("myP").textContent = "Hello World";

//POST

fetch("http://localhost:8080/api/v1/checklists", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    rooms: [
      {
        roomNumber: 1337,
        complete: false,
        signer: "John Doe",
        comment: "Initial check"
      }
    ]
  })
})
  .then(response => response.json())
  .then(data => console.log("Response:", data))
  .catch(error => console.error("Error:", error));

//GET

fetch("http://localhost:8080/api/v1/checklists")
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json(); // Parsowanie odpowiedzi jako JSON
  })
  .then(data => {
    console.log("Checklist data:", data);
  })
  .catch(error => {
    console.error("Error fetching checklist:", error);
  });


