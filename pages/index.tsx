import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main} >
        <h1 className={styles.title}>
          Weather App
        </h1>

        <p className={styles.description}>
         Get the weather for any city by inputting a city name below and pressing submit!
        </p>

        <div className={styles.grid}>
          <form onSubmit={submitLocation}>
          <label htmlFor="city">City: </label>
          <input type="text" id="city" name="city"/>
          <button type="submit">Submit</button>
         </form> 
        </div>
        <p id="output1"></p>
        <p id="output2"></p>
      </main>
	

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

const submitLocation = async (event) => {
  event.preventDefault();
  const location = event.target.city.value;
  try {
    // get geolocation data
    const info = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=a06f7c0500b6f20cb044d20ec3d49dc0`);
    const information = await info.json();

    // get temperature data
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${information[0].lat}&lon=${information[0].lon}&appid=a06f7c0500b6f20cb044d20ec3d49dc0`);
    const result = await res.json();

    // parse result and convert to celsius
    const temp = parseFloat(result.main.temp) - 273;
    const feels_like = parseFloat(result.main.feels_like) - 273;
    // display temperature
    const toDisplay1 = "The temperature in " + location + " is: " + temp.toFixed(2) + "°C";
    const toDisplay2 = "Feels like " + feels_like.toFixed(2) + "°C";
    document.getElementById('output1').innerHTML = toDisplay1;
    document.getElementById('output2').innerHTML = toDisplay2;
  } catch {
    document.getElementById('output1').innerHTML = "There is no temperature information for the inputted location";
    document.getElementById('output2').innerHTML = "";
  }
}
