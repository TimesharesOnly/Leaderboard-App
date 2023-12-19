import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import YouTube from 'react-youtube';
import Confetti from 'react-dom-confetti';

const socket = io('http://localhost:5000'); // Update with your server URL

const confettiConfig = {
  angle: 90,
  spread: 360,
  startVelocity: 40,
  elementCount: 70,
  dragFriction: 0.12,
  duration: 3000,
  stagger: 3,
  width: "10px",
  height: "10px",
  perspective: "500px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
};

const CelebrationDisplay = () => {
  const [salesEvent, setSalesEvent] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    socket.on('salesEvent', (data) => {
      setSalesEvent(data);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000); // Turn off confetti after 3 seconds
    });

    return () => {
      socket.off('salesEvent');
    };
  }, []);

  return (
    <div>
      {salesEvent && (
        <div>
          <h2>Congratulations {salesEvent.agentName}!</h2>
          <p>{salesEvent.message}</p>
          {/* YouTube Video */}
          <YouTube videoId="YOUR_VIDEO_ID" opts={{ height: '390', width: '640', playerVars: { autoplay: 1 } }} />
          {/* Confetti */}
          <Confetti active={showConfetti} config={confettiConfig} />
        </div>
      )}
    </div>
  );
};

export default CelebrationDisplay;
