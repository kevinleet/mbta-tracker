# MBTA Tracker

## Description
This web application queries data from the MBTA V3 API and plots positions of routes, trains and stops on a map that is powered by the MapQuest.js SDK.

The /vehicles endpoint of the MBTA V3 API can be queried with a route filter to return information about all trains on a given route. This application allows users to select between the Green Lines (B, C, D, E), Red Line, Orange Line, Blue Line, and Commuter Rail. 

Once a route is selected, the sidebar on the left side of the page will populate vertically with a button for each active train on the selected line.

These sidebar buttons will contain the following information:
- train number
- direction (e.g. inbound/outbound, northbound/southbound)
- current status (e.g. stopped, in transit to, arriving at)
- the station that the status is referring to (will always be the current station if stopped, or the next station if in transit)
- estimated minutes until arrival at next station (will display only if information is available via the /predictions endpoint)

In addition to the populating of the sidebar with train buttons, the displayed map will also plot the following:
- train routes (rendered as one continuous line)
- train stops (rendered as small white circle icons, on-click tooltip will display the name of the stop)
- active trains (rendered as circular icons with text indication the line, on-click tooltip will display train information)

Above the displayed map is an input field that allows users to input a location (address, zip code, or coordinates) and a marker corresponding to
that location will be rendered on the map, and the map will pan and center to that marker. Users are able to add multiple markers to the map and the markers will remain on the map even when selecting between the different lines.

## Development Process

## Resources
GitHub Repo [https://github.com/kevinleet/mbtatracker]
Trello [https://trello.com/b/p2aaoudT/mbta-tracker]

## Credits
- MBTA V3 API [https://www.mbta.com/developers/v3-api]
- MapQuest.js SDK [https://developer.mapquest.com/documentation/mapquest-js/v1.3/]
- Leaflet JS Library Documentation [https://leafletjs.com/index.html]
- Wikipedia, MBTA Icons [https://commons.wikimedia.org/wiki/Category:MBTA_icons]