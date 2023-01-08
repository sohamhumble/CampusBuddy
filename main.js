mapboxgl.accessToken = 'pk.eyJ1Ijoic29oYW1odW1ibGUiLCJhIjoiY2xjaWxlY2xrMDFzYjNvbTc1cDBpdzR4ayJ9.Su-FqP8qsHLcdiDcNt4eRA';

//map object here
const map = new mapboxgl.Map(
    {
        container: 'map',
        style:
            'mapbox://styles/mapbox/streets-v12'
            // 'mapbox://styles/sohamhumble/clckafv2h002i14o3mbrsntvo'
        ,
        center: [84.90415974441156, 22.2514804819984], // starting position
        //22.2514804819984, 84.90415974441156
        zoom: 16,
    }
);

// //Markers location
// const geojson = {
//     type: 'FeatureCollection',
//     features: [
//       {
//         type: 'Feature',
//         geometry: {
//           type: 'Point',
//           coordinates: [84.90415974441156, 22.2514804819984] //22.25136279582746, 84.9048626761911
//         },
//         properties: {
//           title: 'Mapbox',
//           description: 'LA 1'
//         }
//       },
//     ]
//   };

//   // add markers to map
// for (const feature of geojson.features) {
//     // create a HTML element for each feature
//     const el = document.createElement('div');
//     el.className = 'marker';
  
//     // make a marker for each feature and add to the map
//     // new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(map);
//     new mapboxgl.Marker(el)
//   .setLngLat(feature.geometry.coordinates)
//   .setPopup(
//     new mapboxgl.Popup({ offset: 25 }) // add popups
//       .setHTML(
//         `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
//       )
//   )
//   .addTo(map);
//   }

const stores = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            84.90485824729458,
            22.251394695977872
          ]
        },
        "properties": {
            "subject": "CS100",
            "room": "LA 101",
          
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            84.90441472340716,
            22.252462157206594
          ]
        },
        "properties": {
            
            "subject": "BM101",
          "room": "BM 204",
        }
      },
      //22.25196892428798, 84.8997227424809
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            84.8997227424809,
            22.25196892428798
          ]
        },
        "properties": {
            
            "subject": "HackNITR 4.0",
          "room": "SAC",
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            84.89961379373095,
            22.24984535925924
          ]
        },
        "properties": {
            
            "subject": "Medical Emergency",
          "room": "Institute Healt Centre",
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            84.90112017649389,
            22.251953072002394
          ]
        },
        "properties": {
            
            "subject": "Stationary Shop",
          "room": "J. D Enterprises",
        }
      },
    ]
  };
  map.on('load', () => {
    /* Add the data to your map as a layer */
    // map.addLayer({
    //   id: 'locations',
    //   type: 'circle',
    //   /* Add a GeoJSON source containing place coordinates and information. */
    //   source: {
    //     type: 'geojson',
    //     data: stores
    //   }
    // });
    map.addSource('places', {
        type: 'geojson',
        data: stores
      });
      addMarkers();
    buildLocationList(stores);
  });
  function addMarkers() {
    /* For each feature in the GeoJSON object above: */
    for (const marker of stores.features) {
      /* Create a div element for the marker. */
      const el = document.createElement('div');
      /* Assign a unique `id` to the marker. */
      el.id = `marker-${marker.properties.id}`;
      /* Assign the `marker` class to each marker for styling. */
      el.className = 'marker';
  
      /**
       * Create a marker using the div element
       * defined above and add it to the map.
       **/
      new mapboxgl.Marker(el, { offset: [0, -23] })
        .setLngLat(marker.geometry.coordinates)
        .addTo(map);
        el.addEventListener('click', (e) => {
            /* Fly to the point */
            flyToStore(marker);
            /* Close all other popups and display popup for clicked store */
            createPopUp(marker);
            /* Highlight listing in sidebar */
            const activeItem = document.getElementsByClassName('active');
            e.stopPropagation();
            if (activeItem[0]) {
              activeItem[0].classList.remove('active');
            }
            const listing = document.getElementById(`listing-${marker.properties.id}`);
            listing.classList.add('active');
          });
    }
  }
  /* Assign a unique ID to each store */
stores.features.forEach(function (store, i) {
    store.properties.id = i;
  });
//   map.on('click', (event) => {
//     /* Determine if a feature in the "locations" layer exists at that point. */
//     const features = map.queryRenderedFeatures(event.point, {
//       layers: ['locations']
//     });
  
//     /* If it does not exist, return */
//     if (!features.length) return;
  
//     const clickedPoint = features[0];
  
//     /* Fly to the point */
//     flyToStore(clickedPoint);
  
//     /* Close all other popups and display popup for clicked store */
//     createPopUp(clickedPoint);
  
//     /* Highlight listing in sidebar (and remove highlight for all other listings) */
//     const activeItem = document.getElementsByClassName('active');
//     if (activeItem[0]) {
//       activeItem[0].classList.remove('active');
//     }
//     const listing = document.getElementById(
//       `listing-${clickedPoint.properties.id}`
//     );
//     listing.classList.add('active');
//   });
  function buildLocationList(stores) {
    for (const store of stores.features) {
      /* Add a new listing section to the sidebar. */
      const listings = document.getElementById('listings');
      const listing = listings.appendChild(document.createElement('div'));
      /* Assign a unique `id` to the listing. */
      listing.id = `listing-${store.properties.id}`;
      /* Assign the `item` class to each listing for styling. */
      listing.className = 'item';
  
      /* Add the link to the individual listing created above. */
      const link = listing.appendChild(document.createElement('a'));
      link.href = '#';
      link.className = 'title';
      link.id = `link-${store.properties.id}`;
      link.innerHTML = `${store.properties.subject}`;
  
      /* Add details to the individual listing. */
      const details = listing.appendChild(document.createElement('div'));
      details.innerHTML = `${store.properties.room}`;
    //   if (store.properties.phone) {
    //     details.innerHTML += ` · ${store.properties.}`;
    //   }
      if (store.properties.distance) {
        const roundedDistance = Math.round(store.properties.distance * 100) / 100;
        details.innerHTML += `<div><strong>${roundedDistance} miles away</strong></div>`;
      }
      link.addEventListener('click', function () {
        for (const feature of stores.features) {
          if (this.id === `link-${feature.properties.id}`) {
            flyToStore(feature);
            createPopUp(feature);
          }
        }
        const activeItem = document.getElementsByClassName('active');
        if (activeItem[0]) {
          activeItem[0].classList.remove('active');
        }
        this.parentNode.classList.add('active');
      });
    }
  }
  function flyToStore(currentFeature) {
    map.flyTo({
      center: currentFeature.geometry.coordinates,
      zoom: 15
    });
  }
  
  function createPopUp(currentFeature) {
    const popUps = document.getElementsByClassName('mapboxgl-popup');
    /** Check if there is already a popup on the map and if so, remove it */
    if (popUps[0]) popUps[0].remove();
  
    const popup = new mapboxgl.Popup({ closeOnClick: false })
      .setLngLat(currentFeature.geometry.coordinates)
      .setHTML(`<h3>NITR</h3><h4>${currentFeature.properties.subject}</h4>`)
      .addTo(map);
  }


// Search Bar feature (Geocoder)
const geocoder = new MapboxGeocoder({
    // Initialize the geocoder
    accessToken: mapboxgl.accessToken, // Set the access token
    mapboxgl: mapboxgl, // Set the mapbox-gl instance
    marker: false, // Do not use the default marker style
    placeholder: '          Search for places in NITR',
    bbox: [84.89281921924896, 22.244305799688874, 84.9196419774936, 22.257963104960922], // Boundary for Berkeley
    proximity: {
        longitude: 84.90415974441156,
        latitude: 22.2514804819984
    }
});

// Add the geocoder to the map
map.addControl(geocoder);



//User Location feature
map.addControl(
    new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true
    })
);


//Zoom-in zoom-out and compass feature
map.addControl(new mapboxgl.NavigationControl());

// This part is for route feature
map.addControl(
    new MapboxDirections({
        accessToken: mapboxgl.accessToken
    }),
    'bottom-right'
);

const layerList = document.getElementById('menu');
const inputs = layerList.getElementsByTagName('input');

for (const input of inputs) {
    input.onclick = (layer) => {
        const layerId = layer.target.id;
        map.setStyle('mapbox://styles/mapbox/' + layerId);
    };
}

const bounds = [
    [84.89040526470028, 22.24271023287147], // Southwest coordinates
    [84.91624226342324, 22.257901545224765] // Northeast coordinates

];


// Listen for the `result` event from the Geocoder // `result` event is triggered when a user makes a selection
//  Add a marker at the result's coordinates
geocoder.on('result', (event) => {
    map.getSource('single-point').setData(event.result.geometry);
});
map.setMaxBounds(bounds);