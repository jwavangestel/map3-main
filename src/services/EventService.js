import axios from 'axios'


const apiClient = axios.create({
//  baseURL: 'http://yann216.nl:8080/geoserver/eghv/ows',
  baseURL: 'http://localhost:8080/geoserver/hgb/ows',
  withCredentials: false,

})

export default {
  getGeoServer(laag) {
    console.log('GETTING', laag);
    return apiClient.get("?service=WFS&version=1.0.0&request=GetFeature&outputFormat=application%2Fjson&typeName=hgb%3A" + laag)
  },
  getGeoServerPerceel(soort) {
    console.log('GETTING', soort);
      return apiClient.get("?service=WFS&version=1.0.0&request=GetFeature&outputFormat=application%2Fjson&typeName=hgb%3Aperceel&cql_filter=oat_omschrijving%20=%20%27" + soort + "%27")
  },
  getGeoServerLijnen() {
    console.log('GETTING lijnen');
      return apiClient.get("?service=WFS&version=1.0.0&request=GetFeature&maxFeatures=10000&outputFormat=application%2Fjson&typeName=hgb%3ALijnen%20Veldhoven")
  },
  getGeoServerPerceelHGB(gemeente, soort) {
    console.log('GETTING', gemeente, soort);
      return apiClient.get("?service=WFS&version=1.0.0&request=GetFeature&outputFormat=application%2Fjson&typeName=hgb%3Apcl_percelen&cql_filter=soort%20=%20%27" + soort + "%27"
       + "%20AND%20(gemeente%20=%20%27" + gemeente[0] + "%27"
       + "%20OR%20gemeente%20=%20%27" + gemeente[1] + "%27" 
       + "%20OR%20gemeente%20=%20%27" + gemeente[2] + "%27"
       + "%20OR%20gemeente%20=%20%27" + gemeente[3] + "%27"
       + "%20OR%20gemeente%20=%20%27" + gemeente[4] + "%27"
       + "%20OR%20gemeente%20=%20%27" + gemeente[5] + "%27)")
  },
  getGeoServerGemeentes() {
    console.log('GETTING gemeentes');
      return apiClient.get("?service=WFS&version=1.0.0&request=GetFeature&maxFeatures=10000&outputFormat=application%2Fjson&typeName=hgb%3Agemeentes")
  },
  getGeoServerPklAklHGB(objkoppel) {
    console.log('GETTING', objkoppel);
      return apiClient.get("?service=WFS&version=1.0.0&request=GetFeature&outputFormat=application%2Fjson&typeName=hgb%3Apcl_details&cql_filter=objkoppel%20=%20%27" + objkoppel + "%27")
  },
}