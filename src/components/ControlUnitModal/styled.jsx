import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

export const ModalBoxSetup = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  overflow-y: hidden;
  overflow-x: hidden;
  text-align: center;
  box-sizing: border-box;
  z-index: 1;
  animation: 0.7s ${fadeIn} forwards;
`;

export const ControlUnitContainer = styled.div`
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.04);
  border: 0.5px solid var(--im-gray);
  border-radius: 10px;
  background: var(--im-primary);
  width: 480px;
  max-height: 500px;
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
`;

export const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  justify-content: center;
`;

export const ModalBg = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 0;
  background: rgba(2, 2, 2, 0.857);
`;

export const CloseButton = styled.div`
  cursor: pointer;
  right: 0;
  color: var(--im-lightgray);
  background-color: var(--im-red);
  border-radius: 5px;
  width: fit-content;
  padding: 5px 10px;
  font-weight: 600;
  font-size: 15px;
  margin: 5px;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.1s;

  &:hover {
    opacity: 0.8;
  }
`;

export const Line = styled.div`
  background-color: var(--im-lightgray);
  height: 2px;
  margin: 10px 0;
  width: 50%;
`;

export const Bus = styled.div`
  height: 110px;
  width: 200px;
  background-color: var(--im-gray);
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  box-shadow: rgba(60, 60, 60, 0.17) 0px -23px 25px 0px inset,
    rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset,
    rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px,
    rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px,
    rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
`;

export const AddrBus = styled(Bus)`
  background-color: hsl(120, 10.769230769230772%, 74.50980392156863%);
  color: var(--im-darkgray);
`;

export const DataBus = styled(Bus)`
  background-color:  hsl(120, 10.769230769230772%, 74.50980392156863%);
  color: var(--im-darkgray);
`;

export const StartBusContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 1;
  height: 580px;
`;

export const EndBusContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 1;
  height: 530px;
  gap: 200px;
`;

export const InfoContainer = styled.div`
  position: absolute;
  font-size: 13px;
  width: 450px;
`;

export const InfoTile = styled.p`
  text-decoration: underline;
  font-size: 20px;
  font-weight: bold;
`;

export const Info = styled.p`
  display: flex;
  text-align: left;
  font-weight: bold;
`;

export const InfoBox = styled.div`
  background-color: var(--im-white);
  color: var(--im-gray);
  padding: 1px 5px 5px 5px;
  border-radius: 10px;
`;

export const DataBox = styled.div`
  border-radius: 15px;
  background-color: var(--im-primary);
  color: var(--im-white);
  padding: 5px 10px;
`;

export const BlankDataBox = styled.div`
  border-radius: 15px;
  padding: 5px 10px;
  font-style: italic;
`;
