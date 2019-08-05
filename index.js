const Lautfm = require('lautfm');
const $ = require('jquery');
const laut = new Lautfm();

let player = $('audio').get(0);

let filter = {
    by: 'letter', // filter by letter
    term: 'e'     // stationname starting with 'e'
  }
laut.getStations(filter)
    .then(stations => {
        console.log(stations);
        $('#station-list').html();
        if(stations) {
            stations.forEach(station => {
                let results = `<li class="list-group-item" ondblclick="playStation('${station.stream_url}')">
                    <img class="img-circle media-object pull-left" src="
                        ${station.images.station_80x80}
                    " width="32" height="32">
                    <div class="media-body">
                        <strong>${station.display_name ? station.display_name : station.name}</strong>
                        <p>${station.description}</p>
                    </div>
                </li>`;
                $('#station-list').append(results);
            });
        }
    })
    .catch(err => console.error(err));

function playStation(url) {
    player.src = url;
    player.load();
    player.play();
}