<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-3 col-lg-3">
          <a class="navbar-brand" href="#">
              <img src="../../logo_EGHV-3.jpg" alt="Logo" style="width:150px;">
          </a>
        </div>
        <div class="col-md-9 col-lg-9">
          <nav class="navbar navbar-expand-sm navbar-light justify-content-end ">

            <ul class="navbar-nav ">
              <li class="nav-item active">
                <a class="nav-link" href="#">Active</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>  
    </div>
  </div>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-3 col-lg-3">
        <div class="card  cont_box">
        <feature-viewer  :feature="currentFeature" />
        </div>
      </div>
      <div class="md-9 col-lg-9">
        <div class="card">
        <main style="height:85vh; width:74vw">
  
          <l-map ref="map" v-model:zoom="zoom" v-model:center="center" :useGlobalLeaflet="false">
            <LTileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
                layer-type="base"
                name="OpenStreetMap"
              />
          

                <l-geo-json v-for="(data, type, index) in geoJsonData" :key="index"
                :geojson="data"
                :options="geoJsonOptions"
                :options-style="getStyleOptionsFunction(type)"
              />




              <l-geo-json
                :geojson="currentFeature"
                :options="geoJsonOptions"
                :options-style="getStyleOptionsSelected"
              />
          </l-map>
        </main>
        </div>
      </div>
    </div>
  </div>
  <div class="card">
  <div class="card-body text-center footer">
    <h1>© Erfgoedhuis Veldhoven</h1>
    <p>This is a test version !</p>
  </div>
</div>

</template>


<script setup>
import "leaflet/dist/leaflet.css"
import { LMap, LTileLayer, LMarker, LGeoJson, LPopup } from "@vue-leaflet/vue-leaflet"
import { ref, onMounted, watch, computed } from 'vue'
import EventService from '@/services/EventService.js'

import { useFeatureStore } from "@/stores/featureStore";
import FeatureViewer from '@/components/FeatureViewer.vue';

const geoJsonData = ref({});
const geoJsonDataHGB = ref({});

const zoom = ref(12.70);
const center = ref([51.42322, 5.359482]);



const defaultOptions = {
  weight: 1,
  opacity: 1,
  fillOpacity: 0.7
};

const fillColors = {
  hgb_weiland: '#35ac10',
  hgb_boomgaard: '#e8c030',
  hgb_bebouwing: '#d1c40f',
  hgb_dennenbos: '#31714c',
  hgb_dennebosch: '#31714c',
  hgb_hakhout: '#72a35b',
  hgb_kaphout: '#72a35b',
  hgb_hooiland: '#99995a',
  hgb_kerkhof: '#d53ccd',
  hgb_tuin: '#aa6e05',
  hgb_heide: '#9152d5',
  hgb_bouwland: '#f9ff3d',
  hgb_moeras: '#529a9b',
  wateren: '#44afef',
  hgb_wateren: '#44afef',
  bouw: '#460156',
  gemeentes: '#d9fae1',
  opg_bomen: '#72a35b',
  hgb_waterkolk: '#44afef',


  

};

const getGeoServer = (async (type) => {
  const response = await EventService.getGeoServer(type);
  console.log(response);
  return response.data;
});
const getGeoServerLijnen = (async (type) => {
  const response = await EventService.getGeoServerLijnen();
  return response.data;
});

const getGeoServerGemeentes = (async (type) => {
  const response = await EventService.getGeoServerGemeentes();
  return response.data;
});

const getGeoServerPerceel = (async (type) => {
  const response = await EventService.getGeoServerPerceel(type);
  return response.data;
});

const getGeoServerPerceelHGB = (async (gemeente, type) => {
  const response = await EventService.getGeoServerPerceelHGB(gemeente, type);
  console.log(response);
  return response.data;
});

const getStyleOptionsFunction = ((type) => {
  console.log (type);
  const styleOptions = { ...defaultOptions };
  if (type in fillColors) {
    styleOptions.fillColor = fillColors[type];
  }
  styleOptions.color = 'black'
  console.log ("beer")
  console.log (styleOptions)
  return () => {
    return styleOptions;
  };
});

const getStyleOptionsFunctionHGB = ((type) => {
  console.log (type);
  console.log (fillColors)
  const styleOptions = { ...defaultOptions };
  if (type in fillColors) {
    console.log ("aap")
    styleOptions.fillColor = fillColors[type];
//    console.log (fillColors[type])
    console.log (styleOptions.fillColor)
  }
  styleOptions.color = 'black'
  console.log (styleOptions)
  return () => {
    return styleOptions;
  };
});


const  getStyleOptionsSelected = {   
    color: "#cf1b1b",
    weight: 3
 }


const featureStore = useFeatureStore();

const currentFeature = computed(() => featureStore.currentFeature );
const layerClick = ((e) => {
  console.log('CLICK!!');
  console.log(e.target.feature);
  console.log(e.target.feature.properties.objkoppel);
  featureStore.setCurrentFeature(e.target.feature);
});

const onEachFeature = ((feature, layer) => {
  layer.on({
    click: layerClick,
  })
  var bounds = layer.getBounds();
    if(feature.properties.plaatsnaam) {
        // Get center of bounds
        var center = bounds.getCenter();
        layer.bindTooltip(feature.properties.plaatsnaam, {permanent: true, direction: "center", className: "my-labels"});
    }
});

const geoJsonOptions = {
  onEachFeature,
};

const gemeente = ["OLE00", "ZEE00", "VHV00", "LRP00", "SRD00", "xxxxx"];

onMounted(async () => {
  const promises = [];
  promises.push(getGeoServerGemeentes());
  promises.push(getGeoServerLijnen());
//  promises.push(getGeoServer('bouw'));
  promises.push(getGeoServer('wateren'));
  promises.push(getGeoServer('hgb_wateren'));

  promises.push(getGeoServerPerceelHGB(gemeente, 'heide'));
  promises.push(getGeoServerPerceelHGB(gemeente, 'bouwland'));
  promises.push(getGeoServerPerceelHGB(gemeente, 'weiland'));
  promises.push(getGeoServerPerceelHGB(gemeente, 'boomgaard'));
  promises.push(getGeoServerPerceelHGB(gemeente, 'bebouwing'));
  promises.push(getGeoServerPerceelHGB(gemeente, 'dennenbos'));
  promises.push(getGeoServerPerceelHGB(gemeente, 'hakhout'));
  promises.push(getGeoServerPerceelHGB(gemeente, 'hooiland'));
  promises.push(getGeoServerPerceelHGB(gemeente, 'kerkhof'));
  promises.push(getGeoServerPerceelHGB(gemeente, 'tuin'));
  promises.push(getGeoServerPerceelHGB(gemeente, 'dennebosch'));
  promises.push(getGeoServerPerceelHGB(gemeente, 'kaphout'));
  promises.push(getGeoServerPerceelHGB(gemeente, 'moeras'));  
  promises.push(getGeoServerPerceelHGB(gemeente, 'opg_bomen'));
  promises.push(getGeoServerPerceelHGB(gemeente, 'waterkolk'));


  const [  gemeentes, lijnen, wateren, hgb_wateren, hgb_heide, hgb_bouwland, hgb_weiland, hgb_boomgaard, hgb_bebouwing, hgb_dennenbos, hgb_hakhout, hgb_hooiland, hgb_kerkhof, hgb_tuin, 
  hgb_dennebosch,
   hgb_kaphout,
   hgb_moeras,
   hgb_opg_bomen,
   hgb_waterkolk,
 ] = await Promise.all(promises);

  geoJsonData.value = {

    gemeentes,
    lijnen,
    wateren,
    hgb_wateren,
    hgb_heide,
    hgb_bouwland,
    hgb_weiland,
    hgb_boomgaard,
    hgb_bebouwing,
    hgb_dennenbos,
    hgb_hakhout,
    hgb_hooiland,
    hgb_kerkhof,
    hgb_tuin,
    hgb_dennebosch,
    hgb_kaphout,
    hgb_moeras,
    hgb_opg_bomen,
    hgb_waterkolk,
  };

  geoJsonDataHGB.value = {

  };



  console.log(geoJsonData.value);
});




</script>


<style>
html, body {
  margin: 0;
  padding: 0;
}

main {
  height: 100vh;
  width: 100vw;
}

.footer {
  color: #ffffff;
  background-color: #13164e;
} 

.cont_box {
  border-style: solid;
  border-width: 3px;
  border-color: black;
}
</style>