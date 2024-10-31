import React from "react";
import styled from "styled-components";
// import { ReactComponent as BuildingSvg } from "../icons/building.svg";
import { ReactComponent as CrownBSvg } from "../icons/crownB.svg";
import { ReactComponent as CrownRSvg } from "../icons/crownR.svg";
import { ReactComponent as CrownYSvg } from "../icons/crownY.svg";
import { ReactComponent as NotWorkSvg } from "../icons/notWork.svg";
import { ReactComponent as SettingsSvg } from "../icons/settings.svg";
import { ReactComponent as ShopHouseSvg } from "../icons/shopHouse.svg";
import { ReactComponent as PredstavSvg } from "../icons/predstav.svg";
import { ReactComponent as StarSvg } from "../icons/star.svg";

const WrapMapLegend = styled.div`
  width: 260px;
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: inline-flex;
  padding: 24px;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0px 4px 50px 0px rgba(0, 0, 0, 0.15);

  @media (max-width: 568px) {
    width: 190px;
    padding: 12px;
    bottom: 2px;
    right: 2px;
  }
`;

const LegendTitle = styled.h2`
  color: #000;
  font-family: Montserrat, sans-serif;
  font-size: 13px;
  font-style: normal;
  font-weight: 700;
  line-height: 130%;
  text-align: start;
  @media (max-width: 568px) {
    font-size: 10px;
    text-align: center;
  }
`;

const Divider = styled.div`
  height: 1px;
  align-self: stretch;
  background: #000;
  margin: 24px 0;
  @media (max-width: 568px) {
    margin: 12px 0;
  }
`;

const SectionTitle = styled.h3`
  /* Стили для заголовка секции */
  color: #000;
  font-family: Montserrat, sans-serif;
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 20px;
  @media (max-width: 568px) {
    font-size: 10px;
  }
`;

const IconsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const IconWrapper = styled.div`
  /* Стили для контейнера иконки */
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  &:last-child {
    margin-bottom: 0;
  }
  p {
    color: #000;
    font-family: Montserrat;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 120%; /* 14.4px */
    text-align: start;
    margin-left: 11px;
    flex: 1;
    @media (max-width: 568px) {
      font-size: 8px;
    }
  }
`;

const MapLegend = () => {
  return (
    <WrapMapLegend>
      <LegendTitle>Легенда к карте собственных субъектов ТПС</LegendTitle>
      {/* Контент между заголовком и разделителем */}
      <Divider />
      <SectionTitle>Общие обозначения:</SectionTitle>
      <IconsContainer>
        <IconWrapper>
          <ShopHouseSvg />
          <p>Торговый дом (ТД)</p>
        </IconWrapper>
        <IconWrapper>
          <SettingsSvg />
          <p>Сборочное производство (СП)</p>
        </IconWrapper>
        <IconWrapper>
          <NotWorkSvg />
          <p>Неработающие</p>
        </IconWrapper>
        <IconWrapper>
          <PredstavSvg />
          <p>Представительства</p>
        </IconWrapper>
      </IconsContainer>

      <Divider />
      <SectionTitle>Мультибренды (МБ) :</SectionTitle>
      <IconsContainer>
        <IconWrapper>
          <CrownYSvg />
          <p>В проекте создания</p>
        </IconWrapper>
        <IconWrapper>
          <CrownRSvg />
          <p>С долей участия белорусских предприятий</p>
        </IconWrapper>
        <IconWrapper>
          <CrownBSvg />
          <p>Без доли участия белорусских предприятий</p>
        </IconWrapper>
      </IconsContainer>

      <Divider />
      <IconsContainer>
        <IconWrapper>
          <StarSvg />
          <p>
            Иные субъекты ТПС <br /> (не имеющие доли собственности)
          </p>
        </IconWrapper>
      </IconsContainer>
    </WrapMapLegend>
  );
};

export default MapLegend;

// <IconWrapper>
// <BuildingSvg />
// <p>В стадии создания</p>
// </IconWrapper>
