import React, { useContext } from 'react';
import { assets, stepsData, testimonialsData } from '../assets/assets';
import { motion, scale } from 'framer-motion'
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom'
const HeaderSection = () => {
  const navigate=useNavigate()
  const {user, setShowLogin}=useContext(AppContext)
  const onClickHandler=()=>{
    if(user){
      navigate('/result')
    }
    else{
      setShowLogin(true)
    }
  }
  return (
    <motion.div className="min-h-screen"
    initial={{opacity:0.2, y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}
    >
      {/* Header Section */}
      <div className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center">
        {/* Badge */}
        <motion.div className="inline-flex items-center bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-1 rounded-full mb-8"
        initial={{opacity:0, y:-20}}
        animate={{opacity:1,y:0}}
        transition={{delay:0.2, duration:0.8}}
        >
          Best Text to Image generator ✨
        </motion.div>

        {/* Main Heading */}
        <motion.h1 className="text-5xl md:text-6xl font-medium text-gray-900 mb-2">
          Turn text to{' '}
            <span className="text-5xl md:text-6xl font-medium text-blue-500 mb-6"
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{delay:0.4, duration:2}}
            >
              image
            </span>
          , in seconds.
        </motion.h1>
        {/* Subtitle */}
        <motion.p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto"
        initial={{opacity: 0, y:20}}
        animate={{opacity: 1, y:0}}
        transition={{delay: 0.6, duration: 0.8}}
        >
          Unleash your creativity with AI. Turn your imagination into visual art in
          seconds – just type, and watch the magic happen.
        </motion.p>

        {/* CTA Button */}
        <motion.button className="bg-black text-white px-6 py-3 rounded-lg font-medium text-sm hover:bg-gray-800 transition-colors duration-200 mb-12"
        whileHover={{scale:1.05}}
        whileTap={{scale:0.95}}
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{default:{duration:0.5}, opacity:{delay:0.8, duration:1}}}
        onClick={onClickHandler}
        >
          Generate Image ✨
        </motion.button>

        {/* Sample Images */}
        <motion.div className="flex justify-center items-center space-x-3 mb-2"
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{delay:1, duration:1}}
        >
          {
            Array(6).fill('').map((item,index)=>(
                <motion.img 
                whileHover={{scale:1.05, duration:0.1}}
                className='rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10' src={index%2==0?assets.sample_img_2:assets.sample_img_1} alt="" key={index} width={70}/>
            ))
          }
        </motion.div>
        <motion.p 
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{delay:1.2, duration:0.8}}
        className="text-gray-500 text-sm mb-16">Generated Images From Imagify</motion.p>
      </div>

      {/* How it works section */}
      <motion.div className="max-w-4xl mx-auto px-6 pb-16"
      initial={{opacity:0.2, y:100}}
      transition={{duration:1}}
      whileInView={{opacity:1,y:0}}
      viewport={{once:true}}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            How it works
          </h2>
          <p className="text-gray-600">
            Transform Words Into Stunning Images
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-4 w-full max-w-3xl text-sm">
            {
                stepsData.map((item,index)=>(
                    <div key={index}
                    className='flex items-center gap-4 p-5 px-8 bg-white/20 shadow-md border cursor-pointer hover:scale-[1.02] transition-all duration-300 rounded-lg'>
                        <img width={40} src={item.icon} alt="" />
                        <div>
                            <h2 className='text-xl font-medium'>{item.title}</h2>
                            <p className='text-gray-500'>{item.description}</p>
                        </div>
                    </div>
                ))
            }
        </div>
      </motion.div>

      {/* Create AI Images Section */}
      <motion.div className="max-w-4xl mx-auto px-6 pb-16"
      initial={{opacity:0.2, y:100}}
      transition={{duration:1}}
      whileInView={{opacity:1,y:0}}
      viewport={{once:true}}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Create AI Images
          </h2>
          <p className="text-gray-600">
            Turn your imagination into visuals
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-12">
          {/* Image */}
          <div className="w-full lg:w-1/2">
            <img 
              src={assets.sample_img_1} 
              alt="AI Generated cake" 
              className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg"
            />
          </div>

          {/* Content */}
          <div className="w-full lg:w-1/2 text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              Introducing the AI-Powered Text to Image Generator
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Experience the future of creativity with our cutting-edge AI technology. Whether you need stunning visuals for creative imagery, our Text to Image tool seamlessly transforms concepts into powerful artwork, bringing your ideas to life with exceptional quality.
            </p>
            <p className="text-gray-600 text-sm">
              Simply type in text prompts and our cutting-edge AI will generate high-quality images. Our advanced technology ensures your prompts, be it digital art, portraits, text concepts first! And if you want ultra-customized efficiency, Powered by innovative AI technology, our system understanding and artistic expertise.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Customer Testimonials */}
      <motion.div className="max-w-6xl mx-auto px-6 pb-16"
      initial={{opacity:0.2, y:100}}
      transition={{duration:1}}
      whileInView={{opacity:1,y:0}}
      viewport={{once:true}}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Customer testimonials
          </h2>
          <p className="text-gray-600">
            What our clients think about us
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial,index)=>(
            <div key={index}
            className='bg-white/20 p-12 rounded-lg shadow-md border w-80 m-auto cursor-pointer hover:scale-[1.02] transition-all'>
                <div className='flex flex-col items-center'>
                    <img src={testimonial.image} alt="" className='rounded-full w-14'/>
                    <h2 className='text-xl font-semibold mt-3'>{testimonial.name}</h2>
                    <p className='text-gray-500 mb-4'>{testimonial.role}</p>
                    <div className='flex mb-4'>
                        {Array(testimonial.stars).fill().map((item,index)=>(
                            <img key={index} src={assets.rating_star} alt="" />
                        ))}
                    </div>
                    <p className='text-center text-sm text-gray-600'>{testimonial.text}</p>
                </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Final CTA */}
      <motion.div className="max-w-4xl mx-auto px-6 pb-16 text-center"
      initial={{opacity:0.2, y:100}}
      transition={{duration:1}}
      whileInView={{opacity:1,y:0}}
      viewport={{once:true}}
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          See the magic. Try now
        </h2>
        <button onClick={onClickHandler} className="bg-black text-white px-6 py-3 rounded-lg font-medium text-sm hover:bg-gray-800 transition-colors duration-200">
          Generate Image ✨
        </button>
      </motion.div>
    </motion.div>
  );
};

export default HeaderSection;