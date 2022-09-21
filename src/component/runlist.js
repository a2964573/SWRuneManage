import { useEffect, useState } from "react";
import { Card, Form, Pagination } from "react-bootstrap";
import { prefixList, setList, optionList } from "./data.js";

function HorizontalResponsiveExample(props) {
  const [view, setView] = useState(10);
  const [page, setPage] = useState(1);
  let runeList = [];
  let list = [];
  let pageControl = [];

  useEffect(() => {
    document.querySelectorAll(".page-link").forEach((element) => {
      element.classList.remove("active");
    });
    addActive(pageControl, page);
  }, [pageControl]);

  useEffect(() => {
    const form = [
      document.querySelector(".form-select"),
      document.querySelector(".pagination"),
    ];
    let visibility = props.check ? "visible" : "hidden";
    form.forEach((element) => {
      element.style.visibility = visibility;
    });
  }, [props.check]);

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

    let totalPage = Math.ceil(runeList.length / view);
    let pageGroup = Math.ceil(page / 10);

    var pageGroupLast = pageGroup * 10;
    if (totalPage < pageGroupLast) {
      pageGroupLast = totalPage;
    }
    var pageGroupFirst =
      pageGroupLast % 10 === 0
        ? pageGroupLast - (10 - 1)
        : pageGroupLast - ((pageGroupLast % 10) - 1);

    for (let i = pageGroupFirst; i <= pageGroupLast; i++) {
      pageControl.push(
        <Pagination.Item
          key={i}
          onClick={() => {
            setPage(i);
          }}>
          {i}
        </Pagination.Item>
      );
    }

    runeList.forEach((element, index) => {
      if ((page - 1) * view < index && index <= page * view) {
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
      }
    });
  }
  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "no-wrap",
          alignItems: "center",
        }}>
        <Pagination
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "0",
          }}>
          <Pagination.First
            onClick={() => {
              setPage(1);
            }}
          />
          <Pagination.Prev
            onClick={() => {
              1 <= page - 10
                ? setPage(pageGroupFirst - 1)
                : setPage(pageGroupFirst);
            }}
          />
          {pageControl}
          <Pagination.Next
            onClick={() => {
              page + 10 < Math.ceil(runeList.length / view)
                ? setPage(pageGroupLast + 1)
                : setPage(pageGroupLast);
            }}
          />
          <Pagination.Last
            onClick={() => {
              setPage(Math.ceil(runeList.length / view));
            }}
          />
        </Pagination>
        <Form.Select
          aria-label="Default select example"
          style={{
            width: "6.1rem",
          }}
          onChange={(event) => {
            setView(event.currentTarget.value);
            setPage(1);
          }}>
          <option value="10">10개</option>
          <option value="50">50개</option>
          <option value="100">100개</option>
        </Form.Select>
      </div>
      <div className="rune-list-container">{list}</div>;
    </div>
  );
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

function addActive(pageControl, page) {
  document.querySelectorAll(".page-link").forEach((element) => {
    element.classList.remove("active");
  });
  pageControl.forEach((element) => {
    if (Number(element.key) === page) {
      console.log("key: ", element.key, "page: ", page);
      if (page % 10 !== 0) {
        document
          .querySelectorAll(".page-link")
          [(page % 10) + 1].classList.add("active");
        console.log("active");
      } else {
        document.querySelectorAll(".page-link")[11].classList.add("active");
        console.log("active");
      }
    }
  });
}

export default HorizontalResponsiveExample;
