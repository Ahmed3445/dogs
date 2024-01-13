const api = "https://dog.ceo/api/breeds/list"; // remove /all from the URL

// create a function to populate the select element with the breed names
async function populateSelect() {
  // get the select element from the HTML code
  const select = document.getElementById("dog-select");

  // fetch the list of breeds from the API
  const response = await fetch(api, { dataType: "json" }); // add dataType parameter
  const data = await response.json();
  const breeds = data.message; // access the message property

  // loop through the breeds array and create option elements for each breed
  for (let breed of breeds) {
    // create a new option element
    const option = document.createElement("option");

    // set the value and inner text of the option element to the breed name
    option.value = breed;
    option.innerText = breed;

    // append the option element to the select element
    select.appendChild(option);
  }
}

// create a function to fetch and display the image of the selected breed
async function displayImage() {
  // get the select element from the HTML code
  const select = document.getElementById("dog-select");

  // get the value of the selected option, which is the breed name
  const breed = select.value;

  // get the image element from the HTML code
  const img = document.getElementById("dog-image");

  // if the breed is not empty, fetch and display the image
  if (breed) {
    // fetch the image URL for the selected breed from the API
    const imageResponse = await fetch(
      `https://dog.ceo/api/breed/${breed}/images/random`
    );
    const imageData = await imageResponse.json();
    const imageUrl = imageData.message; // access the message property

    // set the src attribute of the image element to the image URL
    img.src = imageUrl;

    // set the alt attribute of the image element to the breed name
    img.alt = breed;
  } else {
    // if the breed is empty, clear the image element
    img.src = "";
    img.alt = "";
  }
}

// call the populateSelect function when the page loads
populateSelect();

// add an event listener to the select element that will call the displayImage function when the value changes
document
  .getElementById("dog-select")
  .addEventListener("change", displayImage);
