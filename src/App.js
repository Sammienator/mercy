import React, { useState } from 'react';
import './App.css';

export default function ValentinesCard() {
  const [currentPage, setCurrentPage] = useState(0);
  const [hearts, setHearts] = useState([]);
  const [direction, setDirection] = useState('next');
  const [noButtonPosition, setNoButtonPosition] = useState({ top: 65, left: 65 });
  const [yesButtonScale, setYesButtonScale] = useState(1);
  const [noAttempts, setNoAttempts] = useState(0);
  const [answered, setAnswered] = useState(false);

  const reasons = [
    "You keep talking about my Ex Joy ☀️",
    "Your laugh is my favorite sound 😊",
    "You're brilliantly creative 🎨",
    "You make the ordinary extraordinary ✨",
    "You're incredibly kind 💝",
    "You inspire me to be better 🌟",
    "Your smile could light up the darkest room 💫",
    "You're absolutely one of a kind 🦄"
  ];

  const totalPages = reasons.length + 3; // intro + reasons + question page + final page

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setDirection('next');
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setDirection('prev');
      setCurrentPage(currentPage - 1);
    }
  };

  const moveNoButton = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Generate random position avoiding edges
    const newTop = Math.random() * 50 + 25; // 25% to 75%
    const newLeft = Math.random() * 50 + 25; // 25% to 75%
    
    setNoButtonPosition({ top: newTop, left: newLeft });
    setYesButtonScale(prev => Math.min(prev + 0.3, 3)); // Grow Yes button, max 3x
    setNoAttempts(prev => prev + 1);
  };

  const createHeart = () => {
    const newHeart = {
      id: Date.now() + Math.random(),
      left: Math.random() * 100,
      duration: 2 + Math.random() * 2
    };
    setHearts(prev => [...prev, newHeart]);
    setTimeout(() => {
      setHearts(prev => prev.filter(h => h.id !== newHeart.id));
    }, 4000);
  };

  const handleYes = () => {
    setAnswered(true);
    for (let i = 0; i < 50; i++) {
      setTimeout(() => createHeart(), i * 80);
    }
    // Move to final page after celebration
    setTimeout(() => {
      nextPage();
    }, 2000);
  };

  const isLastPage = currentPage === totalPages - 1;
  const isFirstPage = currentPage === 0;

  const getEncouragementMessage = () => {
    if (noAttempts === 1) return "Hey! Come back! 😄";
    if (noAttempts === 2) return "You're making this hard! 💕";
    if (noAttempts === 3) return "I think you want to say yes... 😊";
    if (noAttempts === 4) return "The Yes button is getting bigger for a reason! 💖";
    if (noAttempts >= 5) return "Just give in already! You know you want to say yes! 💝";
    return "";
  };

  return (
    <div className="valentines-container">
      {/* Floating hearts after Yes is clicked */}
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="floating-heart"
          style={{
            left: `${heart.left}%`,
            bottom: '-50px',
            animationDuration: `${heart.duration}s`
          }}
        >
          💗
        </div>
      ))}

      <div className="card-container">
        {/* Decorative hearts in corners */}
        <div className="corner-heart top-right">💕</div>
        <div className="corner-heart top-left">💕</div>
        
        {/* Page content */}
        <div className="page-content">
          {currentPage === 0 ? (
            // Introduction page
            <div className={`intro-page ${direction === 'next' ? 'slide-in-right' : 'slide-in-left'}`}>
              <div className="intro-emoji">💌</div>
              <h1 className="intro-title">
                Hey There...! ✨
              </h1>
              <p className="intro-text">
                I made something special for you... 
                <br />
                <span className="intro-highlight">Click "Next" to see why you're amazing!</span>
              </p>
            </div>
          ) : currentPage <= reasons.length ? (
            // Reason pages
            <div 
              key={currentPage}
              className={`reason-page ${direction === 'next' ? 'slide-in-right' : 'slide-in-left'}`}
            >
              {/* Background floating emojis for each reason */}
              <div className="background-emojis">
                <div className="bg-emoji emoji-1">✨</div>
                <div className="bg-emoji emoji-2">💫</div>
                <div className="bg-emoji emoji-3">⭐</div>
                <div className="bg-emoji emoji-4">🌟</div>
                <div className="bg-emoji emoji-5">💖</div>
                <div className="bg-emoji emoji-6">💝</div>
              </div>
              
              <h1 className="reason-title">
                Reason #{currentPage}
              </h1>
              <div className="reason-box">
                <p className="reason-text">
                  {reasons[currentPage - 1]}
                </p>
              </div>
            </div>
          ) : currentPage === reasons.length + 1 ? (
            // Question page
            <div className="question-page">
              <h1 className="question-title-main">
                So...
              </h1>
              <h2 className="question-title-sub">
                Will you be my Valentine? 💘
              </h2>
              
              {!answered && (
                <div className="button-container">
                  {/* Yes button - stays in center */}
                  <button
                    onClick={handleYes}
                    className="yes-button"
                    style={{
                      transform: `translate(-50%, -50%) scale(${yesButtonScale})`,
                    }}
                  >
                    Yes! 💕
                  </button>
                  
                  {/* No button that moves */}
                  <button
                    onMouseEnter={moveNoButton}
                    onTouchStart={moveNoButton}
                    onClick={moveNoButton}
                    className="no-button"
                    style={{
                      top: `${noButtonPosition.top}%`,
                      left: `${noButtonPosition.left}%`,
                    }}
                  >
                    No 😢
                  </button>
                </div>
              )}
              
              {noAttempts > 0 && !answered && (
                <p className="encouragement-message">
                  {getEncouragementMessage()}
                </p>
              )}

              {answered && (
                <div className="success-message">
                  <p className="success-text">
                    Yay! 🎉 I knew you'd say yes!
                  </p>
                </div>
              )}
            </div>
          ) : (
            // Final thank you page
            <div className="final-page">
              <div className="final-emoji">🥰</div>
              <h1 className="final-title">
                You made my day! 💖
              </h1>
              <p className="final-text">
                I can't wait to spend Valentine's Day with you!
                <br />
                <span className="final-highlight">
                  Get ready for something special! ✨
                </span>
              </p>
              <div className="final-hearts">
                💕 💝 💖 💗 💓
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="navigation">
          <button
            onClick={prevPage}
            disabled={isFirstPage}
            className={`nav-button ${isFirstPage ? 'disabled' : ''}`}
          >
            ← Previous
          </button>

          <div className="page-counter">
            {currentPage + 1} / {totalPages}
          </div>

          <button
            onClick={nextPage}
            disabled={isLastPage}
            className={`nav-button ${isLastPage ? 'disabled' : ''}`}
          >
            Next →
          </button>
        </div>

        {/* Progress dots */}
        <div className="progress-dots">
          {Array.from({ length: totalPages }).map((_, index) => (
            <div
              key={index}
              className={`progress-dot ${index === currentPage ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}