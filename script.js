const searchResultsDiv = document.querySelector("#searchResults")
const airQualityDiv = document.querySelector("#airQuality")
const resultsForDiv = document.querySelector("#resultsFor")
const form = document.querySelector("#form")
const locationInput = document.querySelector("#location")
const infoDiv = document.querySelector("#info")
const homepageTextDiv = document.querySelector("#homepageText")


form.addEventListener('submit', e => {
 e.preventDefault()
 fetchLocation()
})


async function fetchLocation() {
 homepageTextDiv.style.display = 'none'
 infoDiv.style.display = 'none'
 const url = `https://geocoding-api.open-meteo.com/v1/search?name=${locationInput.value}&count=10&language=en&format=json`
 const locations = await getLocations(url)
 // console.log(locations)
 renderLocations(locations)
}


async function getLocations(url) {
 let res = await fetch(url)
 // console.log(res)
 let data = await res.json()
 // console.log(data)
 return data.results
}




function renderLocations(locations) {
 resultsForDiv.innerHTML = `<h3>Results for ${locationInput.value}</h3>`
 searchResultsDiv.innerHTML = ``
 airQualityDiv.innerHTML = ""
 console.log("locations:", locations)
 for (let i = 0; i < locations?.length; i ++) {
   /* 
     []    = "at the index of..."    works on strings or arrays
     i     = iteration number
   */
     const city = locations[i] // [] the square brackets is telling the console how many cities to display-- 0-9
     searchResultsDiv.innerHTML += `
         <div class="city">
             Name: ${city.name} <br>
             Region: ${city.admin1} <br>
             Country: ${city.country} <br>
             <button onclick="selectLocation('${city.name}', ${city.latitude}, ${city.longitude})">
               Select
             </button>
         </div>
     `
 }
}


// async = asynchronous = multitasking


 // const keys =[
 //     "time",
 //     "pm10",
 //     "pm2_5",
 //     "carbon_monoxide",
 //     "nitrogen_dioxide",
 //     "sulphur_dioxide",
 //     "ozone",
 //     "aerosol_optical_depth",
 //     "dust",
 //     "uv_index",
 //     "uv_index_clear_sky"
 // ]


const healthyRanges = {
 'Carbon monoxide': 'Unsafe: below ...'
}


const infos = {
 'Particulate matter': `
      PARTICULATE MATTER
      <br>
      These are very small and fine inhalable particles. <br>
      They have diameters that are usually 2.5 micrometers and sometimes they are even smaller. 
      <br>They can penetrate deep into the lungs and sometimes they even enter the bloodstream, which can cause respiratory and cardiovascular issues. 
      <br>Exposure to these particles for even a few days can cause heart disease
      <br>
      <br> - Super Safe: 0-12 µg/m³ - considered excellent and pose minimal risk
      <br>
      <br> - Safe: 12-35 µg/m³ - considered acceptable according to most air quality standards
      <br>
      <br> - Moderate: 35-55 µg/m³ - can start posing health concerns, particularly <br>
      for sensitive groups
      <br>
      <br> - Unhealthy for Sensitive Groups: 55-150 µg/m³ - elderly and people with conditions <br>
      should stay inside or wear masks outside
      <br>
      <br> - Very Unhealthy: 250-350 µg/m³ - significant health risks to both people with <br>
      and without pre-existing conditions. Only go outside if really necessary.
      <br>
      <br> - Hazardous: >350 µg/m³ - these levels pose severe health risks. Nobody, regardless <br>
      if you have a pre-existing condition or not, should leave their houses. If you have air purifiers, use them. 
 `,
 'Carbon monoxide': `
      ### CARBON MONOXIDE PARTICLES

Carbon monoxide (CO) is a colorless, odorless gas that can be harmful to your health. 
<br>It interferes with the body's ability to transport oxygen, leading to serious health issues. 

<br>They can penetrate deep into the lungs and sometimes they even enter the bloodstream, which can cause respiratory and cardiovascular issues. 
<br>Exposure to these particles for even a few days can cause heart disease.
<br>
<br> - Super Safe: 0-10 µg/m³ - Excellent air quality with minimal risk to health.
<br>
<br> - Safe: 10-35 µg/m³ - Acceptable levels according to most air quality standards; little to no health impact for the general population.
<br>
<br> - Moderate: 35-50 µg/m³ - Can pose health concerns, particularly for sensitive individuals such as those with respiratory or heart conditions.
<br>
<br> - Unhealthy for Sensitive Groups: 50-200 µg/m³ - Elders and people with pre-existing conditions should limit outdoor activities and consider using masks.
<br>
<br> - Very Unhealthy: 200-400 µg/m³ - Significant health risks for everyone, not just those with pre-existing conditions. Outdoor activities should be avoided unless absolutely necessary.
<br>
<br> - Hazardous: >400 µg/m³ - Severe health risks including potential for unconsciousness, poisoning, and even death. Stay indoors and use air purifiers if available.

 `,
 'Nitrogen dioxide': '',
 'Sulphur dioxide': '',
 'Ozone': '',
 'Aerosol optical depth': '',
 'Dust': '',
 'UV index': ''
}






function displayInfo(label) {
 infoDiv.style.display = 'inline-block'
 infoDiv.innerHTML = infos[label]
}


async function selectLocation(cityName, lat, lng) {
 resultsForDiv.innerHTML = ""
 searchResultsDiv.innerHTML = ""
 airQualityDiv.innerHTML = ""


 const res = await fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lng}&hourly=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,aerosol_optical_depth,dust,uv_index,uv_index_clear_sky`)


 const data = await res.json()


 function getData (key) {
   return data.hourly[key]?.[0]
 }


 function addDataDiv(label, key, unit = "μg/m³") {
   if (!key) key = label.toLowerCase().replaceAll(' ','_')
   let data = getData(key)
   if (data === undefined) {
     console.log("data failed to load:", label, key, data)
     data = '<span class="error">not found</span>'
     unit = ""
   }
   airQualityDiv.innerHTML += `
     <div>
       <button class='label'
       title='${healthyRanges[label]}'
       onclick='displayInfo("${label}")'
       >
         ${label}
       </button>: ${data}${unit}
     </div>
   `
 }


 airQualityDiv.innerHTML += `<h2>${cityName}</h2>`
 addDataDiv('Particulate matter', 'pm2_5')
 addDataDiv('Carbon monoxide')
 addDataDiv('Nitrogen dioxide')
 addDataDiv('Sulphur dioxide')
 addDataDiv('Ozone')
 addDataDiv('Aerosol optical depth', null, '')
 addDataDiv('Dust')
 addDataDiv('UV Index', null, '')


}
