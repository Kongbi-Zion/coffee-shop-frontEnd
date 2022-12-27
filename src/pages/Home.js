import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'
import '../App.css'
import Products from '../components/Products'
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import SpaIcon from '@mui/icons-material/Spa';
import PersonIcon from '@mui/icons-material/Person';
import Footer from '../components/Footer'
import productImg2 from '../images/download(1).jpg'
import productImg3 from '../images/download(2).jpg'
import productImg4 from '../images/download(3).jpg'
import productImg5 from '../images/flat-white-3402c4f.jpg'
import productImg6 from '../images/images.jpg'
import productImg7 from '../images/images(1).jpg'
import productImg10 from '../images/images(4).jpg'
import productImg11 from '../images/img1.webp'
import productImg12 from '../images/img2.jpg'
import productImg13 from '../images/img3.jpg'
import Modal from 'react-bootstrap/Modal';
import Aos from 'aos';
import 'aos/dist/aos.css';
import FloatButton from '../components/FloatButton'
import ClientsOrderList from '../components/ClientsOrderList'
import Adminproducts from '../components/Adminproducts'
import AdminOrdersList from '../components/AdminOrdersList'
import { useFormik } from 'formik';
import { loginFormValidations } from '../utils/FormValidations'
import { registerFormValidations } from '../utils/FormValidations'
import { addProductFormValidations } from '../utils/FormValidations'
import { contactFormValidations } from '../utils/FormValidations';
import { FaLeaf } from "react-icons/fa";
import { FaGlassMartini } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux'
import { register, reset, logout, login } from '../redux/auth/authSlice'
import axios from 'axios';
import { API } from '../config'
import { OpenInBrowserSharp } from '@mui/icons-material'
import emailjs from '@emailjs/browser';
function Home() {
  const form = useRef();
  const [lgShow, setLgShow] = useState(false); 
  const [SmShow, setSmShow] = useState(false); 
  const [loginn, setLogin] = useState(true); 
  const [addProduct, setAddProduct] = useState(false); 
  const [adminList, setAdminList] = useState(false); 
  const [sendMessage, setSendMessage] = useState(false); 
  const [products, setProducts] = useState([]);
  const [orderList, setOrderList] = useState([])
  const [userOrderList, setUserOrderList] = useState([])
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
  function smoothScroll(event){
    document.querySelector('#'+event).scrollIntoView({
        behavior: 'smooth'
    });
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    Aos.init({ duration: 1000 });

    axios.get(`${API}/products`)
      .then(({ data }) => {
          setProducts(data.data);
      })
      .catch((error) => {
      });

    axios.get(`${API}/orders`)
      .then(({ data }) => {
        setOrderList(data.data);
      })
      .catch((error) => {
      });

    if(user != null){
      axios.get(`${API}/orders/usersOrders/${user._id}`)
      .then(({ data }) => {
        setUserOrderList(data.data);
      })
      .catch((error) => {
      });
    }

    /* ---- user ----*/

    if(!sendMessage){
      if(isError){
        toast.error(message);
      }
    }

    if(isSuccess || user){
      if(!loginn){
        toast.success("Your account has been created")
      }
    }

    dispatch(reset())
    

    }, [user, isError, isLoading, message, isSuccess, dispatch]);  


  const [imageName, setImageName] = useState('')
  const [images, setImages] = useState('')
  const handleImage = (event)=>{
      var img = event.target.files[0]
      setImages(img)
      setImageName(img.name)
  }    


  /* ------------- form validations and submision ------------- */

  const onSubmit = (values, actions) => {
    
    //-------------- adding product ----------------
      if(addProduct){
        const submitProduct = (productInfo) => {

          // sending post request to upload file
          const formData = new FormData()
          formData.append('myFile', images)
          axios.post(`${API}/upload`, formData, {
              headers:{
                  "content-tupe": "multipart/form-data"
              }
          }).then(res=>{
          }).catch(err=>{
          })
     
          axios.post(`${API}/products/create`, productInfo)
              .then(res => {
              })
              .catch(err => {
              })
              window.location.reload()
        }
  
        const image = imageName;
        const {title, amount, description } = values;
            submitProduct({
                title,
                amount,
                description,
                image,
            });
      }

    
    /* --------------------- User register -------------------- */
    if(!addProduct)
      if(loginn){
        const userData = {
          email: values.email,
          password: values.password,
        }
        dispatch(login(userData))
      }else{
        const userData = {
          name: values.name,
          email: values.email,
          password: values.password,
          products: [],
        }
        dispatch(register(userData))
      }
      setSmShow(false)


      //  ----------------------- message form -----------------------
      if(sendMessage){
        emailjs.sendForm('service_vcac4z9', 'template_1msy5qp', form.current, 'QFA2ro6tL4Mj1GKgA')
        .then((result) => {
          actions.resetForm();
          toast.success("Your email has been sent");
          setSendMessage(false)
        }, (error) => {
          actions.resetForm();
          toast.error("email not sent please refresh your page and try again !")
          setSendMessage(false)
        });
      }
    };
  
  const loginFormik = useFormik({
    initialValues: {
      email: "", password: "",
    },
    validationSchema: loginFormValidations,
    onSubmit,
  })

  const registerFormik = useFormik({
    initialValues: {
       name: "", email: "", password: "", confirm_password: "",
    },
    validationSchema: registerFormValidations,
    onSubmit,
  })

  const addProductFormik = useFormik({
    initialValues: {
       title: "", amount: "", description: "",
    },
    validationSchema: addProductFormValidations,
    onSubmit,
  })

  const contactFormik = useFormik({
    initialValues: {
       name: "", email: "", subject: "", message: "",
    },
    validationSchema: contactFormValidations,
    onSubmit,
  })

  const logOut = () => {
    dispatch(logout())
    dispatch(reset())
    window.location.reload();
  }

  return (
    <>
      <main>
        <FloatButton/>
        {/* <NavBar/> */}
        

        {user != null && user.isAdmin ? 
        
          <nav id="myNav" className="navbar navbar-expand-lg navbar-dark fixed-top sticky-top">

            {/* -------------------- Admin Nav bar ------------------------- */}

            <div className="container">
                <Link className="navbar-brand" to="/">
                    <LocalCafeIcon style={{color:"#ce6d06", fontSize:"2.3rem"}}/> Coffee Shop
                </Link>
                <button style={{outline:'none', boxShadow:"none", border:"none"}} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
    
                <div className="collapse navbar-collapse"></div>
    
                <div  className="collapse navbar-collapse navbarCollapse" id="navbarNavDropdown" >
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to='/' className="nav-link">Home</Link>
                        </li>
                        <li onClick={() => smoothScroll("about")} className="nav-item active">
                            <Link to='#' className="nav-link">About</Link>
                        </li>
                        <li onClick={() => smoothScroll("services")} className="nav-item active">
                            <Link to='#' className="nav-link">Services</Link>
                        </li>
                        <li onClick={() => smoothScroll("gallery")} className="nav-item active">
                            <Link to='#' className="nav-link">Gallery</Link>
                        </li>
                        <li onClick={() => setAddProduct(true)} className="nav-item active">
                            <Link to='#' className="nav-link">Add products</Link>
                        </li>
                        <li onClick={() => setAdminList(true)} className="nav-item active">
                            <Link to='#' className="nav-link">Orders</Link>
                        </li>
                        <li onClick={() => smoothScroll("contact")} className="nav-item active">
                            <Link to='#' className="nav-link">Contact</Link>
                        </li>
                    </ul>
                </div>
                <div className='navIcons'>
                <span onClick={() => setSmShow(true)} style={{marginRight:"2rem"}}><PersonIcon/></span>
                <button onClick={() => smoothScroll("products")} className='orderBtn'>Order Now</button>
                </div>
            </div>
          </nav>
          :
          <nav id="myNav" className="navbar navbar-expand-lg navbar-dark fixed-top sticky-top">

             {/* -------------------- Clients Nav bar ------------------------- */}

            <div className="container">
                <Link className="navbar-brand" to="/">
                    <LocalCafeIcon style={{color:"#ce6d06", fontSize:"2.3rem"}}/> Coffee Shop
                </Link>
                <button style={{outline:'none', boxShadow:"none", border:"none"}} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
    
                <div className="collapse navbar-collapse"></div>
    
                <div  className="collapse navbar-collapse navbarCollapse" id="navbarNavDropdown" >
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to='/' className="nav-link">Home</Link>
                        </li>
                        <li onClick={() => smoothScroll("about")} className="nav-item active">
                            <Link to='#' className="nav-link">About</Link>
                        </li>
                        <li onClick={() => smoothScroll("services")} className="nav-item active">
                            <Link to='#' className="nav-link">Services</Link>
                        </li>
                        <li onClick={() => smoothScroll("gallery")} className="nav-item active">
                            <Link to='#' className="nav-link">Gallery</Link>
                        </li>
                        <li onClick={() => smoothScroll("products")} className="nav-item active">
                            <Link to='#' className="nav-link">Products</Link>
                        </li>
                        <li onClick={() => setLgShow(true)} className="nav-item active">
                            <Link to='#' className="nav-link">Orders</Link>
                        </li>
                        <li onClick={() => smoothScroll("contact")} className="nav-item active">
                            <Link to='#' className="nav-link">Contact</Link>
                        </li>
                    </ul>
                </div>
              <div className='navIcons'>
                <span onClick={() => setSmShow(true)} style={{marginRight:"2rem"}}><PersonIcon/></span>
                <button onClick={() => smoothScroll("products")} className='orderBtn'>Order Now</button>
              </div>
            </div>
          </nav>
        }


      

        
        <div>
            <div className='mainHeroSection'>
              <div className='heroText' data-aos="fade-right" data-aos-offset="100">
                <p className='primaryText'>Hot and tasty coffee</p>
                <p className='secondryText text-white'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                  proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  
                </p>
              </div>
              <button onClick={() => smoothScroll("products")} className='orderBtn' data-aos="fade-right" data-aos-offset="100">Order Now</button>
            </div>
            
            <div id="about" className='innerContainer row'>
              <div className='col-lg-4 col-md-12 col-sm-12'>
                <div className='heroText' data-aos="zoom-in-right" data-aos-offset="100">
                  <p className='secondryText feature'>BEST FOR YOU</p>
                  <p className='primaryText'>Who we are</p>
                  <p className='secondryText'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  
                  </p>
                </div>
                <div className='btncenter' data-aos="zoom-in-right" data-aos-offset="100">
                  <button className='orderBtn'>Read More</button>
                </div>
              </div>
              <div className='col-lg-8 col-md-12 col-sm-12'>
                  <div className='aboutImageContainer'>
                    <div className='imageContainer' data-aos="zoom-in-right" data-aos-offset="100"> <img src={productImg5}/></div>
                    <div className='imageContainer' data-aos="zoom-in-down" data-aos-offset="100"> <img src={productImg6}/></div>
                    <div className='imageContainer' data-aos="zoom-in-left" data-aos-offset="100"><img src={productImg7}/></div>
                  </div>
              </div>
              <div id="products" ></div>
            </div>

            <div className='featuredProducts row'>
              <div className='innerContainer' data-aos="fade-down" data-aos-offset="100">
                <p className='secondryText text-center feature'>FEATURED PRODUCTS</p>
                <p className='primaryText text-center'>Our Products</p>
              </div>
              <div className='productWrapper'>
               {user != null && user.isAdmin ? 
                  products.map(product => <Adminproducts key={product._id} id={product._id} image={product.image} title={product.title} amount={product.amount} description={product.description}/> )
                  :
                  products.map(product => <Products key={product._id} id={product._id} image={product.image} title={product.title} amount={product.amount} description={product.description} /> )
               }
                
                

              </div>
            </div>

            <div id="services" className='innerContainer row'>
              <div className='col-lg-4 col-md-12 col-sm-12' data-aos="zoom-in-down" data-aos-offset="100">
                <div className='heroText'>
                <p className='secondryText feature'>BLEND COFFEE</p>
                  <p className='primaryText'>Our Services</p>
                  <p className='secondryText'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                  </p>
                  <p className='secondryText'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse 
                  </p>
                </div>
                <div className='btncenter'>
                  <button className='orderBtn'>Read More</button>
                </div>

              </div>
              <div className='col-lg-8 col-md-12 col-sm-12'>
                  <div className='servicesVarietyContainer'>
                      <div data-aos="flip-right" data-aos-offset="100">
                        <LocalCafeIcon style={{color:"#ce6d06", fontSize:"2.5rem"}}/>
                        <h3 className='servicesText'>Types of Coffee</h3>
                        <p className='secondryText'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor </p>
                      </div>

                      <div data-aos="flip-left" data-aos-offset="100">
                        <FaLeaf style={{color:"#ce6d06", fontSize:"2.5rem"}}/>
                        <h3 className='servicesText'>Coffee to go</h3>
                        <p className='secondryText'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor </p>
                      </div>

                      <div data-aos="flip-right" data-aos-offset="100">
                        <SpaIcon style={{color:"#ce6d06", fontSize:"2.5rem"}}/>
                        <h3 className='servicesText'>Coffee & Pastry</h3>
                        <p className='secondryText'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor </p>
                      </div>

                      <div data-aos="flip-left" data-aos-offset="100">
                        <FaGlassMartini style={{color:"#ce6d06", fontSize:"2.5rem"}}/>
                        <h3 className='servicesText'>Bean Varieties</h3>
                        <p className='secondryText'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor </p>
                      </div>
                  </div>
              </div>
              <div id="gallery"></div>
            </div>

            <div className='featuredProducts'>
              <div className='innerContainer' data-aos="zoom-down" data-aos-offset="100">
                <p className='secondryText text-center feature'>COFFEE GALLERY</p>
                <p className='primaryText text-center'>Our Gallery</p>
              </div>
              <section data-aos="zoom-up" data-aos-offset="100" className="gallery-section" style={{marginTop:"-3rem"}}>
                <div className="row">
                  <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 mt-4">
                    <div className="bg-image hover-overlay ripple shadow-1-strong rounded" data-ripple-color="light" >
                      <img src={productImg2} className="w-100"/>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 mt-4">
                    <div className="bg-image hover-overlay ripple shadow-1-strong rounded" data-ripple-color="light" >
                      <img src={productImg13} className="w-100"/>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 mt-4">
                    <div className="bg-image hover-overlay ripple shadow-1-strong rounded" data-ripple-color="light" >
                      <img src={productImg4} className="w-100"/>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 mt-4">
                    <div className="bg-image hover-overlay ripple shadow-1-strong rounded" data-ripple-color="light" >
                      <img src={productImg11} className="w-100"/>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 mt-4">
                    <div className="bg-image hover-overlay ripple shadow-1-strong rounded" data-ripple-color="light" >
                      <img src={productImg7} className="w-100"/>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 mt-4">
                    <div className="bg-image hover-overlay ripple shadow-1-strong rounded" data-ripple-color="light" >
                      <img src={productImg10} className="w-100"/>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 mt-4">
                    <div className="bg-image hover-overlay ripple shadow-1-strong rounded" data-ripple-color="light" >
                      <img src={productImg12} className="w-100"/>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 mt-4">
                    <div className="bg-image hover-overlay ripple shadow-1-strong rounded" data-ripple-color="light" >
                      <img src={productImg3} className="w-100"/>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div id="contact" data-aos="zoom-up" data-aos-offset="100">
              <div className='innerContainer' data-aos="zoom-down" data-aos-offset="100">
                <p className='secondryText text-center feature'>AVAILABLE 24/7</p>
                <p className='primaryText text-center'>Contact Us</p>
              </div>
              <div className="form-container">
                <form ref={form} onSubmit={contactFormik.handleSubmit}>
                  <div className="form-group" data-aos="zoom-left" data-aos-offset="100">
                      <label htmlFor='name' style={{ marginBottom: "-8px"}} className="FormLable"><p>Name *</p></label>
                      <input type="text" style={{backgroundColor:"transparent", height:"2.5rem", borderRadius:"0rem", boxShadow:"none", outline:"none"}} className={`form-control ${contactFormik.errors.name && contactFormik.touched.name && 'form-control2 error-boder'}`} placeholder="Please enter your name" name="name" value={contactFormik.values.name} onChange={contactFormik.handleChange} onBlur={contactFormik.handleBlur}/>
                      <span className='error' style={{fontSize:"1rem"}}>{contactFormik.errors.name && contactFormik.touched.name ? contactFormik.errors.name : ''}</span>
                  </div>
                  <div className="form-group" data-aos="zoom-right" data-aos-offset="100">
                      <label htmlFor='email' style={{ marginBottom: "-8px" }} className="FormLable"><p>Address email *</p></label>
                      <input type="text" style={{backgroundColor:"transparent", height:"2.5rem", borderRadius:"0rem", boxShadow:"none", outline:"none"}} className={`form-control ${contactFormik.errors.email && contactFormik.touched.email && 'form-control2 error-boder'}`} placeholder="Please enter your email" name="email" value={contactFormik.values.email} onChange={contactFormik.handleChange} onBlur={contactFormik.handleBlur}/>
                      <span className='error' style={{fontSize:"1rem"}}>{contactFormik.errors.email && contactFormik.touched.email ? contactFormik.errors.email : ''}</span>
                  </div>
                  <div className="form-group" data-aos="zoom-left" data-aos-offset="100">
                      <label htmlFor='subject' style={{ marginBottom: "-8px" }} className="FormLable"><p>Subject *</p></label>
                      <input type="text" style={{backgroundColor:"transparent", height:"2.5rem", borderRadius:"0rem", boxShadow:"none", outline:"none"}} className={`form-control ${contactFormik.errors.subject && contactFormik.touched.subject && 'form-control2 error-boder'}`} placeholder="Please enter your subject" name="subject" value={contactFormik.values.subject} onChange={contactFormik.handleChange} onBlur={contactFormik.handleBlur}/>
                      <span className='error' style={{fontSize:"1rem"}}>{contactFormik.errors.subject && contactFormik.touched.subject ? contactFormik.errors.subject : ''}</span>
                  </div>
                  <div className="form-group" data-aos="zoom-right" data-aos-offset="100">
                      <label htmlFor='message' style={{ marginBottom: "-8px" }} className="FormLable"><p>Message *</p></label>
                      <textarea className={`form-control ${contactFormik.errors.message && contactFormik.touched.message && 'form-control2 error-boder'}`} id="message" name="message" rows="5" style={{backgroundColor:"transparent", marginBottom:".5rem", boxShadow:"none", outline:"none", borderRadius:"0rem"}} placeholder="Please enter your message" value={contactFormik.values.message} onChange={contactFormik.handleChange} onBlur={contactFormik.handleBlur}></textarea>
                      <span className='error' style={{fontSize:"1rem"}}>{contactFormik.errors.message && contactFormik.touched.message ? contactFormik.errors.message : ''}</span>
                  </div>
                  <div onClick={() => setSendMessage(true)} style={{marginTop:".5rem", marginBottom:"3rem"}}> 
                    <button data-aos="zoom-up" data-aos-offset="100" style={{height:"2.5rem", fontSize:"1rem", border:"none", marginTop:"1rem", boxShadow:"none", background:"#ce6d06"}} type="submit" className="contactBtn btn form-control">Send</button>
                  </div>
                </form>
              </div>
            </div>
        </div>
      </main>

      {/* <Footer/> */}

      <main className='footer'>
       <div className='footer-top'>
         <div style={{maxWidth:"20rem"}} data-aos="zoom-right" data-aos-offset="100">
            <h3 className='footerTextHeading'><LocalCafeIcon style={{color:"#ce6d06", fontSize:"2.2rem"}}/> Coffee Shop</h3>
            <p className='secondryText'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
            </p>
         </div> 
         <div data-aos="zoom-down" data-aos-offset="100">
            <h3 className='footerTextHeading'>Quick Links</h3>
                <ul className='secondryText'>
                    <li style={{paddingTop:"0rem"}}><Link style={{textDecoration:"none"}} to="" className='links'>Home</Link></li>
                    <li onClick={() => smoothScroll("about")}><Link style={{textDecoration:"none"}} to="#" className='links'>About</Link></li>
                    <li onClick={() => smoothScroll("services")}><Link style={{textDecoration:"none"}} to="#" className='links'>Services</Link></li>
                    <li onClick={() => smoothScroll("gallery")}><Link style={{textDecoration:"none"}} to="#" className='links'>Gallery</Link></li>
                    <li onClick={() => smoothScroll("contact")}><Link style={{textDecoration:"none"}} to="#" className='links'>Contact</Link></li>
                </ul>
         </div>
         <div data-aos="zoom-left" data-aos-offset="100">
            <h3 className='footerTextHeading'>Get In Touch</h3>
            <ul className='secondryText'>
                <li style={{border: "none"}}>Address: Omnisport - Douala</li>
                <li style={{border: "none"}}>E-mail: kongbizion3@gmail.com</li>
                <li style={{border: "none"}}>Phone: (+237) 683 41 13 82</li>
            </ul>
         </div>
        
       </div>
       <div className='footer-bottom'>
        <p className='text-center'>© {(new Date().getFullYear())} Coffee Shop All Rights Reserved | By Kongbi Zion</p>
       </div>
      </main>

{/* --------------------------- Models ---------------------- */}

      {/* --------------------------- login / register ---------------------- */}

      <Modal size="md" show={SmShow} onHide={() => setSmShow(false)} aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Header closeButton style={{borderBottom:"none"}} onClick={() => setLogin(true)}></Modal.Header>
        <Modal.Body>
            <div className='loginForm' style={{margin:".5rem", marginBottom:"-1.5rem"}}>
              <div className='loginHeader'>
                <div onClick={() => setLogin(true)}><p className={`${loginn && 'actives'}`}>LOGIN /</p></div>
                <div onClick={() => setLogin(false)} style={{marginLeft:".01rem"}}><p className={`${!loginn && 'actives'}`}>REGISTER</p></div>
              </div>
              <div className='loginBody'>
                {loginn ?
                  <div>
                    <form onSubmit={loginFormik.handleSubmit}>
                      <div className="form-group" data-aos="zoom-right" data-aos-offset="100">
                          <label htmlFor='email' style={{ marginBottom: "-12px" }} className="FormLable"><p>Address email</p></label>
                          <input type="text" style={{backgroundColor:"transparent", height:"2.5rem", borderRadius:"0rem", boxShadow:"none", outline:"none"}} className={`form-control ${loginFormik.errors.email && loginFormik.touched.email && 'form-control2 error-boder'}`} placeholder="Please enter your email" name="email" value={loginFormik.values.email} onChange={loginFormik.handleChange} onBlur={loginFormik.handleBlur}/>
                          <span className='error' style={{fontSize:"1rem"}}>{loginFormik.errors.email && loginFormik.touched.email ? loginFormik.errors.email : ''}</span>
                      </div>
  
                      <div className="form-group" data-aos="zoom-right" data-aos-offset="100">
                          <label htmlFor='password' style={{ marginBottom: "-12px" }} className="FormLable"><p>Password</p></label>
                          <input type="password" style={{backgroundColor:"transparent", height:"2.5rem", borderRadius:"0rem", boxShadow:"none", outline:"none"}} className={`form-control ${loginFormik.errors.password && loginFormik.touched.password && 'form-control2 error-boder'}`} placeholder="Please enter your password" name="password" value={loginFormik.values.password} onChange={loginFormik.handleChange} onBlur={loginFormik.handleBlur}/>
                          <span className='error' style={{fontSize:"1rem"}}>{loginFormik.errors.password && loginFormik.touched.password ? loginFormik.errors.password : ''}</span>
                      </div>
                    
                      <div style={{marginTop:".5rem", marginBottom:"3rem"}}> 
                        <button data-aos="zoom-up" data-aos-offset="100" style={{height:"2.5rem", fontSize:"1rem", border:"none", marginTop:"1rem", boxShadow:"none", background:"#ce6d06"}} type="submit" className="contactBtn btn form-control">Login</button>
                      </div>
                    </form>

                    <div style={{marginTop:"-2rem", marginBottom:"2rem"}} className="logOout"> 
                        <div onClick={() => logOut()}><p className='text-center' style={{color:"#ce6d06", fontWeight:"bolder"}}>LogOut</p></div>
                    </div>
                  </div>
                  
                  :
                  
                  <div>
                    <form onSubmit={registerFormik.handleSubmit}>
                      <div className="form-group" data-aos="zoom-left" data-aos-offset="100">
                          <label htmlFor='name' style={{ marginBottom: "-12px"}} className="FormLable"><p>Name *</p></label>
                          <input type="text" style={{backgroundColor:"transparent", height:"2.5rem", borderRadius:"0rem", boxShadow:"none", outline:"none"}} className={`form-control ${registerFormik.errors.name && registerFormik.touched.name && 'form-control2 error-boder'}`} placeholder="Please enter your name" name="name" value={registerFormik.values.name} onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur}/>
                          <span className='error' style={{fontSize:"1rem"}}>{registerFormik.errors.name && registerFormik.touched.name ? registerFormik.errors.name : ''}</span>
                      </div>
                      <div className="form-group" data-aos="zoom-right" data-aos-offset="100">
                          <label htmlFor='email' style={{ marginBottom: "-12px" }} className="FormLable"><p>Address email *</p></label>
                          <input type="text" style={{backgroundColor:"transparent", height:"2.5rem", borderRadius:"0rem", boxShadow:"none", outline:"none"}} className={`form-control ${registerFormik.errors.email && registerFormik.touched.email && 'form-control2 error-boder'}`} placeholder="Please enter your email" name="email" value={registerFormik.values.email} onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur}/>
                          <span className='error' style={{fontSize:"1rem"}}>{registerFormik.errors.email && registerFormik.touched.email ? registerFormik.errors.email : ''}</span>
                      </div>
                      <div className="form-group" data-aos="zoom-right" data-aos-offset="100">
                          <label htmlFor='password' style={{ marginBottom: "-12px" }} className="FormLable"><p>Password *</p></label>
                          <input type="password" style={{backgroundColor:"transparent", height:"2.5rem", borderRadius:"0rem", boxShadow:"none", outline:"none"}} className={`form-control ${registerFormik.errors.password && registerFormik.touched.password && 'form-control2 error-boder'}`} placeholder="Please enter your password" name="password" value={registerFormik.values.password} onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur}/>
                          <span className='error' style={{fontSize:"1rem"}}>{registerFormik.errors.password && registerFormik.errors.password ? registerFormik.errors.password : ''}</span>
                      </div>

                      <div className="form-group" data-aos="zoom-right" data-aos-offset="100">
                          <label htmlFor='confirm_password' style={{ marginBottom: "-12px" }} className="FormLable"><p>Confirm password *</p></label>
                          <input type="password" style={{backgroundColor:"transparent", height:"2.5rem", borderRadius:"0rem", boxShadow:"none", outline:"none"}} className={`form-control ${registerFormik.errors.confirm_password && registerFormik.touched.confirm_password && 'form-control2 error-boder'}`} placeholder="Enter confirm password" name="confirm_password" value={registerFormik.values.confirm_password} onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur}/>
                          <span className='error' style={{fontSize:"1rem"}}>{registerFormik.errors.confirm_password && registerFormik.touched.confirm_password ? registerFormik.errors.confirm_password : ''}</span>
                      </div>
                      <div style={{marginTop:".5rem", marginBottom:"3rem"}}> 
                        <button data-aos="zoom-up" data-aos-offset="100" style={{height:"2.5rem", fontSize:"1rem", border:"none", marginTop:"1rem", boxShadow:"none", background:"#ce6d06"}} type="submit" className="contactBtn btn form-control">Create</button>
                      </div>
                    </form>
                  </div>
                }
              </div>
            </div>
        </Modal.Body>
      </Modal>
      
      {/* --------------------------- Clients ordered lists ---------------------- */}

      <Modal size="xl" show={lgShow} onHide={() => setLgShow(false)} aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Header closeButton style={{borderBottom:"none"}}></Modal.Header>
        <Modal.Body>
          <div className='loginHeader'>
            <div><p className='listHeader' style={{color:"#ce6d06"}}>LIST OF ORDERS YOU'VE MADE</p></div>
          </div>
          <div className='orderedItemsContainer'>

            {user == null ?
              <div className='no-orders'>
                <p className='firstText'>You are not Logged In !</p>
                <p className='secondText'>Please click on the user icon on the top bar to login.</p>
              </div>
              :
              <div>
                {userOrderList.length == 0 ? 
                  <div className='no-orders'>
                    <p className='firstText'>Oops!!! you haven't made any orders yet</p>
                    <p className='secondText'>To make an order, click on products on the top bar to move to the products section.</p>
                  </div>
                  :
                  <div className="product-status mg-b-15 clients-product-status" style={{marginTop:"1rem"}}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="product-status-wrap drp-lst">
                                    <div className="asset-inner">
                                        <table>
                                            <tr>
                                                <th>No</th>
                                                <th>Product Name</th>
                                                <th>Quantity</th>
                                                <th>Amount</th>
                                                <th>Date</th>
                                                <th>Time ordered</th>
                                                <th>Status</th>
                                            </tr>
                                          {userOrderList.map((orders, index) => <ClientsOrderList index={index} key={orders._id} id={orders._id} title={orders.product_title} quantity={orders.quantity} amount={orders.amount} date={orders.date} time={orders.time} status={orders.status}/> )}
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>
                }
              </div>
            }
          </div>
        </Modal.Body>
      </Modal>

      {/* --------------------------- Admin orderes list ---------------------- */}

      <Modal size="xl" show={adminList} onHide={() => setAdminList(false)} aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Header closeButton style={{borderBottom:"none"}}></Modal.Header>
        <Modal.Body>
          <div className='loginHeader'>
            <div><p className='listHeader' style={{color:"#ce6d06"}}>LIST OF ORDERS MADE BY CLIENT'S</p></div>
          </div>
          <div className='orderedItemsContainer'>
            <div className="product-status mg-b-15 clients-product-status" style={{marginTop:"1rem"}}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="product-status-wrap drp-lst">
                                <div className="asset-inner">
                                    <table>
                                        <tr>
                                            <th>No</th>
                                            <th>Clients Name & e-mail</th>
                                            <th>Product Name</th>
                                            <th>Quantity</th>
                                            <th>Amount</th>
                                            <th>Date</th>
                                            <th>Time ordered</th>
                                            <th>Status</th>
                                        </tr>
                                        {orderList.map((orders, index) => <AdminOrdersList index={index} key={orders._id} id={orders._id} name={orders.user_name} email={orders.user_email} title={orders.product_title} quantity={orders.quantity} amount={orders.amount} date={orders.date} time={orders.time} status={orders.status}/> )}
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

          </div>
        </Modal.Body>
      </Modal>


      {/* --------------------------- add products ---------------------- */}
      
      <Modal size="md" show={addProduct} onHide={() => setAddProduct(false)} aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Header closeButton style={{borderBottom:"none"}} onClick={() => setLogin(true)}></Modal.Header>
        <Modal.Body>
            <div className='loginForm' style={{margin:".5rem", marginBottom:"-1.5rem"}}>
              <div className='loginHeader'>
                <div onClick={() => setLogin(true)}><p className={`${login && 'actives'}`}>ADD PRODUCT</p></div>
              </div>
              <div className='loginBody'>
                <div>
                  <form onSubmit={addProductFormik.handleSubmit}>
                    <div className="form-group" data-aos="zoom-left" data-aos-offset="100">
                        <label htmlFor='title' style={{ marginBottom: "-12px"}} className="FormLable"><p>Product title</p></label>
                        <input type="text" style={{backgroundColor:"transparent", height:"2.5rem", borderRadius:"0rem", boxShadow:"none", outline:"none"}} className={`form-control ${addProductFormik.errors.title && addProductFormik.touched.title && 'form-control2 error-boder'}`} placeholder="Please enter product title" name="title" value={addProductFormik.values.title} onChange={addProductFormik.handleChange} onBlur={addProductFormik.handleBlur}/>
                        <span className='error' style={{fontSize:"1rem"}}>{addProductFormik.errors.title && addProductFormik.touched.title ? addProductFormik.errors.title : ''}</span>
                    </div>
                    <div className="form-group" data-aos="zoom-right" data-aos-offset="100">
                        <label htmlFor='amount' style={{ marginBottom: "-12px" }} className="FormLable"><p>Amount</p></label>
                        <input type="number" style={{backgroundColor:"transparent", height:"2.5rem", borderRadius:"0rem", boxShadow:"none", outline:"none"}} className={`form-control ${addProductFormik.errors.amount && addProductFormik.touched.amount && 'form-control2 error-boder'}`} placeholder="Please enter product amount" name="amount" value={addProductFormik.values.amount} onChange={addProductFormik.handleChange} onBlur={addProductFormik.handleBlur}/>
                        <span className='error' style={{fontSize:"1rem"}}>{addProductFormik.errors.amount && addProductFormik.touched.amount ? addProductFormik.errors.amount : ''}</span>
                    </div>
                    <div className="form-group" data-aos="zoom-right" data-aos-offset="100">
                        <label htmlFor='description' style={{ marginBottom: "-12px" }} className="FormLable"><p>Description</p></label>
                        <input type="text" style={{backgroundColor:"transparent", height:"2.5rem", borderRadius:"0rem", boxShadow:"none", outline:"none"}} className={`form-control ${addProductFormik.errors.description && addProductFormik.touched.description && 'form-control2 error-boder'}`} placeholder="Please enter product description" name="description" value={addProductFormik.values.description} onChange={addProductFormik.handleChange} onBlur={addProductFormik.handleBlur}/>
                        <span className='error' style={{fontSize:"1rem"}}>{addProductFormik.errors.description && addProductFormik.touched.description ? addProductFormik.errors.description : ''}</span>
                    </div>
                    <div className="form-group" data-aos="zoom-right" data-aos-offset="100">
                        <label htmlFor='image' style={{ marginBottom: "-12px" }} className="FormLable"><p>Image</p></label>
                        <input type="file" style={{backgroundColor:"transparent", height:"2.5rem", borderRadius:"0rem", boxShadow:"none", outline:"none"}} className={`form-control input`} onChange={handleImage} name="image" accept=".png, .jpg, .jpeg" required/>
                    </div>
                    <div style={{marginTop:".5rem", marginBottom:"3rem"}}> 
                      <button data-aos="zoom-up" data-aos-offset="100" style={{height:"2.5rem", fontSize:"1rem", border:"none", marginTop:"1rem", boxShadow:"none", background:"#ce6d06"}} type="submit" className="contactBtn btn form-control">Add</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
        </Modal.Body>
      </Modal>

      {/* --------------------------- Toast container ---------------------- */}
      <ToastContainer theme="dark" />
    </>
  )
}

export default Home
