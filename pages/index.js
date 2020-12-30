import { useState } from "react";
import Head from 'next/head'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserCog, faSkull, faPowerOff, faFolder } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";

// Modal.setAppElement("#root");

function DisplayModal({ title = "", description = "" }){
  <Modal

  />
}

export default function Portfolio() {
  const [poweredOn, setPoweredOn] = useState(false);
  const [hacked, setHacked] = useState(false);

  const [ modules, setActiveModule ] = useState({
    hackSim: false,
    about: false,
    skills: false,
    projects: false
  });

  const makeModuleActive = (module, active = true) => {
    setActiveModule({
      ...modules,
      [module]: active
    });
  }

  const randomPhrases = () => {

  }

  const { hackSim, about, skills, projects } = modules;

  return (
    <div className={`container ${poweredOn ? "powered-on" : "powered-off"}` }>
      <Head>
        <title>Joselevelsup Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="overlay">AV-1</div>

			<div className="screen">
				<div className="modules-container">
					<div className="module" onClick={() => makeModuleActive("about")}>
						<FontAwesomeIcon icon={faUser} />
            <p className="module-description">User</p>
					</div>
					<div className="module" onClick={() => makeModuleActive("skills")}>
						<FontAwesomeIcon icon={faUserCog} />
            <p className="module-description">User Skills</p>
					</div>
          {/* <div className="module" onClick={() => makeModuleActive("projects")}> */}
          {/*   <FontAwesomeIcon icon={} /> */}
          {/*   <p className="module-description">Projects</p> */}
          {/* </div> */}
          <div className={`module ${hacked ? "" : "power-off"}`} onClick={() => makeModuleActive("hackSim")}>
            <FontAwesomeIcon icon={hacked ? faFolder : faSkull} />
            <p className="module-description">Locked</p>
          </div>
				</div>
			</div>

			<div className="controls">
        {/* <div className="read-write"> */}
        {/*   {randomPhrases()} */}
        {/* </div> */}
        <div className="modules-container">
          <label htmlFor="switch">
            <div className={`module no-border small ${poweredOn ? "pulse power-off" : ""}`}>
							<FontAwesomeIcon icon={faPowerOff} />
            </div>
          </label>
          <input id="switch" type="checkbox" onChange={() => setPoweredOn(!poweredOn)} style={{ visibility: "hidden" }} defaultChecked={poweredOn} />
        </div>
			</div>

      {
      hackSim &&
          <DisplayModal
            title="Unlock the Module"
            content={<></>}
          />
      }

      {
      about &&
          <DisplayModal
            title="About Joselevelsup"
					/>
      }

      {
      skills &&
          <DisplayModal
            title="Joselevelsup's Skills"
          />
      }

      {
      projects &&
          <DisplayModal
            title="Joselevelsup's Work"
          />
      }
    </div>
  )
}
