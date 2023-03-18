import Carousel from 'react-bootstrap/Carousel';


function BackgroundSlider() {
  return (
    <Carousel>
      <Carousel.Item interval={2000}>
        <div className="w-100 d-flex flex-column justify-content-center align-item-center text-white" 
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1558980664-2cd663cf8dde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80")', backgroundPosition:'center center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '90vh'}}>
            <div className='text-center p-3 mb-2'>
            <h3 className="display-1"><strong>Welcome to Motozone</strong></h3>
                <p>Upgrade your motorbike with Motozone<br />
                Motozone helps users communicate information about their bikes to sell and buy bikes</p>
            </div>
        </div>
      </Carousel.Item>


      <Carousel.Item interval={2000}>
        <div className="w-100 d-flex flex-column justify-content-center align-item-center text-white" 
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1558980664-28d10ee9bb52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80")', backgroundPosition:'center center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '90vh'}}>
            <div className='text-center p-3 mb-2'>
            <h3 className="display-1"><strong>Welcome to Motozone</strong></h3>
                <p>Upgrade your motorbike with Motozone<br />
                Motozone helps users communicate information about their bikes to sell and buy bikes</p>
            </div>
        </div>
      </Carousel.Item>


      <Carousel.Item interval={2000}>
        <div className="w-100 d-flex flex-column justify-content-center align-item-center text-white" 
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1558980664-3a031cf67ea8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80")', backgroundPosition:'center center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '90vh'}}>
            <div className='text-center p-3 mb-2'>
                <h3 className="display-1"><strong>Welcome to Motozone</strong></h3>
                <p>Upgrade your motorbike with Motozone<br />
                Motozone helps users communicate information about their bikes to sell and buy bikes</p>
            </div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default BackgroundSlider;