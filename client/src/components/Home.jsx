import React from 'react';
const BASE_URL= "http://localhost:8080/api";
import '../styles/Home.css'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate(); 
const handleClick = () => {
  navigate('/products')
}


  return (
    <div className='homeContainer'>
      <div className='titleContianer'>
      <img className="title" src="./img/title.png" />
      </div>
        <section className="homeSection">
        <img className="image" src="./img/couch6.jpg" />
          <div className="homeLeft">
            <h2>COUCHES</h2>
            <p>
            Indulge in the epitome of comfort with our exquisite collection 
            of couches. Crafted with meticulous attention to detail, each couch
             offers a luxurious retreat for relaxation and leisure. Sink into 
             plush cushions, embrace the perfect balance of support and 
             softness, and elevate your living space with these stylish 
             and inviting seating options. Experience the ultimate in comfort 
             and style with our exceptional couches, where lounging becomes an art form.
            </p>
            <button className='shop' onClick={handleClick}>SHOP COUCHES</button>
          </div>
        </section>
        <section className="homeSection">
          <div className="homeLeft">
            <h2>LIGHTS</h2>
            <p>
            Illuminate your space with enchanting radiance using 
            our extraordinary collection of light fixtures. Meticulously 
            crafted with exquisite attention to detail, each fixture is 
            a captivating work of art that brings both brilliance and ambiance 
            to any room. Whether you seek a contemporary masterpiece or a 
            timeless classic, our diverse range offers a harmonious blend of 
            style and functionality, casting a mesmerizing glow that transforms 
            your space into a captivating sanctuary of light. Elevate your décor 
            with our exceptional light fixtures and embrace a world of illuminated wonder.
            </p>
            <button className='shop' onClick={handleClick}>SHOP LIGHTS</button>
          </div>
          <img className="image" src="./img/light14.jpg" />
        </section>
        <section className="homeSection">
        <img className="image" src="./img/chair8.jpg" />
          <div className="homeLeft">
            <h2>CHAIRS</h2>
            <p>
            Discover the epitome of sitting elegance with our exceptional 
            collection of chairs. Meticulously designed with both style 
            and comfort in mind, each chair exudes a timeless charm that 
            complements any space. Immerse yourself in plush cushions and 
            luxurious upholstery, while the ergonomic design provides unparalleled 
            support for your back and posture. Elevate your sitting experience and 
            add a touch of sophistication to your surroundings with our exquisite 
            chairs that effortlessly blend functionality and aesthetics.
            </p>
            <button className='shop' onClick={handleClick}>SHOP CHAIRS</button>
          </div>
        </section>
        <section className="homeSection">
          <div className="homeLeft">
            <h2>TABLES</h2>
            <p>
              Transform your living space with the centerpiece of elegance 
              - our remarkable collection of tables. Meticulously crafted 
              with exquisite craftsmanship, each table boasts a harmonious blend 
              of style and functionality, making it a stunning focal point in any 
              room. From sleek and modern designs to timeless and rustic aesthetics, 
              our diverse range offers the perfect table to suit your taste, adding 
              an air of sophistication and practicality to your home. Elevate your 
              interior décor and create a gathering space that exudes charm and 
              versatility with our exceptional tables that effortlessly blend form and function.
            </p>
            <button className='shop' onClick={handleClick}>SHOP TABLES</button>
          </div>
          <img className="image" src="./img/table13.jpg" />
        </section>
      </div>
);
  }
    


export default Home;