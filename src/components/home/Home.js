import React from "react";
import { ChangeEvent, useState } from "react";

const Home = ({ BASEURL, notify }) => {
  const [file, setFile] = useState();
  const [tag, setTag] = useState();
  const [images, setImages] = useState([]);

  React.useEffect(() => {
    fetch(BASEURL + "/picture/listAll", {
      method: "GET",
      headers: {
        Token: localStorage.getItem("TEMP_TOKEN"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "200") {
          setImages(data.data);
        } else {
          notify("Error.");
        }
      })
      .catch((err) => {
        console.error(err);
        notify("Error.");
      });
  }, []);
  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    if (!file) {
      return;
    }

    let data = new FormData();
    data.append("image", file);
    data.append("tags", tag);

    fetch(BASEURL + "/picture/upload", {
      method: "POST",
      body: data,
      headers: {
        "content-type": "multipart/form-data",
        Token: localStorage.getItem("TEMP_TOKEN"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        notify("Uploaded successfully.");
      })
      .catch((err) => {
        console.error(err);
        notify("Error.");
      });
  };
  return (
    <div>
      <div style={{ marginBottom: "40px" }}>
        <h1>UPLOAD PICTURE SECTION...</h1>
        <div>
          <input
            type="text"
            placeholder="Tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
          <input type="file" onChange={handleFileChange} />

          <div>{file && `${file.name} - ${file.type}`}</div>

          <button onClick={handleUploadClick}>Upload</button>
        </div>
      </div>
      <div style={{ marginTop: "40px" }}>
        <h1>All Images</h1>
        {images.map((image) => (
          <div key={image.id}>
            <img src={image.file_path} alt={image.tags} />
            <p>{image.tags}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
