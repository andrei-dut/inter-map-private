import React, { useState } from "react";
import { ReactComponent as MapMarkerSvg } from "../icons/mapMarker.svg";
import { ReactComponent as ArrowListSvg } from "../icons/arrowCloseList.svg";
import { ReactComponent as CloseSearchSvg } from "../icons/close.svg";
// import { ReactComponent as BuildingSvg } from "../icons/building.svg";
import { ReactComponent as CrownBSvg } from "../icons/crownB.svg";
import { ReactComponent as CrownRSvg } from "../icons/crownR.svg";
import { ReactComponent as CrownYSvg } from "../icons/crownY.svg";
import { ReactComponent as NotWorkSvg } from "../icons/notWork.svg";
import { ReactComponent as SettingsSvg } from "../icons/settings.svg";
import { ReactComponent as ShopHouseSvg } from "../icons/shopHouse.svg";
import { ReactComponent as PredstavSvg } from "../icons/predstav.svg";
// new multi brands icons
import { ReactComponent as NewCrownBSvg } from "../icons/newCrownB.svg";
import { ReactComponent as NewCrownGSvg } from "../icons/newCrownG.svg";
import { ReactComponent as NewCrownYSvg } from "../icons/newCrownY.svg";
import { ReactComponent as NewCrownLBSvg } from "../icons/newCrownLB.svg";
// end
import styled from "styled-components";

const ObjectSelector = ({ countries, handleMarkerClick }) => {
  const [isExpanded, setExpanded] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedCountry, setSelectedCountry] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleCountryClick = (country) => {
    // console.log(country);
    setSelectedCountry((prevSelectedCountry) => {
      const isCountryInPrev = prevSelectedCountry.some((_) => _.name === country.name);

      return isCountryInPrev
        ? prevSelectedCountry.filter((_) => _.name !== country.name)
        : [...prevSelectedCountry, country];
    });
    // setExpanded(true); // Не закрываем список при клике на страну
  };

  const handleCityClick = (elem) => {
    // Обработка выбора города
    handleMarkerClick(elem);
    console.log(`Выбран: ${elem?.name}`);
  };

  const getIconByStatus = (status) => {
    switch (`${status}`) {
      case "1":
        return <ShopHouseSvg />;
      case "2":
        return <SettingsSvg />;
      case "3":
        return <PredstavSvg />;
      case "4a":
        return <CrownYSvg />;
      case "4b":
        return <CrownRSvg />;
      case "4c":
        return <CrownBSvg />;
      // case "5":
      //   return <BuildingSvg />;
      case "6":
        return <NotWorkSvg />;
      case "7a":
        return <NewCrownGSvg />;
      case "7b":
        return <NewCrownBSvg />;
      case "7c":
        return <NewCrownYSvg />;
      case "7d":
        return <NewCrownLBSvg />;

      default:
        return null;
    }
  };

  const filterElems =
    countries.map((el) => {
      const newEl = { ...el, elems: el.elems.map((_el) => ({ ..._el })) };
      newEl.elems = newEl.elems.filter((_) =>
        _.name.toLowerCase().includes(inputValue.toLowerCase())
      );

      return newEl;
    }) || [];

  const filterCountries = countries?.filter(
    (country) =>
      (country.name.toLowerCase().includes(inputValue.toLowerCase()) &&
        filterElems.find((_c) => _c.name === country.name)?.elems?.length) ||
      country.elems.some((el) => el.name.toLowerCase().includes(inputValue.toLowerCase()))
  );

  // console.log(filterElems, filterCountries);

  return (
    <>
      {isExpanded ? (
        <Overlay
          onClick={() => {
            setExpanded(false);
            setInputValue("");
          }}
        />
      ) : null}
      <CountrySelectorContainer>
        <InputContainer>
          <MapMarkerIcon />
          <Input
            type="text"
            placeholder="Введите ТПС..."
            onFocus={() => setExpanded(true)}
            onChange={handleInputChange}
            value={inputValue}
          />
          {isExpanded && (
            <button
              className="input__close"
              onClick={() => {
                setExpanded(false);
                setInputValue("");
              }}
            >
              <CloseSearchSvg />
            </button>
          )}
        </InputContainer>
        {isExpanded && <Divider />}
        <div className="scroll-container">
          {isExpanded && (
            <ListsContainer>
              <CountriesList>
                {filterCountries?.length ? (
                  filterCountries.map((country) => {
                    const isSelectedCountry = selectedCountry.length;
                    const findedSelectedCountry = selectedCountry.find(
                      (_) => _.name === country.name
                    );
                    const findedChangeLength = filterElems.find((_) => _.name === country.name);
                    return (
                      <CountryItem
                        key={country.name}
                        openSubList={isSelectedCountry && findedSelectedCountry}
                      >
                        <div
                          className="country-item__head"
                          onClick={() => handleCountryClick(country)}
                        >
                          <span>
                            {country.name} ({findedChangeLength?.elems?.length})
                          </span>
                          <ArrowListSvg />
                        </div>

                        {isSelectedCountry && findedSelectedCountry ? (
                          <ElemsList>
                            {findedSelectedCountry.elems
                              .filter((elem) =>
                                elem.name.toLowerCase().includes(inputValue.toLowerCase())
                              )
                              .map((elem, index) => (
                                <ElemItem
                                  key={index}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCityClick(elem);
                                  }}
                                >
                                  {getIconByStatus(elem.status)}
                                  <div className="elem__desc">
                                    <p className="desc__name">{elem.name}</p>
                                    {elem.address ? (
                                      <p className="desc__address">{elem.address}</p>
                                    ) : null}
                                  </div>
                                </ElemItem>
                              ))}
                          </ElemsList>
                        ) : null}
                      </CountryItem>
                    );
                  })
                ) : (
                  <p>Не найдено</p>
                )}
              </CountriesList>
            </ListsContainer>
          )}
        </div>
      </CountrySelectorContainer>
    </>
  );
};

export default ObjectSelector;

const CountrySelectorContainer = styled.div`
  position: relative;
  top: 8px;
  left: 8px;
  max-height: 70vh;
  display: flex;
  flex-direction: column;
  width: 350px;
  padding: 12px;
  padding-right: 2px;
  justify-content: space-between;
  z-index: 999; /* Если необходимо поместить поверх остальных элементов */
  border-radius: 12px;
  background: #fff;
  box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  @media (max-width: 568px) {
    width: 220px;
    top: 2px;
    left: 2px;
  }
  .scroll-container {
    overflow: auto;
    padding-right: 10px;
  }
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  & > svg {
    min-width: 12px;

    @media (max-width: 568px) {
      width: 12px;
    }
  }
  .input__close {
    border: none;
    background: transparent;
    outline: none;
    cursor: pointer;
    display: flex;
    margin-left: 10px;
    margin-right: 9px;
    @media (max-width: 568px) {
      width: 20px;
    }
  }
`;

const MapMarkerIcon = styled(MapMarkerSvg)`
  margin-right: 9px;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  @media (max-width: 568px) {
    font-size: 10px;
  }
`;

const ListsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CountriesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const CountryItem = styled.li.withConfig({
  shouldForwardProp: (prop) => !["openSubList"].includes(prop),
})`
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;

  min-height: 48px;
  padding: 10px 14px;
  border-radius: 8px;
  background: #f5f5f5;
  margin-bottom: 12px;
  text-align: start;
  color: #000;
  font-family: Montserrat;
  font-size: 13px;
  font-style: normal;
  font-weight: 700;
  user-select: none;
  @media (max-width: 568px) {
    font-size: 10px;
  }
  &:last-child {
    margin-bottom: 0;
  }
  .country-item__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    & > span {
      padding-right: 4px;
    }
    svg {
      transform: ${({ openSubList }) => (openSubList ? "rotate(180deg)" : "rotate(0deg)")};
    }
  }
`;

const ElemsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: 12px;
`;

const ElemItem = styled.li`
  display: flex;
  min-height: 55px;
  padding: 10px 14px;
  align-items: center;
  gap: 11px;
  align-self: stretch;
  border-radius: 8px;
  background: #fff;
  margin-bottom: 12px;
  &:last-child {
    margin-bottom: 0;
  }
  .elem__desc {
    flex: 1;
    .desc__name {
      color: #000;
      font-family: Montserrat;
      font-size: 11px;
      font-style: normal;
      font-weight: 700;
      line-height: 120%; /* 13.2px */
      @media (max-width: 568px) {
        font-size: 9px;
      }
    }
    .desc__address {
      color: #000;
      font-family: Montserrat;
      font-size: 10px;
      font-style: normal;
      font-weight: 400;
      line-height: 120%; /* 12px */
      padding-top: 4px;
      @media (max-width: 568px) {
        font-size: 8px;
      }
    }
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  flex-shrink: 0;
  opacity: 0.1;
  background: #000;
  margin: 12px -12px;
  width: calc(100% + 20px);
`;

const Overlay = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
`;
