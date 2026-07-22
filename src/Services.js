import React from 'react'
import './Services.css'

function Services() {
  // javascript runs here
  const servicesData = [
    {
      id: 1,
      title: 'Coding Bootcamps',
      icon: '💻',
      description: 'Intensive, hands-on training in full-stack development, algorithms, and real-world projects. Launch your tech career in weeks.',
      features: ['JavaScript/Python', 'Full-stack projects', 'Career support','Debugging']
    },
    {
      id: 2,
      title: 'Computer Networking',
      icon: '🌐',
      description: 'Design, configure, and secure modern networks. From LAN/WAN to cloud networking and SDN fundamentals.',
      features: ['Routing & Switching', 'Network Security', 'Cloud integration']
    },
    {
      id: 3,
      title: 'Computer Repair & Maintenance',
      icon: '🛠️',
      description: 'Professional diagnostics, hardware repair, software troubleshooting, and preventive maintenance for all devices.',
      features: ['Hardware repair', 'Virus removal', 'Performance optimization']
    },
    {
      id: 4,
      title: 'Graphic Design',
      icon: '🎨',
      description: 'Master visual communication, branding, and modern design tools. Project-based training with industry professionals.',
      features: ['UI/UX Design', 'Branding & Typography', 'Adobe Creative Cloud']
}
  ];

  return (
    <div className='services-section'>
       <div className='services-container'>
           <div className='services-header'>
                <span className='services-badge'>What we Offer</span>
                <h2 className='services-title'>Our Premium Services</h2>
                <p className='services-subtitle'>Empowering  Your Future with industry-leading training and support</p>
                 <span><a  className='services-badge'  href='/login'>Other Service</a></span>
           </div>
       </div> 

                    {/*code goes through the array that we created */}
       <div className='services-grid'>     
        {servicesData.map((service) => (
            <div className="service-card" key={service.id}>
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <ul className="service-features">
                {service.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                )   )    }
              </ul>
              
            </div>
          )  )   }

        </div>
      
    </div>
  )
}

export default Services