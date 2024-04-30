//public/validations.js

const form = document.getElementById("projectForm");

form.addEventListener("submit", (event) => {
  const name = document.getElementById("name").value.trim();
  const description = document.getElementById("description").value.trim();

  if (name === "") {
    alert("Please enter a project name.");
    event.preventDefault();
    return;
  }

  if (description === "") {
    alert("Please enter a project description.");
    event.preventDefault();
    return;
  }
});
const labelInput = document.getElementById("labels");

labelInput.addEventListener("keyup", async (event) => {
  const query = event.target.value;
  if (query.length >= 2) {
    const response = await fetch("/api/labels?q=" + query);
    const suggestions = await response.json();
    // Render suggestions using a dropdown or autocomplete UI
  }
});
