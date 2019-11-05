let maps = {};

function createMap(name) {
  $(document).ready(function() {
    L.Map.addInitHook(function () {
      maps[name] = this;
    });

    let e = $("#" + name);

    if(e == null) {
      return;
    }

    var map = maps[name];
    if(e.length > 0) {
      map = L.map(name, { maxZoom: 17, zoomControl:false }).setView([-6.232563, 34.932618], 7);
      L.control.zoom({
          position: 'bottomright'
      }).addTo(map);

      var esri = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
      }).addTo(map);

      map.on('dragend',function(e){
        loadUsers(map);
      });

      loadUsers(map);
    } else {
      console.log('dom element not found');
    }
  });
}

function loadUsers(map) {
  if(map['markers'] == null) {
    map['markers'] = [];
  } else {
    for(let m of map['markers']){
      map.removeLayer(m);
    }
  }

  var bounds = map.getBounds();
  var northWest = bounds.getNorthWest();
  var southEast = bounds.getSouthEast();
  var url = "http://localhost:3001/console/insights/users?top_left_lat=" + northWest.lat + "&top_left_lon=" + northWest.lng + "&bottom_right_lat=" + southEast.lat + "&bottom_right_lon=" + southEast.lng;

  $.get(url, function( data ) {
    for(var d of data.users) {
      map['markers'].push(new L.marker([d.latitude, d.longitude]).addTo(map));
    }
    // var markers = L.layerGroup([]).addTo(map);
  });
}
