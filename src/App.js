import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [link, Setlink] = useState("");
  const [show, setShow] = useState(false);
  const [sucess, setSucess] = useState(null);
  const [url, seturl] = useState();
  const handelShort = () => {
    const encodedParams = new URLSearchParams();
    encodedParams.append("url", link);

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "c11d223f3amsh3b4b6ec91a12073p1b9c73jsn8c5a8d4b931e",
        "X-RapidAPI-Host": "url-shortener-service.p.rapidapi.com",
      },
      body: encodedParams,
    };

    fetch("https://url-shortener-service.p.rapidapi.com/shorten", options)
      .then((response) => response.json())
      .then((response) => seturl(response.result_url))
      .catch((err) => console.error(err));

    link !== "" && isValidUrl(link) ? setShow(true) : setShow(false);
  };
  const handelCopy = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => setSucess(true))
      .catch(() => setSucess(false));
  };
  const isValidUrl = (str) => {
    const pattern = new RegExp(
      "^([a-zA-Z]+:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR IP (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$", // fragment locator
      "i"
    );
    return pattern.test(str);
  };

  return (
    <div className="App">
      {sucess ? (
        <div class="alert alert-success alert-dismissible">
          <a href="#" class="close" data-dismiss="alert" aria-label="close">
            &times;
          </a>
          <strong>Success!</strong> successful Copy
        </div>
      ) : sucess === false ? (
        <div class="alert alert-danger alert-dismissible">
          <a href="#" class="close" data-dismiss="alert" aria-label="close">
            &times;
          </a>
          <strong>Error!</strong> Some thing is worning
        </div>
      ) : (
        ""
      )}
      <div className="App-Content">
        <input
          type="text"
          placeholder="Paste a link to shorten it"
          onChange={(e) => Setlink(e.target.value)}
        />
        <button onClick={handelShort}>Short</button>
      </div>
      {show ? (
        <div className="App-Content result">
          <input type="text" value={url} />
          <button onClick={handelCopy}>Copy</button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default App;
