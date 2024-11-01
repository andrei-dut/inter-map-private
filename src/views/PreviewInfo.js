import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { ReactComponent as CloseSlideSvg } from "../icons/closeSlide.svg";
import { ReactComponent as Close2Svg } from "../icons/close2.svg";
import { testSlide } from "../slides";
// import PdfViewer from "./PdfViewer";

// new multi brands icons
import { ReactComponent as NewCrownBSvg } from "../icons/newCrownB.svg";
import { ReactComponent as NewCrownGSvg } from "../icons/newCrownG.svg";
import { ReactComponent as NewCrownYSvg } from "../icons/newCrownY.svg";
import { ReactComponent as NewCrownLBSvg } from "../icons/newCrownLB.svg";
// end

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

const PreviewInfo = ({ setSelectedMarker, selectedMarker, allMarkers }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setImageLoaded(true);
    }, 60000); // Через минуту (в миллисекундах)

    return () => clearTimeout(timeoutId);
  }, []);

  if (!(selectedMarker?.haveCard || selectedMarker?.haveSlide)) return null;

  const geHtmlByStatus = (status) => {
    switch (`${status}`) {
      case "7a":
        return (
          <>
            <NewCrownGSvg />
            <p>Действующий</p>
          </>
        );
      case "7b":
        return (
          <>
            <NewCrownBSvg />
            <p>Строящийся</p>
          </>
        );
      case "7c":
        return (
          <>
            <NewCrownYSvg />
            <p>Выделение земли</p>
          </>
        );
      case "7d":
        return (
          <>
            <NewCrownLBSvg />
            <p>Планируемые</p>
          </>
        );

      default:
        return "";
    }
  };

  return (
    <WrapPreviewInfo>
      {selectedMarker.haveCard ? (
        <div className="card">
          <h3>{selectedMarker.fullName || selectedMarker.name}</h3>
          {[
            { name: "Статус:", id: 1 },
            { name: "Адрес:", id: 2 },
            { name: "В проекте участвуют: ", id: 3 },
          ].map((item) => (
            <div key={item.id} className="card-block-desc">
              {item.id === 1 ? (
                <div className="desc__status">
                  <h4>{item.name}</h4>
                  {geHtmlByStatus(selectedMarker.status)}
                </div>
              ) : null}
              {item.id === 2 ? (
                <div className="desc__address">
                  <h4>{item.name}</h4>
                  <p>{selectedMarker.address}</p>
                </div>
              ) : null}
              {item.id === 3 ? (
                <div className="desc__participate">
                  <h4>{item.name}</h4>
                  <p>{selectedMarker.participate}</p>
                </div>
              ) : null}
            </div>
          ))}
          <button className="card__close" onClick={() => setSelectedMarker(null)}>
            <Close2Svg />
          </button>
        </div>
      ) : selectedMarker.haveSlide ? (
        <div className="slide">
          {!imageLoaded && (
            <LoadingOverlay>
              <LoadingSpinner />
            </LoadingOverlay>
          )}
          <button className="slide__close" onClick={() => setSelectedMarker(null)}>
            <CloseSlideSvg />
          </button>
          {/* <PdfViewer/> */}
          <img src={testSlide} alt={selectedMarker.id} onLoad={handleImageLoad} />
        </div>
      ) : null}
    </WrapPreviewInfo>
  );
};

export default PreviewInfo;

const WrapPreviewInfo = styled.div`
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

  button {
    border: none;
    background: transparent;
    outline: none;
    cursor: pointer;
    display: flex;
  }

  .card {
    position: relative;
    max-width: 500px;
    min-width: 50%;
    background: #fff;
    box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.15);
    border-radius: 12px;
    padding: 16px;
    h3 {
      padding-right: 36px;
      font-size: 14px;
      text-align: start;
      padding-bottom: 3px;
    }
    .card-block-desc {
      padding: 10px 12px;
      background: #f5f5f5;
      border-radius: 6px;
      margin-top: 12px;
      h4 {
        font-size: 12px;
      }
      .desc__status {
        display: flex;
        align-items: center;
        font-size: 11px;
        font-weight: 500;
        svg {
          margin: 0 9px;
        }
      }
      .desc__address,
      .desc__participate {
        text-align: start;
        h4 {
          padding-bottom: 4px;
        }
        p {
          font-size: 11px;
          font-weight: 500;
        }
      }
      .desc__participate {
        p {
          white-space: pre-line;
        }
      }
    }
    .card__close {
      width: 28px;
      height: 28px;
      border-radius: 100px;
      position: absolute;
      right: 16px;
      top: 16px;
    }
  }

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
    position: absolute;
    top: -28px;
    right: -28px;
  }
`;
