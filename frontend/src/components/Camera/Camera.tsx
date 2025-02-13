import styled from "styled-components";

// const CameraContaner = styled.div`
//   margin: 5px;
// `;

const CameraFeed = styled.div`
    background-color: darkgrey;
    border: 1px solid grey;
    min-width: 192px;
    min-height: 144px;
    width: 28vw;
    height: 30vh;
    border-radius: 5px 5px 0 0;
    margin-top: 10px;
`;

const CameraLabel = styled.div`
    background-color: #f0f0f0;
    border: 1px solid grey;
    border-radius: 0 0 5px 5px;
    padding: 3px 5px;
    margin-bottom: 10px;
`;

export type CameraProps = {
  id: number;
  label: string;
}

export const Camera = (props: CameraProps) => {
  return (
    <div className="col-auto">
      <CameraFeed></CameraFeed>
      <CameraLabel>
        {props.label.toUpperCase()}
      </CameraLabel>
    </div>
  );
};
