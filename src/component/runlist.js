import ListGroup from "react-bootstrap/ListGroup";

function HorizontalResponsiveExample(props) {
  let list = [];

  if (props.check) {
    props.file.runes.sort((a, b) => {
      return a.rune_id - b.rune_id;
    });

    props.file.runes.forEach((element, index) => {
      list.push(
        <ListGroup className="my-2 rune-list" key={index}>
          <ListGroup.Item>{element.rune_id}</ListGroup.Item>
        </ListGroup>
      );
    });
  }
  return <>{list}</>;
}

export default HorizontalResponsiveExample;
