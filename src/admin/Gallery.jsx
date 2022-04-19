import React from "react";
import Axios from 'axios';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import Button from "@material-ui/core/Button";
import '@splidejs/react-splide/css';

const config = require("../config");

export default function GalleryEditor() {
  var [pictuteList, setPictureList] = React.useState([]);
  var [createMenuVisible, activateCreateMenu] = React.useState([]);

  React.useEffect(() => {
    Axios.get(config.apiUrl + 'gallery').then((data) => {
      setPictureList(data.data);
      console.log(data.data);
    });
  }, []);

  return (<div clasName="GalleryEditor">
    <div className='BookPageContainer'>
      <h1> Galéria </h1>
      {pictuteList.map((p) => {return <Button fullWidth> Odstrániť <img src={p.picture_path} alt=""/></Button>})}
      <Button fullWidth onClick={()=>{activateCreateMenu(true)}}> Pridať </Button>
    </div>
  </div>);
}
