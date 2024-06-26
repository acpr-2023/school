import styled from "styled-components";
import { Button } from "@mui/material";

export const RedButton = styled(Button)`
  && {
    background-color: #f00;
    color: white;
    margin-left: 4px;
    &:hover {
      background-color: #eb7979;
      border-color: #f26767;
      box-shadow: none;
    }
  }
`;

export const BlackButton = styled(Button)`
  && {
    background-color: #000000;
    color: white;
    margin-left: 4px;
    &:hover {
      background-color: #212020;
      border-color: #212020;
      box-shadow: none;
    }
  }
`;

export const DarkRedButton = styled(Button)`
  && {
    background-color: #650909;
    color: white;
    &:hover {
      background-color: #eb7979;
      border-color: #f26767;
      box-shadow: none;
    }
  }
`;

export const BlueButton = styled(Button)`
  && {
    background-color: #080a43;
    color: #fff;
    &:hover {
      background-color: #0a1e82;
    }
  }
`;

export const PurpleButton = styled(Button)`
  && {
    background-color: ##1b1b1b;
    color: #fff;
    &:hover {
      background-color: #3f1068;
    }
  }
`;

export const OrangeBlackButton = styled(Button)`
  && {
    background-color: #1b1b1b;
    color: #fff;
    &:hover {
      background-color: #ff8c0f;
    }
  }
`;

export const GreenButton = styled(Button)`
  && {
    background-color: #133104;
    color: #fff;
    &:hover {
      background-color: #266810;
    }
  }
`;

export const BrownButton = styled(Button)`
  && {
    background-color: #2c1006;
    color: white;
    &:hover {
      background-color: #40220c;
      border-color: #40220c;
      box-shadow: none;
    }
  }
`;

export const IndigoButton = styled(Button)`
  && {
    background-color: #2f2b80;
    color: white;
    &:hover {
      background-color: #534ea6;
      border-color: #473d90;
      box-shadow: none;
    }
  }
`;

export const BeigeButton = styled(Button)`
  && {
    background-color: #ded2c6;
    color: black;
    font-weight: bold;
    &:hover {
      background-color: #ff8c0f;
      border-color: black;
      box-shadow: none;
    }
  }
`;
