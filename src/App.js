import "./App.css";
import NavBar from "./NavBar";
import MusicalNotes from "./MusicalNotes";

import { useState, useEffect } from "react";

const navComponents = [
  {
    name: "About",
    border: false,
  },
  {
    name: "Features",
    border: false,
  },
  {
    name: "signup",
    border: true,
  },
  {
    name: "Try for free",
    border: true,
  },
];

function App() {
  const handleButtonClick = () => {
    // This should change the URL and redirect to /special, which Flask handles
    window.location.href = "/rj";
  };

  return (
    <div className="App">
      <NavBar
        name={"DJ Edgar"}
        components={navComponents}
        onClick={handleButtonClick}
      />

      <Features />

      <MusicalNotes />
    </div>
    // </div>
  );
}

function ComponentOne() {
  const [ttsReady, setTtsReady] = useState(false);
  const pollTtsStatus = async () => {
    try {
      console.log("checking status");
      const response = await fetch("/check_tts_status");
      const data = await response.json();

      if (data.status === "ready") {
        // setTtsReady(true); // TTS is ready
        fetchAudio("song");
        setTimeout(pollTtsStatus, 3000);
        setTtsReady(true); // Fetch and play song.wav
      } else {
        setTimeout(pollTtsStatus, 3000); // Continue polling every 3 seconds
      }
    } catch (error) {
      console.error("Error checking TTS status:", error);
    }
  };
  const handleHostSpotify = () => {
    console.log("Host button clicked");

    fetch("/host_spotify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "host_spotify" }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success", data.status);
        if (data.status === "tts_ready") {
          console.log(data.status);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchAudio = async (filename) => {
    try {
      const response = await fetch(`/get-audio/${filename}`);
      console.log(response);
      if (!response.ok) throw new Error("Network response was not ok");

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
      audio.addEventListener("ended", () => {
        console.log("Audio ended, now playing the song.");
        setTtsReady(false);
        playSong();
      });
    } catch (error) {
      console.error("Error fetching audio:", error);
    }
  };

  const playSong = async () => {
    const response = await fetch("/resume-song", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "resume_spotify" }),
    });

    console.log(response);
  };

  useEffect(() => {
    console.log("Component mounted, starting polling...");
    pollTtsStatus(); // Start polling for TTS status when component mounts
  }, []);
  return <button onClick={handleHostSpotify}>Host Spotify</button>;
}

function ComponentTwo() {
  return <h1>This is Component Two!</h1>;
}

function ComponentThree() {
  return <h1>This is Component Three!</h1>;
}

function Features() {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const handleButtonClick = (component) => {
    setSelectedComponent(component); // Set the selected component when a button is clicked
  };
  return (
    <>
      {selectedComponent ? (
        selectedComponent
      ) : (
        <div className="featureCardContainer">
          <FeatureCard onClick={() => handleButtonClick(<ComponentOne />)}>
            Hello
          </FeatureCard>
          <FeatureCard onClick={() => handleButtonClick(<ComponentTwo />)}>
            Hello
          </FeatureCard>
          <FeatureCard onClick={() => handleButtonClick(<ComponentThree />)}>
            Hello
          </FeatureCard>
        </div>
      )}
    </>
  );
}

function FeatureCard({ feature, img_url, children, onClick }) {
  return (
    <div className="featureCard">
      <img src="/rj/static/images/playlist.jpg" alt="hello" />
      <p>{children}</p>{" "}
      <button onClick={onClick} className="playButton">
        Play
      </button>
    </div>
  );
}
// function FadeWrapper({ children, trigger }) {
//   const [transitionStage, setTransitionStage] = useState("fadeIn");

//   useEffect(() => {
//     if (trigger) {
//       setTransitionStage("fadeOut");
//       setTimeout(() => {
//         setTransitionStage("fadeIn");
//       }, 1000); // Duration of fade-out before switching content
//     }
//   }, [trigger]);

//   return <div className={`fade-wrapper ${transitionStage}`}>{children}</div>;
// }

export default App;
