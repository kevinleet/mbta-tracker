// Retrieve API key
let apiKey = '';
(async function () {
    const response = await fetch('./api.key')
    const text = await response.text()
    apiKey = text
})()

let $navList = $('#nav-list')
let $greenBtn = $('#green-btn')
let $trainList = $('#train-list')

$greenBtn.on('click', async function() {
    let response = await axios.get(`https://api-v3.mbta.com/vehicles?api_key=b2aaa7561cc145a5b412d187b054ba79&filter[route]='Green-B,Green-C,Green-D,Green-E'`)
    let data = response.data.data
    console.log(data)
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
        // console.log(train.relationships.stop.data.id)
        
        $trainList.append(`
        <li>
            <button class="train-btn green" id="${id}" lat="${lat}" lon="${lon}">
                ${id}</br>${route}</br>${lat}, ${lon}</br>${status}</br>${stop}
            </button>
        </li>
        `)
    }
})

$trainList.on('click', 'button', function() {
    let id = $(this).prop("id")
    let lat = $(this).attr("lat")
    let lon = $(this).attr("lon")
    console.log(id, lat, lon)
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
