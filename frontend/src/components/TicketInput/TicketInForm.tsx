import styled from "styled-components";
import {FormEvent, memo, useCallback, useState} from "react";
import {useFetch} from "../../hooks/useFetch.ts";
import {CheckInData} from "../CheckInput/CheckInForm.tsx";

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

  type Payload = {
    plateNumber: string,
    checkInTime: string
  }

  type Response = {
    error?: string,
  }

  const {fetchData: ticketInForm} = useFetch<Response, Payload>("/ticket-in", {
    method: "POST",
  })

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const formEntries = Object.fromEntries(formData);

    const data = formEntries as Payload;
    ticketInForm(data).then((res) => {
      setSubmitting(false);
      if (res) {
        setFormError(res.error ? res.error : "Failed to send");
      } else {
        props.reset();
      }
    })
  }, [])

  return (
    <Form onSubmit={handleSubmit}>
      <input type={"text"} name={"vehicleType"} disabled={true}>{props.data.vehicleType}</input>
      <input type={"text"} name={"memberName"} disabled={true}>{props.data.memberName}</input>
      <input type={"text"} name={"expiryDate"} disabled={true}>{props.data.expiryDate}</input>
      {formError ? <span>{formError}</span> : ""}
      {submitting
        ? <span>Submitting...</span>
        : <button type={"submit"} disabled={!props.data.plateNumber}>Print Ticket</button>
      }
    </Form>
  )
})