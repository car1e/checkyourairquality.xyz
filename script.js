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
      <b>PARTICULATE MATTER</b>
      <br>
      These are very small and fine inhalable particles. <br>
      They have diameters that are usually 2.5 micrometers and sometimes they are even smaller. 
      <br>They can penetrate deep into the lungs and sometimes they even enter the bloodstream, which can cause respiratory and cardiovascular issues. 
      <br>Exposure to these particles for even a few days can cause heart disease
      <br>
      <br> - Super Safe: 0-12 µg/m³ <b>(micrograms per cubic meter)</b> - considered excellent and pose minimal risk
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
      <b>CARBON MONOXIDE</b>

      <br>This colorless, odorless gas is emitted from vehicles and industrial processes. 
      <br>It binds to hemoglobin in the blood, reducing its ability to carry oxygen, leading to symptoms like headaches, dizziness, and in high concentrations, can be lethal. 
      
      <br>Carbon monoxide particles can penetrate deep into the lungs and sometimes they even enter the bloodstream, which can cause respiratory and cardiovascular issues. 
      <br>Exposure to these particles for even a few days can be harmful, as it attaches to hemoglobin in the blood, which reduces the ability of blood to carry oxygen.
      <br>
      <br> - Super Safe: 0-10 µg/m³ <b>(micrograms per cubic meter)</b> - Excellent air quality with no/minimal risk to health.
      <br>
      <br> - Safe: 10-35 µg/m³ - Acceptable levels according to most air quality standards; little to no health impact for the general population.
      <br>
      <br> - Moderate: 35-50 µg/m³ - Can pose health concerns, particularly for sensitive individuals such as those with respiratory or heart conditions like asthma.
      <br>
      <br> - Unhealthy for Sensitive Groups: 50-200 µg/m³ - The elderly and people with pre-existing conditions should consider using masks and reduce outside activity.
      <br>
      <br> - Very Unhealthy: 200-400 µg/m³ - Significant health risks for everyone, even those without pre-existing conditions. Outdoor activities should be avoided unless absolutely necessary.
      <br>
      <br> - Hazardous: >400 µg/m³ - Severe health risks. If exposed, you may experience: unconsciousness, poisoning, and even death. Stay inside and use air purifiers if available.

 `,
 'Nitrogen dioxide': `
      <b>NITROGEN DIOXIDE</b>
      <br>This is a gas mainly emitted from vehicles, power plants, and industrial facilities. 
      <br>NO2 can irritate the respiratory system, decrease lung function/decrease your lung efficiency, and exacerbate respiratory conditions like asthma 
      <br>(essentially, the effects of Nitrogen Dioxide are quite similar to the effects of particulate matter).
      <br>
      <br> - Super Safe: 0-20 µg/m³ <b>(micrograms per cubic meters)</b>: In areas with effective air quality management and low levels of vehicular traffic and industrial activity, it's more common to find NO₂ concentrations within this range. 
      <br>These areas may include suburban or rural locations with fewer sources of pollution.
      <br>
      <br> - Safe: 20-40 µg/m³: This range is still relatively common in urban areas with moderate traffic and industrial emissions. 
      <br>While NO₂ levels may occasionally exceed 20 µg/m³, they often remain below 40 µg/m³, especially in regions with stricter air quality regulations and pollution control measures.
      <br>
      <br> - Moderate: 40-100 µg/m³: NO₂ concentrations in this range are more common in densely populated urban areas with heavy traffic congestion and industrial activities. 
      <br>Locations near major roadways, busy intersections, or industrial zones may frequently experience NO₂ levels within this range, especially during peak traffic hours and under certain weather conditions like temperature inversions.
      <br>
      <br> - Unhealthy for Sensitive Groups: 100-200 µg/m³: While this range is lower than most others, NO₂ levels in this range may occur in urban areas with a lot vehicular traffic and industrial emissions, 
      <br>particularly in regions with poor air quality management (such as Tarvisio). People living near major highways or industrial facilities may experience NO₂ concentrations in this range more frequently.
      <br>
      <br> - Very Unhealthy: 200-700 µg/m³: NO₂ concentrations exceeding 200 µg/m³ are relatively rare and typically occur during episodes of severe air pollution, 
      <br>such as high traffic congestion combined with adverse weather conditions like stagnant air masses or temperature inversions. 
      <br>These conditions can lead to the accumulation of pollutants, including NO₂, resulting in short-term spikes in concentration levels.
      <br>
      <br> - Hazardous: >700 µg/m³: NO₂ levels exceeding 700 µg/m³ are extremely rare and usually associated with localized pollution sources, industrial accidents, or severe environmental conditions. 
      <br>These concentrations pose significant health risks and may trigger emergency responses, including evacuations and temporary shutdowns of industrial facilities.
  `,
 'Sulphur dioxide': `
      <b>SULPHUR DIOXIDE</b>
  
      <br> Sulphur dioxide (SO2) is produced from burning fossil fuels. Mainly in industrial processes and power plants. It can irritate the respiratory system, leading to respiratory illnesses and 
      <br>aggravating existing conditions like asthma and bronchitis (once again, these pollutants will always worsen pre-existing conditions such as asthma).
      <br>
      <br> - Super Safe: 0-20 µg/m³ <b>(micrograms per cubic meter)</b>: Typically found in areas with effective air quality management and minimal industrial activity.
      <br>
      <br> - Safe: 20-50 µg/m³: This range is common in urban areas with moderate industrial and vehicular emissions, often compliant with air quality regulations.
      <br>
      <br> - Moderate: 50-100 µg/m³: SO₂ concentrations in this range are more prevalent in densely populated urban areas with industrial activity and traffic.
      <br>
      <br> - Unhealthy for Sensitive Groups: 100-350 µg/m³: While less common, this range may occur in areas with significant industrial emissions, posing risks to sensitive individuals.
      <br>
      <br> - Very Unhealthy: 350-500 µg/m³: SO₂ levels exceeding 350 µg/m³ are relatively rare and usually associated with industrial activities or localized pollution sources.
      <br>
      <br> - Hazardous: >500 µg/m³: Rare occurrences of SO₂ levels exceeding 500 µg/m³ may result from industrial accidents or severe environmental conditions, posing severe health risks.

  `,
 'Ozone': `
 <b>OZONE</b>

 <br>Ground-level ozone (O3) is formed when pollutants react with sunlight. It can cause respiratory issues like chest pain, coughing, and throat irritation. 
 <br>Long-term exposure may lead to decreased lung function and aggravate conditions like asthma and bronchitis. 
 <br>
 <br> - Super Safe: 0-20 µg/m³ <b>(micrograms per cubic meter)</b>: This range is quite common in places that aren't hot and do well at maintaining good air quality.
 <br>
 <br> - Safe: 20-50 µg/m³: This range is common in urban areas with moderate industrial and vehicular emissions, and that are relatively hot.
 <br>
 <br> - Moderate: 50-100 µg/m³: Ozone concentrations like these are much more common in hot environments that contain a lot of other air pollutants, such as nitrogen dioxide.
 <br>
 <br> - Unhealthy for Sensitive Groups: 100-150 µg/m³: This range is uncommon but still occurs from time to time. 
 <br>This range may occur in areas with significant industrial emissions, posing risks to sensitive individuals.
 <br>
 <br> - Very Unhealthy: 150-200 µg/m³: Ozone levels exceeding 150 µg/m³ are pretty rare and are usually associated with higher temperatures and sunlight.
 <br>
 <br> - Hazardous: >200 µg/m³: Ozone levels rising above 200 µg/m³ is extremely rare, but may result from stagnant air masses, extreme heat, and high emissions of precursor pollutants, 
 <br>posing severe health risks.
 `,
 'Aerosol optical depth': `
      <b>AEROSOL OPTICAL DEPTH</b>
 
      <br>Aerosol optical depth (AOD) measures the extend to which aerosols in our atmosphere prevent the the transmission of light
      <br>by either absorbing it or scattering it. 
      <br>It serves as an indicator of air quality and can impact visibility, climate, and human health.
      <br>
      <br> - Super Low: 0-0.1: Typically observed in regions with minimal aerosol pollution and clear atmospheric conditions, allowing for excellent visibility and minimal impact on health.
      <br>
      <br> - Low: 0.1-0.3: This range is typically observed in small rural villages, resulting in good visibility and minimal health effects for the general population.
      <br>
      <br> - Moderate: 0.3-0.5: AOD values in this range indicate moderate aerosol pollution, which may slightly reduce visibility and pose minor health risks to sensitive individuals.
      <br>
      <br> - High: 0.5-1.0: These higher AOD values suggest significant aerosol pollution, leading to reduced visibility and potential health impacts for sensitive groups, particularly those with respiratory conditions.
      <br>
      <br> - Very High: 1.0-2.0: Values exceeding 1.0 indicate very high levels of aerosol pollution, severely impacting visibility and posing health risks to the general population.
      <br>
      <br> - Extremely High: >2.0: Rare occurrences of AOD values exceeding 2.0 signify incredibly high aerosol pollution levels, leading to 
      <br>severely compromised visibility (close to none) and significant health hazards for everyone regardless of having pre-existing conditions.
 `,
 'Dust': `
      <b>DUST CONCENTRATION</b>
      
      <br>Dust concentration refers to the amount of particles, such as mineral dust, pollen, or other particulate matter, suspended in the atmosphere. 
      <br>It can originate from various sources including soil erosion, industrial activities, and natural phenomena like wildfires and volcanic eruptions.
      
      <br> - Super Low: 0-10 µg/m³: Normally observed in areas with minimal dust sources and calm weather conditions, resulting in clear skies and good air quality.
      <br>
      <br> - Low: 10-50 µg/m³: Common in regions with occasional dust events, such as mild winds, or light industrial activities, with minimal impact on air quality and visibility.
      
      <br> - Moderate: 50-100 µg/m³: Dust concentrations in this range suggest moderate dust activity, possibly from agricultural practices or local construction activities, 
      <br>leading to slightly reduced air quality.
      <br>
      <br> - High: 100-200 µg/m³: Higher dust levels, like these, indicate significant dust emissions from sources such as construction sites, unpaved roads, or agricultural fields, 
      <br>resulting in reduced visibility and potential health effects for sensitive individuals.
      <br>
      <br> - Very High: 200-500 µg/m³: Values exceeding 200 µg/m³ suggest very high dust concentrations, often associated with intense dust storms (an example could be the Dust Bowl),
      <br>or large-scale construction projects, significantly impacting air quality and posing health risks to the general population.
      <br>
      <br> - Extremely High: >500 µg/m³: Although this range is quite rare, as mentioned before (Dust Bowl) these ranges have been seen before.
      <br>Rare occurrences of dust concentrations exceeding 500 µg/m³ signify extremely high levels of airborne particles, likely due to severe dust storms, 
      <br>volcanic eruptions, or industrial accidents, posing severe health hazards and requiring immediate action to mitigate exposure.
 `,
 'UV index': `
      <b>UV INDEX</b>
      
      <br>The UV index measures the strength of ultraviolet (UV) radiation from the sun that reaches the Earth's surface. 
      <br>UV radiation is divided into different categories (UV-A, UV-B, and UV-C). UV-B is the most harmful to human health as it can cause sunburn and skin damage.
      <br>One thing to note however, when I talk about sunburns, this is different for each person as everyone has different levels of Melanin in their bodies.
      <br>I am using averages and generalizations to give a better idea.
      <br>
      <br> - Low: 0-2: Usually observed during early morning or late afternoon when the sun's angle is lower, resulting in minimal UV exposure and low risk of sunburn,
      <br>as not much radiation is making contact with Earth.
      <br>
      <br> - Moderate: 3-5: Pretty common during midday hours, when the sun's radiation/rays are stronger. While moderate UV levels pose a low to moderate risk of sunburn for most people,
      <br>cotinued exposure may still cause skin damage.
      
      <br> - High: 6-7: Elevated UV levels indicate significant sun exposure, especially around midday to noon. Extra precautions such as wearing sunscreen,
      <br>sunglasses, and protective clothing are all great ideas and recommended to reduce the risk of sunburn and skin damage.
      <br>
      <br> - Very High: 8-10: Very high UV levels pose a high risk of sunburn and skin damage, even with short periods of exposure. 
      <br>It's crucial to take protective measures and seek shade whenever possible, particularly during peak sun hours.
      <br>Continued exposure to this amount of UV radiation increases the risk of skin-cancer, regardless of the amount of melanin you have.
      
      <br> - Extreme: 11+: Extreme UV levels signify an exceptionally high risk of sunburn and skin damage. 
      <br>Outdoor activities should be minimized, and protective measures should be taken to prevent sunburn, such as seeking shade, wearing protective clothing, and applying sunscreen regularly.
      <br>Even for those that have high amounts of Melanin, this amount of UV radiation is very dangerous.
 `
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
