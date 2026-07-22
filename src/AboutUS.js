import React from 'react'
import "./AboutUs.css"

function AboutUS() {

  const values = [
    { title: 'Innovation', desc: 'Pushing boundaries with cutting-edge solutions' },
    { title: 'Excellence', desc: 'Delivering quality in every service i do' },
    { title: 'Integrity', desc: 'Building trust through transparency and honesty' },
    { title: 'Global Impact', desc: 'Empowering professionals worldwide' }
  ];

  const stats = [
    { number: '2+', label: 'Years of Excellence' },
    { number: '6+', label: 'Students Trained' },
    { number: '1+', label: 'Certified Instructors' },
    { number: '80%', label: 'Success Rate' }
  ];

  return (
    <div className='about-section' >
         <div className='about-container'>
              <div className='about-header'>
                   <span className='about-badge'>My Story</span>
                   <h2 className='about-title'>About CholTech</h2>
                   <p className='subtitle'>
                      Empowering the next generation of Tech Professionals in Uganda
                   </p>
              </div>
              <div className='about-content'>
                  <div className='abouttext'>
                    <h3>Who We Are </h3>
                    <p>
                      Founded in 2022, <strong>CholTech</strong> has grown into a premier training and certification hub for 
                      aspiring IT professionals. We bridge the gap between theoretical knowledge and real-world application, 
                      offering hands-on bootcamps, networking courses, hardware repair training, and industry-recognized 
                      Cisco certifications.
                    </p>
                  <p>
                    My mission is simple:to skill individuals to thrive in a digital-first economy. 
                      Whether you're starting from scratch or advancing your career, CholTech provides the roadmap to success.
                  </p>
                  <div className='mission-vision'>
                    <div className='mission'>
                        <h4>My Mission</h4>
                        <p>Develop today by today and create more employment Opportunities for Youth in Uganda</p>
                    </div>
                    <div className='vision'>
                      <h4>My Vision</h4>
                      <p>To be Africa's Leading Tech Institution recognized for excellence and Innovation</p>
                    </div>
                  </div>
                  </div>
                  <div className='about-image'>
                     <img  alt='pic' src='./pic1.jpeg' />
                  </div>
              </div>


              <div className='stats-grid'>
                     {stats.map((stat,idx)=>(
                        <div key={idx} className='statcard'>
                           <div className='statnumber'>{stat.number}</div>
                           <div className='statlabel'>{stat.label}</div>
                        </div>         
                     ))}
              </div>
              <div className='values-section'>
                      <h3 className='values-title'>Our Values</h3>
                      <div className='values-grid'>
                        {values.map((value,idx)=>(
                           <div key={idx} className='value-card'>
                                 <h4>{value.title}</h4>
                                 <p>{value.desc}</p>
                           </div>
                        ))}

                      </div>
              </div>

         </div>
    </div>
  )
}

export default AboutUS