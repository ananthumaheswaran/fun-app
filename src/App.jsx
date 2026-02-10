import { useState } from "react";
import "./App.css";

function App() {
  const [escaped, setEscaped] = useState(false);
  const [noPosition, setNoPosition] = useState({});
  const [yesClicked, setYesClicked] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const moveNoButton = () => {
    setEscaped(true);

    setNoPosition({
      top: Math.random() * 65 + "%",
      left: Math.random() * 65 + "%",
    });
  };

  const resetApp = () => {
    setYesClicked(false);
    setShowPopup(false);
    setEscaped(false);
    setNoPosition({});
  };

  const feedback = () => {
    // Android vibration
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }

    // Visual tap effect
    document.body.classList.add("tap-effect");
    setTimeout(() => {
      document.body.classList.remove("tap-effect");
    }, 100);
  };

  return (
    <div className="page">
      <div className="card ">
        {/* Emoji */}
        <div className="img-wrapper">
          <img
            src="/images/something.png"
            alt="cute bear"
            draggable="false"
            tabIndex={-1}
            onContextMenu={(e) => e.preventDefault()}
            className="card-img"
          />
        </div>
        {/* Text */}
        <h1>
          <span className="name">Suryapriya</span> will you be my valentine?
        </h1>
        {/* Buttons */}
        <div className="flex justify-center gap-6 mt-6 ">
          <button
            onClick={() => {
              feedback();
              setYesClicked(true);
              setShowPopup(true);
            }}
            className="yes-btn shadow-xl"
          >
            Yes
          </button>
          <button
            tabIndex={-1}
            onClick={() => {
              moveNoButton();
            }}
            onTouchStart={moveNoButton}
            className={`no-btn shadow-xl ${escaped ? "absolute" : "relative"}`}
            style={escaped ? noPosition : {}}
          >
            No
          </button>
        </div>
        <p className="hint-text">“No” seems a bit shy 😉</p>
      </div>

      {yesClicked && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 40 }).map((_, i) => (
            <span
              key={i}
              className="emoji-fall"
              style={{
                left: Math.random() * 100 + "%",
                animationDelay: Math.random() * 2 + "s",
                fontSize: Math.random() * 20 + 24 + "px",
              }}
            >
              {["❤️"][i % 1]}
            </span>
          ))}
        </div>
      )}

      {showPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="card text-center shadow-xl animate-bounce">
            {/* GIF */}
            <img
              src="/gifs/lal-laugh.gif" // 🔁 your GIF path
              alt="Yay"
              draggable="false"
              tabIndex={-1}
              onContextMenu={(e) => e.preventDefault()}
              className="card-img"
            />

            {/* MESSAGE */}
            <h2 className="yay-text">YAY! 🎉</h2>

            {/* OPTIONAL CLOSE */}
            <button
              onClick={() => {
                feedback();
                setShowPopup(false);
                resetApp();
              }}
              className="yes-btn shadow-xl"
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
