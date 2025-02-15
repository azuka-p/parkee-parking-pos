import {Camera} from "../components/Camera/Camera.tsx";
import styled from "styled-components";

const CameraContainer = styled.div`
  margin: 5px;
`;

export const TicketCheckOutPage = () => {

  // const [checkInData, setCheckInData] = useState({} as CheckInData);

  return (
    <>
      <CameraContainer>
        <Camera id={1} label={`Kamera 1`}/>
      </CameraContainer>
    </>
  );
};
