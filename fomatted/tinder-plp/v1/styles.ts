export default `
  .flick-loader h4 {
    font-size: 25px;
    line-height: 1.5em;
    margin-top: 23px;
    text-align: center;
  }

  .flick-loader-spinner {
    width: 60px;
    aspect-ratio: 1;
    display: flex;
    animation: l8-0 2s infinite sptes(1);
    margin: auto;
    margin-top: 53px;    
  }

  .flick-loader-spinner::before,
  .flick-loader-spinner::after {
    content: "";
    flex: 1;
    animation: 
      l8-1 1s infinite linear alternate,
      l8-2 2s infinite steps(1) -.5s;
  }

  .flick-loader-spinner::after {
    --s:-1,-1;
  }

  @keyframes l8-0 {
    0%  {transform: scaleX(1)  rotate(0deg)}
    50% {transform: scaleX(-1) rotate(-90deg)}
  }

  @keyframes l8-1 {
    0%,
    5%   {transform:scale(var(--s,1)) translate(0px)   perspective(150px) rotateY(0deg) }
    33%  {transform:scale(var(--s,1)) translate(-10px) perspective(150px) rotateX(0deg) }
    66%  {transform:scale(var(--s,1)) translate(-10px) perspective(150px) rotateX(-180deg)}
    95%,
    100% {transform:scale(var(--s,1)) translate(0px)   perspective(150px) rotateX(-180deg)}
  }

  @keyframes l8-2 {
    0%  {background:black}
    50% {background:#0099ff}
  }

  .pulse {
    animation-name: flickAnimation;
    animation-duration: 0.5s;
  }

  .flick-header-wishlist {
    cursor: pointer;
  }

  .icon-show {
    display: block;
  }

  .flick-wrapper {
    bottom: 0px;
    background: white;
    width: 100%;
    z-index: 99999999999999;
    position: fixed;
    height: 95%;
    box-shadow: 0px 12px 24px -1px #000000;
    min-height: 675px;  
    overflow-y: scroll;
    
  }

  .flick-header-close {
    cursor: pointer;
  }
  
  .flick-header-close:hover {
    opacity: 0.7;
  }
  
  .flick-wrapper > section {
    width: 100%;
    max-width: 430px;
    margin: auto;
    padding: 30px;
    box-sizing: border-box;
  }

  .flick-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  @keyframes flickAnimation {
    0% {
      opacity: 0;
      top: 0px;
      width: 0%;
    }

    50% {
      opacity: 1;
    }

    100% {
      opacity: 0;
      top: -100px;
      width: 100%;
    }
  }

  .flick-card-container {
    margin: 20px auto 15px auto;
    min-height: 560px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: unset !important;
  }

  .flick-card-container .flick-card {
    display: none;
    position: absolute;
    top: 0px;
    z-index: 2;
    box-shadow: 0px 0px 9px -4px #151515;
    cursor: grab;
    border-radius: 13px;
    background: #fff;
    width: 100%;
  }

  .flick-card-inner {
    padding: 15px;
  }

  .card-container .flick-card[style='display: block;'] {
    z-index: 1;
  }
  
  .flick-card-react-ref {
    overflow: hidden;
  }

  .flick-card-react-ref > * {
    width: 100% !important;
    max-width: 100% !important;
    pointer-events: none;
    user-select: none;
    -webkit-user-select: none; 
    -ms-user-select: none; 
    display: block !important;
  }

  .animation-container {
    opacity: 1;
    top: 0px;
    position: relative;
    z-index: 9;
    height: 200px;
    align-items: center;
    justify-content: center;
    display: none;
  }

  .animation-container.pulse {
    display: flex;
  }

  .animation-container > svg {
    display: none;
    width: 100%;
    height: 100%;
  }

  .flick-wishlist-indicator {
    position: absolute;
    top: -8px;
    right: -8px;
    background: #000;
    color: white;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 600;
    font-family: helvetica;
  }

  /* Wishlist Grid Styles */
  .wishlist-grid {
    width: 100%;
    padding: 15px;
    margin: auto;
    padding: 30px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .wishlist-grid h4 {
    margin-bottom: 20px;
    font-size: 22px;
    text-align: center;
  }

  .wishlist-grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
    width: 100%;
    margin-bottom: 24px;
  }

  .wishlist-grid-item {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.07);
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 120px;
  }

  .wishlist-back-btn {
    background: #0099ff;
    color: #fff;
    border: none;
    border-radius: 6px;
    padding: 10px 22px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s, box-shadow 0.2s;
    box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  }

  .wishlist-back-btn:hover {
    background: #007acc;
  }

  @media (max-width: 600px) {
    .wishlist-grid-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 400px) {
    .wishlist-grid-container {
      grid-template-columns: 1fr;
    }
  }
`;
