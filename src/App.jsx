
import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import Weather from './components/Weather'
import Loading from './components/Loading'

function App() {

  const [coords, setCoords] = useState()
  /* useState de mi api de climas */
  const [weather, setWeather] = useState()
  const [temp, setTemp] = useState()

  const success = pos => {
    console.log(pos.coords)
    setCoords({
      lat: pos.coords.latitude,
      lon: pos.coords.longitude
    })
  }


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success)

  }, [])

  useEffect(() => {
    if (coords) {
      const apiKey = "96a229b74e54c0282aa4880918c5e06a"
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}`
      axios.get(URL)
        .then(res => {
          setWeather(res.data)
          console.log(res.data)
          const celsius = (res.data.main.temp - 273.15).toFixed(1)
          const farenheit = (celsius * (9 / 5) + 32).toFixed(1)
          setTemp({ celsius, farenheit })
        })
        .catch(err => console.log(err))
    }
  }, [coords])


  return (
    <div className="App">
      {
        weather ?
          <Weather weather={weather} temp={temp} />
          :
          <Loading />
      }
    </div>
  )
}

export default App
