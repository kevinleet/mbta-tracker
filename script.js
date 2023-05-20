L.mapquest.key = 'IFutcz97fDjINJ1QeUpcmgVDzFLIDfex';
let apiKey = 'b2aaa7561cc145a5b412d187b054ba79'
let $navList = $('#nav-list')
let $greenBtn = $('#green-btn')
let $redBtn = $('#red-btn')
let $orangeBtn = $('#orange-btn')
let $blueBtn = $('#blue-btn')
let $trainList = $('#train-list')
let $leftContainer = $('.left-container')
let $rightContainer = $('.right-container')
let $map = $('#map')

let map;
function renderMap() {
    map = L.mapquest.map('map', {
        center: [42.3554334, -71.060511],
        layers: L.mapquest.tileLayer('map'),
        zoom: 13
        })
        map.addControl(L.mapquest.control())
}
renderMap()

// Add event listener for the nav bar elements that correspond to train colors. Reset and re-render map and train elements.
$navList.on('click', 'button', async function() {
    map.remove()
    renderMap()
    $trainList.empty()
    let hex = $(this).attr("hex")
    $leftContainer.css("border", `3px solid ${hex}`)
    let value = $(this).prop("value")
    let routeFilter = $(this).attr("route")
    let response = await axios.get(`https://api-v3.mbta.com/vehicles?api_key=${apiKey}&filter[route]=${routeFilter}`)
    parseTrainData(response, value)
    renderPolyline(routeFilter, value)
})

// Add event listener to individual train buttons. On click, will center the map location of train selected
$trainList.on('click', 'button', function() {
    let lat = $(this).attr("lat")
    let lon = $(this).attr("lon")
    map.setView([lat,lon], 16)
    map.panTo([lat,lon], 16)
})

// Function that destructures and assigns train data to previously declared variables
async function parseTrainData(response, value) {
    let data = await response.data.data
    for (const train of data) {
        let id = train.id
        let direction_id = train.attributes.direction_id
        let route_id = train.relationships.route.data.id
        let stop_id = train.relationships.stop?.data?.id
        let stop_name = await getStopName(stop_id)
        let current_status = train.attributes.current_status
        let label = train.attributes.label
        let lat = train.attributes.latitude
        let lon = train.attributes.longitude
        let direction_name = await getDirectionName(direction_id, route_id)
        let status = ''
        switch (current_status) {
            case 'STOPPED_AT':
                status += "Stopped At"
                break
            case 'INCOMING_AT':
                status += "Incoming At "
                break
            case 'IN_TRANSIT_TO':
                status += "In Transit To"
                break
            default:
                return
        }
        renderTrainButton(value, id, lat, lon, label, status, stop_name, direction_name)
        L.marker([lat,lon]).addTo(map).bindPopup(`${label} ${direction_name}bound</br>${status} ${stop_name}`)
    }
}

// Function that renders a train button with arguments to assign button attributes and content
function renderTrainButton(value, id, lat, lon, label, status, stop_name, direction_name) {
    $trainList.append(`
    <li>
        <button class="train-btn ${value}" label="${label}" lat="${lat}" lon="${lon}">
            ${label} ${direction_name}bound</br>${status}</br>${stop_name}
        </button>
    </li>
    `)
}

// Function that retrieves direction name when given direction_id and route_id as arguments
async function getDirectionName(direction_id, route_id) {
    let response = await axios.get(`https://api-v3.mbta.com/routes?api_key=${apiKey}&filter[id]=${route_id}&filter[direction_id]=${direction_id}`)
    return response.data.data[0].attributes.direction_names[direction_id]
}

// Function that retrieves stop name when given stop id as an argument
async function getStopName(stop_id) {
    if (stop_id == "Union Square-01" || stop_id == "Union Square-02") {
        return "Union Square"
    } else if (stop_id == undefined) {
        return ''
    } else {
        let response = await axios.get(`https://api-v3.mbta.com/stops/${stop_id}?api_key=${apiKey}`)
        return response.data.data.attributes.name
    }
}

// Function to retrieve shapes data from API, call decode function to decode the raw data and plot it onto map
async function renderPolyline(routeFilter, value) {
    const response = await axios.get(`https://api-v3.mbta.com/shapes?api_key=${apiKey}&filter[route]=${routeFilter}`)
    const data = response.data.data
    let latlngs = []
    for (const i in data) {
        let polyraw = data[i].attributes.polyline
        latlngs.push(decode(polyraw))
    }
    var polyline = L.polyline(latlngs, {color: `${value}`}).addTo(map)
    map.fitBounds(polyline.getBounds())
}

// I found this function online that someone wrote to decode Google's Encoded Polyline Algorithm Format
// https://gist.github.com/ismaels/6636986
// Aside from paying for the Google Maps API, there was no other way to decode the decoded shapes data from API
function decode(encoded){
    var points=[ ]
    var index = 0, len = encoded.length;
    var lat = 0, lng = 0;
    while (index < len) {
        var b, shift = 0, result = 0;
        do {
    b = encoded.charAt(index++).charCodeAt(0) - 63;//finds ascii                                                                                    //and substract it by 63
              result |= (b & 0x1f) << shift;
              shift += 5;
             } while (b >= 0x20);
    var dlat = ((result & 1) != 0 ? ~(result >> 1) : (result >> 1));
    lat += dlat;
    shift = 0;
    result = 0;
     do {
        b = encoded.charAt(index++).charCodeAt(0) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
    } while (b >= 0x20);
     var dlng = ((result & 1) != 0 ? ~(result >> 1) : (result >> 1));
     lng += dlng;
     points.push([( lat / 1E5),( lng / 1E5)])  
  }
  return points
}

$greenBtn.click()

