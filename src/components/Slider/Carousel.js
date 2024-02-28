import React, { useEffect, useState } from "react";
import "./Carousel.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={`${className}`}
      style={{ display: 'none' }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={`${className}`}
      style={{ display: 'none'}}
      onClick={onClick}
    />
  );
}

function Carousel(props) {
  let {slider, slider1, slider2} = props
  const [nav, setNav] = useState({nav1: null, nav2: null})

  useEffect(() => {
    setNav({
      nav1: slider1,
      nav2: slider2
    })
  }, [])

  const settings = {
    loop:true,
    dots: false,
    infinite: true,
    // autoplay: true,
    // autoplaySpeed: 2500,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

 
  const next = () =>  {
    slider1.slickNext();
  }
  const previous = () => {
    slider2.slickPrev();
  }

  return (
    <section id="carousel">
      <div className="carousel">
        <div className="carousel-left">
          <div className="carousel-left-slide">
            <Slider asNavFor={nav.nav2}
                    ref={slider => (slider1 = slider)} 
                    {...settings} >
              <div key={1}>
                <img src="https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2021/10/28/968268/Truongdinhhoang.jpg"></img>
              </div>
              <div key={2}>
                <img src="https://media-cdn-v2.laodong.vn/storage/newsportal/2019/8/1/747305/Martin-Nguyen-ONE-DA.jpg"></img>
              </div>
              <div key={3}>
                <img src="https://img.okezone.com/content/2023/01/25/43/2752910/mengenal-perbedaan-boxing-dan-kickboxing-a1H05qo2ZB.JPG"></img>
              </div>
              <div key={4}>
                <img src="https://image.cnbcfm.com/api/v1/image/102643353-472027404.jpg?v=1430655994"></img>
              </div>
              <div key={4}>
                <img src="https://ca-times.brightspotcdn.com/dims4/default/008f636/2147483647/strip/true/crop/7629x5086+0+0/resize/1200x800!/quality/80/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fb0%2F52%2F764bfe0c416f8f4c6bc090adba06%2Fdavis-garcia-boxing-02084.jpg"></img>
              </div>
            </Slider>
            <div className='carousel-left-move' onClick={() => previous()}>
                <div className="prev">
                    <LeftOutlined></LeftOutlined>
                </div>
                <div className="next" onClick={() => next()}>
                    <RightOutlined></RightOutlined>
                </div>
            </div>
          </div>
          <div className="carousel-left-bottom">
            <Slider asNavFor={nav.nav1}
                    ref={slider => (slider2 = slider)}
                    slidesToShow={4}
                    swipeToSlide={true}
                    focusOnSelect={true}
                     >
              
              {/* <div>
                TRỢ GIÁ MÙA DỊCH <br></br> Ưu đãi vô địch
              </div>
              <div>
                NOTE 20 ULTRA 5G  <br></br>  Hotsale giảm sập sàn
              </div>
              <div>
              XR CHÍNH HÃNG  <br></br>  Giá mới cực tốt
              </div>
              <div>
              APPLE WATCH SE  <br></br>  Mua đi chờ chi
              </div>
              <div>
              ĐẠI TIỆC ÂM THANH   <br></br>   Loa sale bung nóc
              </div> */}

            </Slider>
          </div>
        </div>
        <div className="carousel-right">
          <div className="carousel-right-item">
            <img src="https://cdn.shopify.com/s/files/1/0597/5048/2058/files/stores-melbourne1_1445x.jpg?v=1656997672"></img>
          </div>
          <div className="carousel-right-item">
            <img src="https://www.fighterscorner.ie/shop-image.jpg"></img>
          </div>
          <div className="carousel-right-item">
            <img src="https://www.shogunmartialarts.com.au/assets/marketing/66.png?1657062034"></img>
          </div>
          <div className="carousel-right-item">
            <img src="https://img.ws.mms.shopee.vn/sg-11134210-23020-w821d82f6jnvd3"></img>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Carousel;
