import styled from "styled-components";
import {FormEvent, memo, useCallback, useState} from "react";
import {useFetch} from "../../hooks/useFetch.ts";

const Form = styled.form`
  width: 50%;
  padding-right: 12px;
  display: flex;
  flex-direction: column;
`;

interface vehicle {
  id: number;
  name: string;
}

export type CheckInData = {
  plateNumber: string,
  vehicleType: string,
  expiredDate: string,
  name: string,
}

type CheckInProps = {
  data: CheckInData;
  handleChange: (data: CheckInData) => void;
}

const vehicleTypes: vehicle[] = [{id: 1, name: "Mobil"}, {id: 2, name: "Motor"}]

export const CheckInForm = memo(function CheckInForm(props: CheckInProps) {
  const [submitting, setSubmitting] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [formError, setFormError] = useState("");

  type Payload = {
    plateNumber: string,
    vehicleType: string,
  }

  type Response = {
    expiredDate?: string,
    name?: string,
    vehicleType: string,
    error?: string,
  }

  const {fetchData: checkInForm} = useFetch<Response, Payload>("/check-in", {
    method: "POST",
    isImmediate: true,
    isMultiPart: false
  })

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const formEntries = Object.fromEntries(formData);

    const data = formEntries as Payload;
    checkInForm(data).then((res) => {
      if (res && res.expiredDate && res.name) {
        setSubmitting(false);
        props.handleChange({
          plateNumber: data.plateNumber,
          vehicleType: data.vehicleType,
          expiredDate: res.expiredDate,
          name: res.name
        });
      } else {
        setSubmitting(false);
        setFormError(res && res.error ? res.error : "Failed to send");
      }
    })
  }, [])

  const validateChange = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { plateNumber, vehicleType } = e.currentTarget;
    if (plateNumber.value && vehicleType.value) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [])

  return (
    <Form onSubmit={handleSubmit} onChange={validateChange}>
      <select name={"vehicleType"}>
        <option value="">select...</option>
        {vehicleTypes.map((type) => (
          <option key={type.id} value={type.id}>
            {type.name.toUpperCase()}
          </option>
        ))}
      </select>
      <input type={"text"} name={"plateNumber"} placeholder={"N 1234 N"}/>
      {formError ? <span>{formError}</span> : ""}
      {submitting
        ? <span>Submitting...</span>
        : <button type={"submit"} disabled={!formValid}>Check In</button>
      }
    </Form>
  )
})