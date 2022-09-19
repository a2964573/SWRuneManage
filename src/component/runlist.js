import { Card } from "react-bootstrap";
import { prefixList, setList, optionList } from "./data.js";

function HorizontalResponsiveExample(props) {
  let runeList = [];
  let list = [];

  if (props.check) {
    props.file.runes.forEach((element) => {
      return runeList.push(element);
    });
    props.file.unit_list.forEach((element) => {
      if (element.runes.length) {
        return runeList.push(...element.runes);
      }
    });
    runeList.sort((a, b) => a.set_id - b.set_id);
    runeList.forEach((element) => {
      list.push(
        <li key={element.rune_id}>
          <Card
            style={{
              display: "grid",
              gridTemplateColumns: " 4rem repeat(2, 1fr)",
              gridTemplateRows: "4rem repeat(3, 2.5rem)",
              alignItems: "center",
              textAlign: "left",
              minWidth: "21rem",
            }}>
            <Card.Img
              variant="top"
              src={`./image/rune-image-${element.set_id}.png`}
              style={{ width: "4rem" }}
            />
            <Card.Title
              style={{
                fontSize: "1.4rem",
                fontWeight: "bold",
                gridArea: "1/2/2/4",
              }}>
              {findRuneTitle(element)}
            </Card.Title>
            <span>{pri_prefixFunc(element.pri_eff)}</span>
            <span>
              {element.prefix_eff[1] ? (
                pri_prefixFunc(element.prefix_eff)
              ) : (
                <></>
              )}
            </span>
            {secEffFunc(element.sec_eff)}
          </Card>
        </li>
      );
    });
  }
  return <div className="rune-list-container">{list}</div>;
}

function findRuneTitle(element) {
  let title = `(${element.slot_no}) `;
  prefixList.forEach((preElement) => {
    if (element.prefix_eff[0] === preElement.prefix_eff) {
      return (title += `${preElement.title} `);
    }
  });
  setList.forEach((setElement) => {
    if (element.set_id === setElement.set_id) {
      return (title += `${setElement.title}의 룬 +${element.upgrade_curr}`);
    }
  });
  return title;
}

function pri_prefixFunc(prams) {
  let span;
  optionList.forEach((optionElement) => {
    if (prams[0] === optionElement.id) {
      let per = "%";
      switch (optionElement.id) {
        case 1:
        case 3:
        case 5:
        case 8:
          per = "";
          break;
      }
      span = <span>{`${optionElement.title} ${prams[1]}${per}`}</span>;
    }
  });
  return span;
}

function secEffFunc(sec_eff) {
  let spanList = [];
  sec_eff.forEach((element) => {
    optionList.forEach((optionElement) => {
      if (element[0] === optionElement.id) {
        let per = "%";
        switch (optionElement.id) {
          case 1:
          case 3:
          case 5:
          case 8:
            per = "";
            break;
        }
        spanList.push(
          <span
            key={
              optionElement.id
            }>{`${optionElement.title} ${element[1]}${per}`}</span>
        );
      }
    });
  });
  return spanList;
}

export default HorizontalResponsiveExample;
