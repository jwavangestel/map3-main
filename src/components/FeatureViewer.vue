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
        <tr><td>Kadasternummer</td><td>{{ properties.tekst }}</td></tr>
        <tr><td>Toponiem</td><td>{{ properties.straat }}</td></tr>
        <tr><td>Bestemming</td><td>{{ properties.soort }}</td></tr>

        <tr><th>Eigenaar</th><td>{{ properties.oat_voornaam  }} {{ properties.oat_tussenvoegsel  }} {{ properties.oat_naam_eigenaar  }}</td></tr>
        <tr><th>Woonplaats</th><td>{{ properties.oat_woonplaats }}</td></tr>
        <tr><th>Beroep</th><td>{{ properties.oat_beroep }}</td></tr>
      
        <tr><th>Oppervlakte</th><td>{{ properties.oat_bunder }}  bunder,</td></tr>
        <tr><th></th><td>{{ properties.oat_roede }}  roede,</td></tr>
        <tr><th></th><td>{{ properties.oat_ellen }}  ellen</td></tr>
        <tr><th>Klasse</th><td>{{ properties.oat_klasse }}</td></tr>
      </table>


      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, defineProps } from 'vue';
import { useFeatureStore } from "@/stores/featureStore";
//import { controlScaleProps } from '@vue-leaflet/vue-leaflet/dist/src/functions/controlScale';



const props = defineProps({
  feature: {
    type: Object,
    required: true,
  },
});

const properties = computed(() => {
  if ('properties' in props.feature) {
    return props.feature.properties;
  }
  return null;
});




const featureStore = useFeatureStore();






</script>