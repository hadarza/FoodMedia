import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React,{ useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
let slidesToShow = 2;

const carouselProperties = {
  // prevArrow: <PreviousBtn />,
  // nextArrow: <NextBtn />,
  slidesToShow: slidesToShow,
  slidesToScroll: 1,
  infinite: false,
  arrows:false,
  dots:true,
  // slidesToScroll={3}
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

const CarouselLoading = ({obj}) => {
  const navigate = useNavigate();
  const [width, setWidth] = useState(window.innerWidth);
  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

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
    <div className='carousel_page flex-col'>
      <div className='skip-div'>
        <a href='./home'>Skip</a>
      </div>
      <div className='slider'>
        <Slider {...carouselProperties}>
              {obj.map((object,index)=>(
                  <ImageComponent key={index} titleCard={object.title} subTitleCard={object.info} image={object.img} href={object.href}/>
              ))}
        </Slider>
      </div>
      <div className='carosual-btn'>
        <button onClick={()=>{navigate('/Register')}} className='start-carousel' >Let's Order!</button>
      </div>
      <div className='div-already-user'>
        <a className='AlreadyUser' href="./Login">Already Have an account? <br/> <span className='log-in-span'>Log In</span></a>
      </div>
    </div>
  );
};

const ImageComponent = ({titleCard,subTitleCard,image,href}) => {
    return (
       <div className='flex-col'>
            <a alt="href" href={href} download>
                <img  style={{
                height:'11rem',
                width:'11rem',
                objectFit:'cover',
                borderRadius: '50%',
                
                }} src={image}/>
            </a>
          <div className='div-titles-carousel'>
            <h5 className='title-carousel'>{titleCard}</h5>
            <h6 className='subTitle-carousel'>{subTitleCard}</h6>
          </div>
      </div>
    )
};

export default CarouselLoading;
