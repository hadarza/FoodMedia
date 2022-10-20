import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React,{ useState,useEffect } from 'react';
import ImageCarosuel from './ImageCarosuel/ImageCarosuel';
import {useDispatch, useSelector} from 'react-redux'
import {fetchImages,getImageHeader,getstatusFolders} from '../../../Redux/features/DashBoard/DashBoardDB'
import SkeletonCarosuel from './SkeletonCarosuel/SkeletonCarosuel';
let slidesToShow = 2;

const carouselProperties = {
  slidesToShow: slidesToShow,
  slidesToScroll: 1,
  infinite: true,
  arrows:false,
  dots:true,
  responsive: [
    {
      breakpoint: 426,
      settings: {
        slidesToShow: 1,
        centerMode: false,
      },
    },
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 1,
        centerMode: false,
      },
    },
    {
      breakpoint: 1025,
      settings: {
        slidesToShow: 2,
        centerMode: false,
      },
    },
  ],
};

const CarosuelHome = () => {
  const ListsFolders = useSelector(getImageHeader)
  const dispatch = useDispatch()
  const [width, setWidth] = useState(window.innerWidth);
  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  const statusFolders = useSelector(getstatusFolders)

  useEffect(() => {
    console.log(statusFolders)
    if(statusFolders == "idle"){
      dispatch(fetchImages())
    }

},[statusFolders,dispatch])
  
  
  useEffect(() => {
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);

    
  }, []);

  if (width <= 426) {
    slidesToShow = 1;
  } else if (width > 426 && width <= 769) {
    slidesToShow = 1;
  } else if (width > 769 && width <= 1025) {
    slidesToShow = 2;
  } else {
    slidesToShow = 2;
  }


  return (
      <div className='slider slider-header-store'>
        {console.log(ListsFolders)}
        {ListsFolders.length != 0 ?
        <Slider {...carouselProperties}>
              {ListsFolders.map((image,index)=>(
                <ImageCarosuel key={index} img={image.filenameimage}/>
              ))}

        </Slider>: <SkeletonCarosuel/>
        }
        </div>
  )
}
export default CarosuelHome