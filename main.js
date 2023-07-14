function mainCrop() {

  fetch("http://localhost:3000/crops")
    .then(Response => Response.json())
    .then(data => getData(data))
  function getData(crops) {
    crops.forEach(farm => {
      const list = document.createElement("list")
      const card = document.createElement("card")
      const arable = document.getElementById("menu")
      list.innerHTML = `<h1>${farm.title}</h1>
  <img class="img1" src = "${farm.photo}">
  <p>${farm.description}</p>
  <button id="dlt">Delete</button> 
  <button id="edt">Edit</button>
  <button id="updt">Update</button>`
  list.querySelector("#edt").addEventListener('click', () => {
    document.getElementById("title").value = farm.title
    document.getElementById("description").value = farm.description
    document.getElementById("photo").value = farm.photo
  })
      list.querySelector("#dlt").addEventListener('click', () => {
        list.remove()
        alert("Are you sure you want to delete this item?")
        deleteCrop(farm.id)
      })
      arable.append(list)

    });
  }
  function deleteCrop(id) {
    fetch(`http://localhost:3000/crops/${id}`, {
      method: 'Delete',
      Headers: {
        'Content-Type': 'Application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        alert("Crop deleted successfully")
      } else {
        alert("Error deleting crop")
      }
    })
  }

  document.getElementById("dtv").addEventListener('submit', handleSubmit)
  function handleSubmit(event) {
    event.preventDefault()
    const title = document.getElementById("title").value
    const photo = document.getElementById("photo").value
    const description = document.getElementById("description").value
    if (title === "" || photo === "" || description === "") {
      alert("Fill All the forms")
    } else {
      let cropObj = {
        title: event.target.title.value,
        photo: event.target.photo.value,
        description: event.target.description.value
      }
      postCrops(cropObj)
    }

  }
  function postCrops(cropObj) {
    fetch("http://localhost:3000/crops", {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cropObj)
    })
    .then(response => {
      if (response.ok) {
        alert("Crop created successfully")
      } else {
        alert("Error creating crop")
      }
    })
  }
  
}
window.onload = mainCrop
