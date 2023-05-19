let apiKey = 'b2aaa7561cc145a5b412d187b054ba79'

let $navList = $('#nav-list')
let $greenBtn = $('#green-btn')
let $redBtn = $('#red-btn')
let $orangeBtn = $('#orange-btn')
let $blueBtn = $('#blue-btn')

let $trainList = $('#train-list')
let $leftContainer = $('.left-container')
let $rightContainer = $('.right-container')

$navList.on('click', 'button', async function() {
    $trainList.empty()
    let hex = $(this).attr("hex")
    console.log(hex)
    $leftContainer.css("border", `3px solid ${hex}`)
    let value = $(this).prop("value")
    let routeFilter = ''
    switch (value) {
        case 'green':
            routeFilter = 'Green-B,Green-C,Green-D,Green-E'
            break
        case 'red':
            routeFilter = 'Red'
            break
        case 'orange':
            routeFilter = 'Orange'
            break
        case 'blue':
            routeFilter = 'Blue'
            break
    } 
    let response = await axios.get(`https://api-v3.mbta.com/vehicles?api_key=${apiKey}&filter[route]=${routeFilter}`)
    let data = response.data.data
    for (const train of data) {
        let id = train.id
        let route = train.relationships.route.data.id
        let lat = train.attributes.latitude
        let lon = train.attributes.longitude
        let status = ''
        let currentStatus = train.attributes.current_status
        switch (currentStatus) {
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
        let stop = await getStop(train.relationships.stop.data.id)
        $trainList.append(`
        <li>
            <button class="train-btn ${value}" id="${id}" lat="${lat}" lon="${lon}">
                ${id}</br>${route}</br>${status}</br>${stop}
            </button>
        </li>
        `)
    }
})

$trainList.on('click', 'button', function() {
    let id = $(this).prop("id")
    let lat = $(this).attr("lat")
    let lon = $(this).attr("lon")
    $rightContainer.html(`<img src="https://www.mapquestapi.com/staticmap/v5/map?key=IFutcz97fDjINJ1QeUpcmgVDzFLIDfex&center=${lat},${lon}&size=300,300@2x&locations=${lat},${lon}&defaultMarker=marker-red-sm"/>`)
})

async function getStop(stopId) {
    if (stopId == "Union Square-01" || stopId == "Union Square-02") {
        return "Union Square"
    } else {
        let response = await axios.get(`https://api-v3.mbta.com/stops/${stopId}?api_key=b2aaa7561cc145a5b412d187b054ba79`)
        let data = response.data.data
        return data.attributes.platform_name
    }
}



