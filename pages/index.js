import { useState } from "react";
import Head from 'next/head'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserCog, faSkull, faPowerOff, faFolder } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [poweredOn, setPoweredOn] = useState(false);
  const [hacked, setHacked] = useState(false);

  const [ modules, setActiveModule ] = useState({
    about: false,
    skills: false
  });

  const makeModuleActive = (module, active = true) => {
    setActiveModule({
      ...modules,
      [module]: active
    });
  }

  return (
    <div className={`container ${poweredOn ? "powered-on" : "powered-off"}` }>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="overlay">AV-1</div>
			<div className="screen">
				<div className="modules-container">
					<div className="module">
						<FontAwesomeIcon icon={faUser} />
            <p className="module-description">User</p>
					</div>
					<div className="module">
						<FontAwesomeIcon icon={faUserCog} />
            <p className="module-description">User Skills</p>
					</div>
          <div className={`module ${hacked ? "power-off" : ""}`}>
            <FontAwesomeIcon icon={hacked ? faFolder : faSkull} />
            <p className="module-description">Locked</p>
          </div>
				</div>
			</div>

			<div className="controls">
        <div className="modules-container">
          <label htmlFor="switch">
            <div className={`module no-border small pulse ${poweredOn ? "power-off" : ""}`}>
							<FontAwesomeIcon icon={faPowerOff} />
            </div>
          </label>
          <input id="switch" type="checkbox" onChange={() => setPoweredOn(!poweredOn)} style={{ visibility: "hidden" }} defaultChecked={poweredOn} />
        </div>
			</div>

    </div>
  )
}
