import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http//localhost:8890',
//  baseURL: 'https://gvacdata.janenlenneke.nl',
//  baseURL: 'https://ranadata.erfgoedhuisveldhoven.nl',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Accept:'Acess-Control-Allow-Origin: *',
  },
})

export default {
  getEvents(jaar, maand) {
    return apiClient.get("/?jaar=" + jaar + "&maand=" + maand)
  },


  getEvent(id) {
    return apiClient.get('?id=' + id)
  },

  getAllRoutes(jaar,maand) {
    return apiClient.get("/?allroutes=' '&Rjaar=" + jaar + "&Rmaand=" + maand )
  },

  pushPPauzeloc(datum, newPauzeloc) {
    return apiClient.post("/?datum=" + datum + "&pauzeplaats=" + newPauzeloc )
  },

  pushPRoute(datum, PPauzeloc, PRoute) {
    return apiClient.post("/?Rdatum=" + datum + "&route=" + PRoute + "&pauzeplaats=" + PPauzeloc )
  },

  putPRoute(dateFull, dateY, dateM)  {
    return apiClient.put("/?Pdatum=" + dateFull + "&Pjaar=" + dateY + "&Pmaand=" + dateM )
  },

  deletePRoute(Ddatum, Droute, Dpauzeplaats)  {
    return apiClient.delete("/?Ddatum=" + Ddatum + "&Droute=" + Droute + "&Dpauzeplaats=" + Dpauzeplaats )
  }
}  