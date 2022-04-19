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
  
  function deleteItem(item) {
    console.log(item);
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
                {pictuteList.map((p) => <SplideSlide><img src={p.picture_path} alt=""/><Button fullWidth onClick={()=>{deleteItem(p.picture_id)}}> Vymazať </Button></SplideSlide>)}
            </SplideTrack>
        </Splide>
      <Button fullWidth onClick={()=>{activateCreateMenu(true)}}> Pridať </Button>
      {createMenuVisible ? <div> </div> : null}
    </div>
  </div>);
}
