import {Camera} from "../components/Camera/Camera.tsx";
import styled from "styled-components";
// import {CheckInData, CheckInForm} from "../components/CheckInput/CheckInForm.tsx";
// import {useState} from "react";
// import {TicketInForm} from "../components/TicketInput/TicketInForm.tsx";

const CameraContainer = styled.div`
  margin: 5px;
`;

export const TicketCheckOutPage = () => {

  // const [checkInData, setCheckInData] = useState({} as CheckInData);

  return (
    <>
      <CameraContainer>
        <Camera id={1} label={`AAAAAAA`}/>
        <Camera id={2} label={`AAAAAAA`}/>
        <Camera id={3} label={`AAAAAAA`}/>
        <Camera id={4} label={`AAAAAAA`}/>
      </CameraContainer>
      {/*<CheckInForm data={checkInData} handleChange={(data: CheckInData) => setCheckInData(data)}/>*/}
      {/*<TicketInForm data={checkInData} reset={() => setCheckInData({} as CheckInData)}/>*/}
    </>
  );
};
