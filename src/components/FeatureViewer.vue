<template>
  <div class="container mt-3">
  <!-- Nav tabs -->
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a class="nav-link active" data-toggle="tab" href="#info">Info</a>
      </li>
      <li class="nav-item">
        <a class="nav-link " data-toggle="tab" href="#menu1">Eigenschappen</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-toggle="tab" href="#menu2">Menu 2</a>
      </li>
    </ul>
  </div>
<!-- Tab panes -->

<div class="tab-content">
    <div id="info" class="container tab-pane active"><br>

      <div><b>Welkom op de site Historische Geografie Brabant</b></div>
      <br><br> 
      <div>U krijg te zien:
      Een overzicht van alle kadastrale gemeenten van Brabant op 05-10-1832.
      </div>
      <br>
      <div>
        basis van het Nederlandse kadaster is in werking gesteld 1832.<br>
        De kaarten die door de landmeter getekend zijn heten minuutplans en de beschrijving van alle percelen heet ‘Oorspronkelijke Aanwijzende Tafel’ (O.A.T.). Door HGB gedigitaliseerd samengekoppeld en interactief gemaakt.
        Deze eerste meest betrouwbare kaarten die per perceel van een kadastrale plaats in geheel Nederland zijn getekend en beschreven, behalve Limburg pas in 1842.
        <br><br> 
        <div>De ingekleurde kadastrale gemeenten hebben minimaal alle percelen met eigenaar, beroep, soort eigendom, belastinggegevens en toponiemen.</div>
        <br>
        <div>De in groen gekleurde gemeenten zijn de diverse groepen vrijwilligers mee bezig.</div>
        <br>
        <div>Klik op een ingekleurde gemeente om verder te zoeken.</div>
      </div>
    </div>
    <div id="menu1" class="container tab-pane fade"><br>

      <h3>Perceel</h3>
      <div v-if="feature !== null">
      <table class="table">
        <tr><th>Kadasternummer</th><td>{{ properties.tekst }}</td></tr>
        <tr><th>Toponiem</th><td>{{ currentpklAklHGB.features[0].properties.straat }}</td></tr>
        <tr><th>Bestemming</th><td>{{ currentpklAklHGB.features[0].properties.soort }}</td></tr>

        <tr><th>Eigenaar</th><td>{{ currentpklAklHGB.features[0].properties.voortekst  }} 
          {{ currentpklAklHGB.features[0].properties.voornamen  }} 
          {{ currentpklAklHGB.features[0].properties.naam  }} 
          {{ currentpklAklHGB.features[0].properties.natekst  }} 
        </td></tr>

        <tr><th>Beroep</th><td>{{ currentpklAklHGB.features[0].properties.beroep  }}</td></tr>
      
        <tr><th>Oppervlakte</th><td><span v-if="(currentpklAklHGB.features[0].properties.grootte === '' )">{{ currentpklAklHGB.features[0].properties.cGrootte }}  m2 (berekend)</span>
          <span v-if="(currentpklAklHGB.features[0].properties.grootte !== '')">{{ currentpklAklHGB.features[0].properties.grootte }}  m2 </span></td></tr>

        <tr><th>Klassering</th><td>{{ currentpklAklHGB.features[0].properties.klassering }}</td></tr>

      </table>



      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, defineProps, ref, watch } from 'vue';
import { useFeatureStore } from "@/stores/featureStore";
import EventService from '@/services/EventService.js';
//import { controlScaleProps } from '@vue-leaflet/vue-leaflet/dist/src/functions/controlScale';



const props = defineProps({
  feature: {
    type: Object,
    required: true,
  },
});

const currentpklAklHGB = ref(null);
const pklAklHGBLoading = ref(false);

const properties = computed(() => {
  if (props.feature !== null && 'properties' in props.feature) {
    return props.feature.properties;
  }
  return null;
});

//feature.properties.objkoppel
const objkoppel = computed(() => {
  if (properties.value !== null && 'objkoppel' in properties.value) {
    return props.feature.properties.objkoppel;
  }
  return null;
});

const getPklAklHGB = (async (objkoppel) => {
  pklAklHGBLoading.value = true;
  currentpklAklHGB.value = null;
  const response = await EventService.getGeoServerPklAklHGB(objkoppel.trim());
  if ('data' in response && response.status === 200) {
    currentpklAklHGB.value = response.data;
  }
  
  pklAklHGBLoading.value = false;
});

watch(objkoppel, (newValue) => {
  // New value! fetch getGeoServerPklAklHGB
  console.log ('koppel change')
  getPklAklHGB(newValue);
});






const featureStore = useFeatureStore();






</script>