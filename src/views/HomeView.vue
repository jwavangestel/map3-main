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
        <div class="card">
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

const zoom = ref(12.70);
const center = ref([51.42322, 5.359482]);



const defaultOptions = {
  weight: 1,
  opacity: 1,
  fillOpacity: 0.7
};

const fillColors = {
  weiland: '#35ac10',
  boomgaard: '#e8c030',
  bebouwing: '#d1c40f',
  dennenbos: '#31714c',
  hakhout: '#72a35b',
  hooiland: '#99995a',
  kerkhof: '#d53ccd',
  tuin: '#aa6e05',
  heide: '#9152d5',
  bouwland: '#f9ff3d',
  wateren: '#44afef',
  bouw: '#460156',
  hgb_wateren: '#44afef',
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

const getGeoServerPerceel = (async (type) => {
  const response = await EventService.getGeoServerPerceel(type);
  return response.data;
});

const getStyleOptionsFunction = ((type) => {
  const styleOptions = { ...defaultOptions };
  if (type in fillColors) {
    styleOptions.fillColor = fillColors[type];
  }
  styleOptions.color = 'black'
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
  featureStore.setCurrentFeature(e.target.feature);
});

const onEachFeature = ((feature, layer) => {
  layer.on({
    click: layerClick,
  })
});

const geoJsonOptions = {
  onEachFeature,
};

onMounted(async () => {
  const promises = [];
  promises.push(getGeoServerLijnen());
  promises.push(getGeoServer('bouw'));
  promises.push(getGeoServer('wateren'));
  promises.push(getGeoServer('perceel'));
  promises.push(getGeoServerPerceel('weiland'));
  promises.push(getGeoServerPerceel('boomgaard'));
  promises.push(getGeoServerPerceel('bebouwing'));
  promises.push(getGeoServerPerceel('dennenbos'));
  promises.push(getGeoServerPerceel('hakhout'));
  promises.push(getGeoServerPerceel('hooiland'));
  promises.push(getGeoServerPerceel('kerkhof'));
  promises.push(getGeoServerPerceel('tuin'));
  promises.push(getGeoServerPerceel('heide'));
  promises.push(getGeoServerPerceel('bouwland'));
  promises.push(getGeoServer('hgb_wateren'));

  const [ lijnen, bouw, wateren, perceel, weiland,boomgaard,bebouwing,dennenbos,hakhout,hooiland,kerkhof,tuin,heide,bouwland,hgb_wateren ] = await Promise.all(promises);
  console.log(bouw);
  geoJsonData.value = {
    lijnen,
    bouw,
    wateren,
    perceel,
    weiland,
    boomgaard,
    bebouwing,
    dennenbos,
    hakhout,
    hooiland,
    kerkhof,
    tuin,
    heide,
    bouwland,
    hgb_wateren
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
</style>