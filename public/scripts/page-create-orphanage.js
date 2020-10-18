//create map
const map = L.map('mapid').setView([-29.6873394, -53.8089427], 15);

//create and add tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

//create icon
const icon = L.icon({
    iconUrl: "/images/map-marker.svg",
    iconSize: [58, 68],
    iconAnchor: [29, 68],
})

//create and add marker
map.on('click', addMarker)

let marker;

function addMarker(event){
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    document.querySelector('[name=lat]').value = lat;
    document.querySelector('[name=lng]').value = lng;

    //remove icon
    marker && map.removeLayer(marker)

    //add icon layer
    marker = L.marker([lat, lng], {icon}).addTo(map)
}



//add photo field
function addPhotoField(){
    //select container
    const container = document.querySelector('#images');
    //select field to duplicate
    const fieldContainer = document.querySelectorAll('.new-upload');
    //container field duplication
    const newFieldContainer = fieldContainer[fieldContainer.length -1].cloneNode(true);
    //verify if field is empty to validate input
    const input = newFieldContainer.children[0];
    if(input.value == ""){
        return;
    }
    //text field clear
    newFieldContainer.children[0].value = "";
    //add the duplication to the container #images
    container.appendChild(newFieldContainer)
}

function deleteField(event){
    const span = event.currentTarget;
    const fieldContainer = document.querySelectorAll('.new-upload');
    if(fieldContainer.length <= 1){
        //clear field
        span.parentNode.children[0].value = "";
        return;
    }

    //delete field
    span.parentNode.remove()
}

//toggle between yes and no
function toggleSelect(event){
    document.querySelectorAll('.button-select button').forEach(button => button.classList.remove('active')) /*Pode ser escrito dessa forma quando a função só tiver um argumento */

    const button = event.currentTarget
    button.classList.add('active')

    //update hidden input value according to current selected button
    const input = document.querySelector('[name="weekend-open"]')
    
    input.value = button.dataset.value
}

function validate(event){
    const maplocal = document.querySelector('[name=lat]')

    if(maplocal.input.value == ""){
        event.preventDefault()
        alert('selecione um ponto no mapa')
    }
}