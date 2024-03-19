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
  getGeoServerPerceelHGB(laag, gemeente) {
    console.log('GETTING', gemeente);
      return apiClient.get("?service=WFS&version=1.0.0&request=GetFeature&outputFormat=application%2Fjson&typeName=hgb%3A" + laag + "&cql_filter=gemeente%20=%20%27" + gemeente + "%27")
  },

}