<template>
  <div class="feature-table">

    <table class="table">
      <thead>
        <tr>
          <th>
            Eigenschappen
          </th>
          
        </tr>
      </thead>
      <tr><th>Gemeente</th><td>{{ properties.oat_gemeente }}</td></tr>
      <tr><th>Toponiem</th><td>{{ properties.oat_gehucht }}</td></tr>
      <tr><th>Eigenaar</th><td>{{ properties.oat_voornaam  }} {{ properties.oat_tussenvoegsel  }} {{ properties.oat_naam_eigenaar  }}</td></tr>
      <tr><th>Woonplaats</th><td>{{ properties.oat_woonplaats }}</td></tr>
      <tr><th>Beroep</th><td>{{ properties.oat_beroep }}</td></tr>
      <tr><th>Perceel</th><td>{{ properties.perceel }}</td></tr>
      <tr><th>Oppervlakte</th><td>{{ properties.oat_bunder }}  bunder,</td></tr>
      <tr><th></th><td>{{ properties.oat_roede }}  roede,</td></tr>
      <tr><th></th><td>{{ properties.oat_ellen }}  ellen</td></tr>
      <tr><th>Klasse</th><td>{{ properties.oat_klasse }}</td></tr>
      <tr><th>Gebruik</th><td>{{ properties.oat_omschrijving }}{{ properties.oat_bbdec }}</td></tr>
    </table>
  </div>
</template>
<script setup>
import { computed, defineProps } from 'vue';
import { useFeatureStore } from "@/stores/featureStore";

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

const close = (() => {
  featureStore.resetCurrentFeature();
});


</script>