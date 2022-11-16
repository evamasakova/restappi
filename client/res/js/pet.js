const info = document.getElementById("info");
const getAllPetsBtn = document.getElementById("getAllPetsBtn");
const getPetByIdBtn = document.getElementById("getPetByIdBtn");
const postPetBtn = document.getElementById("postPetBtn");
const putPetBtn = document.getElementById("putPetBtn");
const patchPetBtn = document.getElementById("patchPetBtn");
const deletePetBtn = document.getElementById("deletePetBtn");
const getPetByIdInput = document.getElementById("getPetByIdInput");
const postNameInput = document.getElementById("postNameInput");
const postYearInput = document.getElementById("postYearInput");
const postBreedInput = document.getElementById("postBreedInput");
const postColorInput = document.getElementById("postColorInput");
const putIdInput = document.getElementById("putIdInput");
const putNameInput = document.getElementById("putNameInput");
const putYearInput = document.getElementById("putYearInput");
const putBreedInput = document.getElementById("putBreedInput");
const putColorInput = document.getElementById("putColorInput");
const patchIdInput = document.getElementById("patchIdInput");
const patchNameInput = document.getElementById("patchNameInput");
const patchYearInput = document.getElementById("patchYearInput");
const patchBreedInput = document.getElementById("patchBreedInput");
const patchColorInput = document.getElementById("patchColorInput");
const deleteIdInput = document.getElementById("deleteIdInput");

const getAllPetsEvent = async () => {
  try {
    const res = await fetch("http://127.0.0.1:3000/pet", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    const data = await res.json();
    info.innerHTML = "";
    data.pets.map((pet) => {
      info.innerHTML += `<p>id: ${pet._id}</p>`;
      info.innerHTML += `<p>name: ${pet.name}</p>`;
      info.innerHTML += `<p>year: ${pet.year}</p>`;
      info.innerHTML += `<p>breed: ${pet.breed}</p>`;
      info.innerHTML += `<p>color: ${pet.color}</p>`;
      info.innerHTML += `<p>request: ${Object.values(pet.request)}</p>`;
      info.innerHTML += `<p><br></p>`;
    });
  } catch (error) {
    info.innerText = error;
  }
};
getAllPetsBtn.onclick = getAllPetsEvent;

const getPetByIdEvent = async () => {
  try {
    const getPetByIdInputValue = getPetByIdInput.value;
    const res = await fetch(
      `http://127.0.0.1:3000/pet/${getPetByIdInputValue}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "GET",
      }
    );
    const data = await res.json();
    info.innerHTML = `<p>id: ${data._id}</p>`;
    info.innerHTML += `<p>name: ${data.name}</p>`;
    info.innerHTML += `<p>year: ${data.year}</p>`;
    info.innerHTML += `<p>breed: ${data.breed}</p>`;
    info.innerHTML += `<p>color: ${data.color}</p>`;
    info.innerHTML += `<p>request: ${Object.values(data.request)}</p>`;
  } catch (error) {
    info.innerHTML = `<p>Pet not found!</p>`;
  }
};
getPetByIdBtn.onclick = getPetByIdEvent;

const postPetEvent = async () => {
  try {
    const postNameInputValue = postNameInput.value;
    const postYearInputValue = postYearInput.value;
    const postBreedInputValue = postBreedInput.value;
    const postColorInputValue = postColorInput.value;
    const res = await fetch("http://127.0.0.1:3000/pet", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        name: postNameInputValue,
        year: postYearInputValue,
        breed: postBreedInputValue,
        color: postColorInputValue,
      }),
    });
    const data = await res.json();
    info.innerHTML = `<p>Message: ${data.message}</p>`;
    info.innerHTML += `<p>Created pet:</p>`;
    info.innerHTML += `<p>id: ${data.createdPet._id}</p>`;
    info.innerHTML += `<p>name: ${data.createdPet.name}</p>`;
    info.innerHTML += `<p>year: ${data.createdPet.year}</p>`;
    info.innerHTML += `<p>breed: ${data.createdPet.breed}</p>`;
    info.innerHTML += `<p>color: ${data.createdPet.color}</p>`;
    info.innerHTML += `<p>payload: ${Object.values(
      data.createdPet.payload
    )}</p>`;
  } catch (error) {
    info.innerText = postPetEvent;
  }
};
postPetBtn.onclick = postPetEvent;

const putPetEvent = async () => {
  try {
    const putIdInputValue = putIdInput.value;
    const putNameInputValue = putNameInput.value;
    const putYearInputValue = putYearInput.value;
    const putBreedInputValue = putBreedInput.value;
    const putColorInputValue = putColorInput.value;
    const res = await fetch(`http://127.0.0.1:3000/pet/${putIdInputValue}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({
        name: putNameInputValue,
        year: putYearInputValue,
        breed: putBreedInputValue,
        color: putColorInputValue,
      }),
    });
    const data = await res.json();
    info.innerHTML = `<p>${Object.values(data)}</p>`;
  } catch (error) {
    info.innerText = error;
  }
};
putPetBtn.onclick = putPetEvent;

const patchPetEvent = async () => {
  try {
    const patchIdInputValue = patchIdInput.value;
    const patchNameInputValue = patchNameInput.value;
    const patchYearInputValue = patchYearInput.value;
    const patchBreedInputValue = patchBreedInput.value;
    const patchColorInputValue = patchColorInput.value;
    let body = [];
    if (patchNameInputValue.trim().length) {
      const nameProp = {
        propName: "name",
        value: patchNameInputValue,
      };
      body.push(nameProp);
    }
    if (patchYearInputValue.trim().length) {
      const yearProp = {
        propName: "year",
        value: patchYearInputValue,
      };
      body.push(yearProp);
    }
    if (patchBreedInputValue.trim().length) {
      const breedProp = {
        propName: "breed",
        value: patchBreedInputValue,
      };
      body.push(breedProp);
    }
    if (patchColorInputValue.trim().length) {
      const colorProp = {
        propName: "color",
        value: patchColorInputValue,
      };
      body.push(colorProp);
    }
    const res = await fetch(`http://127.0.0.1:3000/pet/${patchIdInputValue}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify(body),
    });
    const data = await res.json();
    info.innerHTML = `<p>Message: ${data.msg}</p>`;
    info.innerHTML += `<p>Request: ${Object.values(data.request)}</p>`;
  } catch (error) {
    info.innerText = error;
  }
};
patchPetBtn.onclick = patchPetEvent;

const deletePetEvent = async () => {
  try {
    const deleteIdInputValue = deleteIdInput.value;
    const res = await fetch(`http://127.0.0.1:3000/pet/${deleteIdInputValue}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });
    const data = await res.json();
    if (!data) return (info.innerHTML = `<p>Pet not found!</p>`);
    info.innerHTML = `<p>${Object.values(data)}</p>`;
  } catch (error) {
    info.innerText = error;
  }
};
deletePetBtn.onclick = deletePetEvent;
