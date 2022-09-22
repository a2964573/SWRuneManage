import { Form, Button, InputGroup } from "react-bootstrap";

function FormFileExample(props) {
  let file = props.file;
  return (
    <>
      <Form.Group controlId="formFileSm" className="mb-3">
        <InputGroup className="mb-3" style={{ width: "100%" }}>
          <Form.Control
            type="file"
            style={{ fontSize: "1.6rem" }}
            onChange={(event) => {
              file = event.target.files[0];
            }}
          />
          <Button
            variant="outline-secondary"
            id="button-addon2"
            style={{ fontSize: "1.6rem" }}
            onClick={() => {
              if (file) {
                paresJson(file, props.setFile, props.setCheck);
              }
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
