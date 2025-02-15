import styled from "styled-components";
import {FormEvent, memo, useCallback, useState} from "react";
import {useFetch} from "../../hooks/useFetch.ts";
import {CheckInData} from "../CheckInput/CheckInForm.tsx";
import {useNavigate} from "react-router-dom";

const Form = styled.form`
  width: 50%;
  padding-right: 12px;
  display: flex;
  flex-direction: column;
`;

type TicketInProps = {
  data: CheckInData;
  reset: () => void;
}

export const TicketInForm = memo(function TicketInForm(props: TicketInProps) {
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const navigate = useNavigate()

  type Payload = {
    plateNumber: string,
    vehicleType: string
  }

  type Response = {
    error?: string,
  }

  const {fetchData: ticketInForm} = useFetch<Response, Payload>("/ticket-in", {
    method: "POST",
    isImmediate: true,
    isMultiPart: false
  })

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    formData.set("plateNumber", props.data.plateNumber);
    formData.set("vehicleType", props.data.vehicleType);
    const formEntries = Object.fromEntries(formData);

    const data = formEntries as Payload;
    ticketInForm(data).then((res) => {
      setSubmitting(false);
      if (res && res.error) {
        setFormError(res.error ? res.error : "Failed to send");
      } else {
        navigate(0);
      }
    })
  }, [props])

  return (
    <Form onSubmit={handleSubmit}>
      <input type={"text"} name={"vehicleType"} readOnly={true} value={props.data.vehicleType}/>
      <input type={"text"} name={"memberName"} readOnly={true} value={props.data.name}/>
      <input type={"text"} name={"expiryDate"} readOnly={true} value={props.data.expiredDate}/>
      {formError ? <span>{formError}</span> : ""}
      {submitting
        ? <span>Submitting...</span>
        : <button type={"submit"} disabled={!props.data.plateNumber}>Print Ticket</button>
      }
    </Form>
  )
})