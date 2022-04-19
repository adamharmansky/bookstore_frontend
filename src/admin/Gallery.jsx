import React from "react";
import Axios from 'axios';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import Button from "@material-ui/core/Button";
import '@splidejs/react-splide/css';

const config = require("../config");

export default function GalleryEditor() {
  const [pictuteList, setPictureList] = React.useState([]);

  React.useEffect(() => {
    Axios.get(config.apiUrl + 'gallery').then((data) => {
      setPictureList(data.data);
      console.log(data.data);
    });
  }, []);
  
  function deleteItem(item) {
    if (window.confirm("chcete vymazať položku " + item + "?")) {
      Axios.delete(config.apiUrl + 'gallery/' + item);
      setPictureList(pictuteList.filter(picture=>(picture.picture_id === item)));
    }
  }

  return (<div className="GalleryEditor">
    <div className='BookPageContainer'>
      <h1> Galéria </h1>
        <Splide hasTrack={false} options={
            {
                type: 'loop',
                heightRatio: 0.615,
                autoWidth: true,
                pagination: false, 
                padding: '6%',
                gap: '2%',
                autoplay: true,
                interval: 9000
            }
        }>
            <SplideTrack>
                {pictuteList.map((p) => <SplideSlide><img src={p.picture_path} onClick={()=>{deleteItem(p.picture_id)}} alt="bruuuuuuuuuuuuh" style={{cursor: "pointer"}}/> </SplideSlide>)}
            </SplideTrack>
        </Splide>
      <Button component='label'> Nahrať Obrázok <input type='file' hidden onChange={(e)=>{
        if (e.target.files[0]) {
          const formData = new FormData();
          formData.append("image", e.target.files[0], e.target.files[0].name);
          Axios({
            method: "post",
            url: config.apiUrl + "book/new/",
            data: formData,
            headers: {"Content-Type": "multipart/form-data"}
          }).then((response) => {
              window.location.href = '/list';
          }).catch((err)=> {
              console.log(err);
          });
        }
      }}/> </Button>
    </div>
  </div>);
}
