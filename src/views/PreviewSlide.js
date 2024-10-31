import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { ReactComponent as CloseSlideSvg } from "../icons/closeSlide.svg";
import { testSlide } from "../slides";
// import PdfViewer from "./PdfViewer";

const WrapSlide = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
  padding: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;

  .slide {
    position: relative;
    max-width: 100%;
    min-width: 50%;
    height: 100%;
    background: #fff;
    box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.15);
    border-radius: 12px;
    & > img {
      border-radius: 12px;
      overflow: hidden;
      height: 100%;
      object-fit: contain;
      width: 100%;
    }
  }
  .slide__close {
    border: none;
    background: transparent;
    outline: none;
    cursor: pointer;
    display: flex;
    position: absolute;
    top: -28px;
    right: -28px;
  }
`;

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
`;

const LoadingSpinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 38px;
  height: 38px;
  animation: ${rotate} 1s linear infinite;
`;

const PreviewSlide = ({ setSlideId, slideId }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setImageLoaded(true);
    }, 60000); // Через минуту (в миллисекундах)

    return () => clearTimeout(timeoutId);
  }, [])

  if (!slideId) return null;

  return (
    <WrapSlide>
      <div className="slide">
        {!imageLoaded && (
          <LoadingOverlay>
            <LoadingSpinner />
          </LoadingOverlay>
        )}
        <button className="slide__close" onClick={() => setSlideId(null)}>
          <CloseSlideSvg />
        </button>
        {/* <PdfViewer/> */}
        <img src={testSlide} alt={slideId} onLoad={handleImageLoad} />
      </div>
    </WrapSlide>
  );
};

export default PreviewSlide;
