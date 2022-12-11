import styled from "styled-components";

const TextActivInputForm = styled.form`
  width: 322px;
  display: flex;
  flex-direction: column;
`;

const TextActivInputLabel = styled.label`
  font-size: 1.2rem;
  color: #767676;
  font-weight: 500;
`;

const ActivTextInput = styled.input`
  border: none;
  border-bottom: 1px solid #dbdbdb;
  padding: 6px 0px;
  font-family: inherit;
  font-size: 1.4rem;
  font-weight: 400;
  &:focus {
    outline: none;
  }
`;

function TextActivInput() {
  return (
    <TextActivInputForm>
      <TextActivInputLabel htmlFor="">이메일</TextActivInputLabel>
      <ActivTextInput type="text" />
    </TextActivInputForm>
  );
}

export default TextActivInput;