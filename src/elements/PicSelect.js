import React from 'react'

const PicSelect = ( {files, setFiles} ) => {

  const [ filestxt, setFilesTxt ] = React.useState("");

  const previewImage = async (e) => {

    e.preventDefault();

    const file = e.target.files[0];
    console.log(file)
    const reader = new FileReader();
    reader.readAsDataURL(file); // 내가 올릴 img
    reader.onload = (e) => {
      setFiles(e.target.result);
      setFilesTxt(file.name);
    };
  }

  return (
    <div>
      <div style={{ width: "200px", height: "200px" }}>
        <img style={{ width: "100%", height: "100%" }} src={files} alt="" />
      </div>
      <div>
        <input type="text" placeholder="사진을 등록해주세요." value = { filestxt } readOnly /> 
        <div>
          <label htmlFor="file">파일 찾기</label>
        </div>
        <input type="file" id="file" onChange={previewImage} style={{ display: "none" }} />
      </div>
    </div>
  )
}

export default PicSelect