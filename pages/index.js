import { useState, useEffect } from "react";
import Head from 'next/head'
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserCog, faSkull, faPowerOff, faFolder, faFileArchive, faTimes, faInfoCircle, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import Typewriter from "typewriter-effect";
import QuickHackBreach from "cyberpunk-quickhack";

import { randomSetOfPhrases } from "../utils";

Modal.setAppElement("body");

function DisplayModal({ isOpen, title = "", modalClassName = "", toggleActiveModal, activeLoading = true, delay = 1500, children }){
  const [ loading, setLoading ] = useState(activeLoading);

	return (
		<Modal portalClassName={modalClassName} isOpen={isOpen}>
      {
      loading ?
          <Typewriter
            onInit={(typewriter) => {
              typewriter.typeString("Loading Info...").pauseFor(delay).callFunction(() => setLoading(false)).start();
            }}
            options={{
              autoStart: true
            }}
          />
        :
        <>
					<div className="modal-header">
						<p>{title}</p>
						<button className="modal-header-button" onClick={toggleActiveModal}>
							<FontAwesomeIcon icon={faTimes}/>
						</button>
					</div>
					<div className="modal-body">
						{children}
					</div>
        </>
      }
		</Modal>
	);
}

function DynamicProgressBar({ title = "", progressBarWidth = 20, progressBarHeight = 25, amountOfBlocks = 0 }){
  const blockArray = Array.from({ length: amountOfBlocks*5 }, (_b, i) => i);

  return (
    <div className="progress-bar-container">
      <p>{`${title}: ${amountOfBlocks > 1 ? `${Math.floor((amountOfBlocks/progressBarWidth)*100)}%` : "Priceless"}`}</p> <span></span>
			<div style={{ width: progressBarWidth * 10, height: progressBarHeight, backgroundColor: "transparent", border: "1px solid #66ff66" }}>
				{
					blockArray.map(b => (
						<div key={b} id="block" style={{ marginRight: 1, width: 1, height: progressBarHeight, display: "inline-block", backgroundColor: "#66ff66" }} />
					))
				}
			</div>
    </div>
  )
}

export function getStaticProps(){
  const props = {};

  props.portfolioProjects = [
    {
      key: "tastemakers",
      projectName: "Tastemakers Africa",
      projectClient: "Tastemakers Africa",
      projectTechnologies: "React, Next.js, Express.js, MySQL, Sequelize, Cypress, Mocha, Chai",
      projectDescription: "Online and IRL experiences connecting Africa and the diaspora.",
      projectLink: "https://tastemakersafrica.com",
      projectImage: "/tastemakers.png"
    },
    {
      key: "moment",
      projectName: "Moment",
      projectClient: "Moment",
      projectTechnologies: "WebVR, Three.js, Firebase, React, Express.js, Redux",
      projectDescription: "This project was to allow Moment VR scenes to be viewed in the web by logging into a moment account",
      projectLink: "",
      projectImage: "/moment.png"
    },
    {
      key: "hosted",
      projectName: "Hosted",
      projectClient: "Jocqui Smollett",
      projectTechnologies: "MongoDB, Socket.io, Angular.js, Express.js, Node.js, Stripe, AWS S3",
      projectDescription: "Hosted allows you to book spaces and services, and/or plan events. You will be able to message the person in charge of the space or the person who is offering the service to get a feel of the space or person. From the messages, you can offer to purchase the space or pay the person for their services for a specific amount of time.",
      projectLink: "https://hostedapp.io",
      projectImage: "/hosted.png"
    },
    {
      key: "breach",
      projectName: "React Cyberpunk Breach",
      projectClient: "Myself",
      projectTechnologies: "React",
      projectDescription: "A simple remake of a minigame from Cyberpunk 2077",
      projectLink: "https://github.com/joselevelsup/react-cyberpunk-breach",
      projectImage: "/github.jpg"
    },
    {
      key: "collectively",
      projectName: "",
      projectClient: "Collectively",
      projectDescription: "Worked with this startup to help other clients and build their platforms in both Business and Technology",
      projectTechnologies: "React, Express.js, MySQL, Sequelize, Redux, Mocha, Chai",
      projectLink: "",
      projectImage: "/collectively.png"
    },
    {
      key: "portion",
      projectName: "Portion",
      projectClient: "Portion",
      projectDescription: "Portion is the art world's bridge into the new world of cryptocurrency. Through Portion’s smart contracts and distributed technology, the art market is liberated into a free market.",
      projectLink: "https://portion.io",
      projectImage: "/portion.jpg"
    }
  ]

  return {
    props
  }
}

export default function Portfolio({ portfolioProjects }) {

  const [poweredOn, setPoweredOn] = useState(false);
  const [hacked, setHacked] = useState(false);
  const [imageCanBeShowed, showImage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deviceWidth, setDeviceWidth] = useState(typeof window != "undefined" ? window.innerWidth : 0);
  const [selectedImage, setSelectedImage] = useState(0);

  const handleDeviceWidth = () => {
    setDeviceWidth(window.innerWidth);
  }

  useEffect(() => {
    if(typeof window != "undefined"){
			window.addEventListener("resize", handleDeviceWidth);
    }

    return () => {
			if(typeof window != "undefined"){
				window.removeEventListener("resize", handleDeviceWidth);
			}
    }
  }, [])

  useEffect(() => {
    if(hacked){
      makeModuleActive("hackSim", false);
    }
  }, [hacked])

  const [ modules, setActiveModule ] = useState({
    hackSim: false,
    unlockedFolder: false,
    about: false,
    skills: false,
    projects: false
  });

  const [ currentProjects, setActiveProject ] = useState({
    hosted: false,
    portion: false,
    moment: false,
    tastemakers: false,
    breach: false,
    collectively: false
  });

  const makeModuleActive = (module, active = true) => {
    setActiveModule({
      ...modules,
      [module]: active
    });
  }

  const makeActiveProject = (project, active = true) => {
    setActiveProject({
      ...currentProjects,
      [project]: active
    });
  }

  const togglePower = () => {
    setLoading(true);
    setPoweredOn(!poweredOn);
  }

  const isMobile = () => deviceWidth <= 768;

  const { hackSim, about, skills, projects, unlockedFolder } = modules;

  return (
    <div className={`container ${poweredOn ? "powered-on" : "powered-off"}` }>
      <Head>
        <title>Joselevelsup Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="overlay">AV-3</div>

			<div className="screen">
				<div className={`modules-container ${poweredOn && loading ? "col": ""}`}>
          {
          poweredOn && loading ?
              <>
                <div className="os-name">
                  JoselevelsupOS
                </div>
                <br />
								<Typewriter
									onInit={(typewriter) => {
                    const listOfPhrases = randomSetOfPhrases();
										for(let i = 0; i < listOfPhrases.length; i++){
											typewriter.changeDelay(10).typeString(listOfPhrases[i]).pauseFor(1200).callFunction(() => {
												if(i +1 == listOfPhrases.length){
													setLoading(false);
												}
											}).start();
										}
									}}
									options={{
										autoStart: true
									}}
								/>
              </>
            :
            <>
							<div className="module" onClick={() => makeModuleActive("about")}>
								<FontAwesomeIcon icon={faUser} />
								<p className="module-description">User</p>
							</div>
							<div className="module" onClick={() => makeModuleActive("skills")}>
								<FontAwesomeIcon icon={faUserCog} />
								<p className="module-description">User Skills</p>
							</div>
							<div className="module" onClick={() => makeModuleActive("projects")}>
								<FontAwesomeIcon icon={faFolder} />
								<p className="module-description">Projects</p>
							</div>
							<div className={`module ${hacked ? "" : "power-off"}`} onClick={hacked ? () => makeModuleActive("unlockedFolder") : () => makeModuleActive("hackSim")}>
								<FontAwesomeIcon icon={hacked ? faFileArchive : faSkull} />
								<p className="module-description">{hacked ? "Secret File" : "Locked"}</p>
							</div>
            </>
          }
				</div>
			</div>

			<div className="controls">
        <div className="modules-container">
          {
          !poweredOn &&
						<p>Press Power to turn on</p>
          }
          <label htmlFor="switch">
            <div className={`module no-border small ${poweredOn ? "pulse power-off" : ""}`}>
							<FontAwesomeIcon icon={faPowerOff} />
            </div>
          </label>
          <input id="switch" type="checkbox" onChange={() => togglePower() } style={{ visibility: "hidden" }} defaultChecked={poweredOn} />
        </div>
			</div>

      {
      hackSim &&
          <DisplayModal
            isOpen={hackSim}
            title="Unlock the Folder"
            modalClassName="hackSim"
            toggleActiveModal={() => makeModuleActive("hackSim", false)}
          >
            <QuickHackBreach solvedFunction={setHacked} />
            <br />
            <div className="quickhack-description">
							The code matrix has rows of characters grouped together in twos. The buffer box on the right is where the characters you've selected will be displayed, so you can keep track of where you are in the sequence. Below it is the list of sequences you can recreate.
              <br />
							When you first start, a row or column will be highlighted. This means it's currently the active zone, so you can only pick the options in this row. Each time you enter a pair of characters, the active zone will alternate between the column you just selected, or the row. So, if your first input is in the top row, third column, you'll only be able to select the characters in the third column when inputting the next part of the sequence.
            </div>
          </DisplayModal>
      }
      {
      unlockedFolder &&
          <DisplayModal
            isOpen={unlockedFolder}
            title="Secret File"
            modalClassName="unlockedFolder"
            toggleActiveModal={() => makeModuleActive("unlockedFolder", false)}
          >
            <div className="images">
              {
              selectedImage == 0 &&
                  <>
										<div className="img-container">
											<Image src="/alien.png" srcSet="(max-width: 414px) 400" layout="responsive" width="500" height="600" />
										</div>
                    {
                      !isMobile() &&
											<button onClick={() => setSelectedImage(1)} className="btn-transparent btn-outline-primary">
												<FontAwesomeIcon icon={faChevronRight} />
											</button>
                    }
									</>
              }
              {
              selectedImage == 1 &&
                  <>
                    {
                      !isMobile() &&
											<button onClick={() => setSelectedImage(0)} className="btn-transparent btn-outline-primary">
												<FontAwesomeIcon icon={faChevronLeft} />
											</button>
                    }
										<div className="img-container">
											<Image src="/flash.png" layout="responsive" width="500" height="600" />
										</div>
                  </>
              }
              {
                isMobile() &&
                  <div style={{marginTop: 10}}>
                    {
                    selectedImage == 0 &&
											<button onClick={() => setSelectedImage(1)} className="btn-transparent btn-outline-primary">
												<FontAwesomeIcon icon={faChevronRight} />
											</button>
                    }
                    {
                    selectedImage == 1 &&
											<button onClick={() => setSelectedImage(0)} className="btn-transparent btn-outline-primary">
												<FontAwesomeIcon icon={faChevronLeft} />
											</button>
                    }
                  </div>
              }
            </div>
          </DisplayModal>
      }
      {
      about &&
          <DisplayModal
            isOpen={about}
            modalClassName="user"
            title="About Joselevelsup"
            toggleActiveModal={() => makeModuleActive("about", false)}
            delay={1000}
					>
            <div className="img-container profile-img">
              {
              imageCanBeShowed &&
								<Image src="/profile.jpg" width="200" height="300" layout="responsive" />
              }
            </div>
            <br />
            <Typewriter
              onInit={(typewriter) => {
                typewriter.changeDelay(5).typeString("I am a Self taught Developer who has done Game Programming then pivoted to Web Development using powerful frameworks/libraries such as Angular and React. I approach everyday as a chance to improve my programming skills, to learn new frameworks, and to challenge myself.").callFunction(() => showImage(true)).start();
              }}
              options={{
                autoStart: true
              }}
            />
            <br />
            {
            imageCanBeShowed &&
              <>
								<div className="profile-container">
									<div>
										<span>Full Name:</span>
										<br />
										Jose Angel Ortiz
									</div>
									<div>
										<span>Profession:</span>
										<br />
										Freelancer, Full Stack Developer
									</div>
								</div>
								<div className="profile-container">
									<div>
										<span>Email:</span>
										<br />
										<a href="mailto:joselevelsup@gmail.com">joselevelsup@gmail.com</a>
									</div>
									<div>
										<span>Favorite Activities:</span>
										<br />
										Program (Of course!), Cruise on my skateboard, and play some video games (both retro and modern)
									</div>
								</div>
              </>
            }
        </DisplayModal>
      }

      {
      skills &&
          <DisplayModal
            isOpen={skills}
            modalClassName="skills"
            title="Joselevelsup's Skills"
            toggleActiveModal={() => makeModuleActive("skills", false)}
            delay={500}
          >
            <div className="skill-container">
							<DynamicProgressBar title="Node.js" progressBarWidth={isMobile() ? 30 : 36} progressBarHeight={15} amountOfBlocks={isMobile() ? 29.5 : 35.5}/>

							<DynamicProgressBar title="Express.js" progressBarWidth={isMobile() ? 30 : 36} progressBarHeight={15} amountOfBlocks={isMobile() ? 28.5 : 34.5}/>

							<DynamicProgressBar title="React/React Native" progressBarWidth={isMobile() ? 30 : 36} progressBarHeight={15} amountOfBlocks={isMobile() ? 27.5 : 34.5}/>

							<DynamicProgressBar title="Python" progressBarWidth={isMobile() ? 30 : 36} progressBarHeight={15} amountOfBlocks={isMobile() ? 21.5 : 25.5} />

							<DynamicProgressBar title="Learning and Having Fun" progressBarWidth={30} progressBarHeight={15} />
            </div>
        </DisplayModal>
      }

      {
      projects &&
          <DisplayModal
            isOpen={projects}
            modalClassName="projects"
            title="Joselevelsup's Work"
            toggleActiveModal={() => makeModuleActive("projects", false)}
          >
            <div className="projects-container">
              {
                portfolioProjects.map(project => (
									<div className="project-item" key={project.key}>
										<div className="img-container project-img">
											<Image src={project.projectImage} layout="responsive" width="1500" height="700"/>
										</div>
										<button className="btn-transparent btn-outline-primary" onClick={() => makeActiveProject(project.key)}>
											<FontAwesomeIcon icon={faInfoCircle} />
										</button>
									</div>
                ))
              }
            </div>
            {
            	portfolioProjects.map(project => (
                <>
                  {
                    currentProjects[project.key] &&
                      <DisplayModal
												isOpen={currentProjects[project.key]}
												modalClassName="project"
												title={project.projectName || project.projectClient}
												toggleActiveModal={() => makeActiveProject(project.key, false)}
												key={project.key}
											>
												<div className="project-description-1">
													<div>
														<h4>Client:</h4> <br/>
														{project.projectClient}
													</div>
													<div>
														<h4>Technologies:</h4> <br />
														{project.projectTechnologies}
													</div>
												</div>
												<br />
												<div className="project-description-2">
													<h4>Quick Summary:</h4>
													<p>{project.projectDescription}</p>
												</div>
												<div className="project-footer">
													<a target="_blank" href={project.projectLink} className="btn-transparent btn-outline-primary">
														Live Site
													</a>
												</div>
											</DisplayModal>
                  }
                </>

              ))
            }
          </DisplayModal>
      }
    </div>
  )
}
