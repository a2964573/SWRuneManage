import { Form, Button, InputGroup } from "react-bootstrap";

function FormFileExample(props) {
  return (
    <>
      <Form.Group controlId="formFileSm" className="mb-3">
        <InputGroup className="mb-3">
          <Form.Control
            type="file"
            onChange={(event) => {
              props.setFile(event.target.files[0]);
            }}
          />
          <Button
            variant="outline-secondary"
            id="button-addon2"
            onClick={() => {
              paresJson(props.file, props.setFile, props.setCheck);
            }}>
            등록하기
          </Button>
        </InputGroup>
      </Form.Group>
    </>
  );
}

function paresJson(file, setFile, setCheck) {
  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = (event) => {
    setFile(JSON.parse(event.target.result));
    setCheck(true);
  };
}

export default FormFileExample;
