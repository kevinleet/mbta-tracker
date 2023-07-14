# MBTA Tracker

![mbta_map](https://github.com/kevinleet/mbtatracker/blob/main/images/mbta_map.png?raw=true)

Link to Deployed Application: [mbta-tracker-production.up.railway.app/](https://mbta-tracker-production.up.railway.app/)

## Description

MBTA Tracker is a web application that queries data from the MBTA V3 API and plots positions of routes, trains, and stops on a map powered by the MapQuest.js SDK.

The application allows users to select different MBTA train lines such as the Green Lines (B, C, D, E), Red Line, Orange Line, Blue Line, and Commuter Rail. Once a route is selected, the sidebar on the left side of the page will populate vertically with a button for each active train on the selected line.

The sidebar buttons provide the following information:

- Train number
- Direction (inbound/outbound, northbound/southbound)
- Current status (stopped, in transit to, arriving at)
- Station information (current or next station)
- Estimated minutes until arrival at the next station (if available via the /predictions endpoint)

The displayed map shows the following:

- Train routes (rendered as continuous lines)
- Train stops (rendered as small white circle icons, with tooltips displaying stop names)
- Active trains (rendered as circular icons with text indicating the line, with tooltips displaying train information)

Above the map, there is an input field where users can enter a location (address, zip code, or coordinates). The application will render a marker corresponding to the entered location on the map, and the map will pan and center to that marker. Users can add multiple markers to the map, and the markers will remain even when selecting different train lines.

## Resources

- GitHub Repo: [https://github.com/kevinleet/mbta-tracker](https://github.com/kevinleet/mbta-tracker)
- Trello: [https://trello.com/b/p2aaoudT/mbta-tracker](https://trello.com/b/p2aaoudT/mbta-tracker)

## Credits

- MBTA V3 API: [https://www.mbta.com/developers/v3-api](https://www.mbta.com/developers/v3-api)
- MapQuest.js SDK: [https://developer.mapquest.com/documentation/mapquest-js/v1.3/](https://developer.mapquest.com/documentation/mapquest-js/v1.3/)
- Leaflet JS Library Documentation: [https://leafletjs.com/index.html](https://leafletjs.com/index.html)
- Wikipedia, MBTA Icons: [https://commons.wikimedia.org/wiki/Category:MBTA_icons](https://commons.wikimedia.org/wiki/Category:MBTA_icons)

## Usage

To use the MBTA Tracker application, follow these steps:

1. Visit the deployed application at [https://level-wound.surge.sh/](https://level-wound.surge.sh/).
2. Select a train line from the navigation bar at the top of the page.
3. The sidebar will populate with buttons representing active trains on the selected line.
4. Click on a train button to center the map on the train's location.
5. Enter a location in the input field above the map to add a marker for that location.
6. To switch between different train lines, click on the corresponding buttons in the navigation bar.

## Development

If you want to set up the project locally for development, follow these steps:

1. Clone the GitHub repository: `git clone https://github.com/kevinleet/mbtatracker.git`
2. Navigate to the project directory: `cd mbtatracker`
3. Open the `index.html` file in a web browser.

## Acknowledgments

This application was created by Kevin Li. Feel free to use, modify, and distribute this code as you wish. Enjoy playing!
