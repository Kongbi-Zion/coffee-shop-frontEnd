import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { orderFormValidations } from '../utils/FormValidations';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API } from '../config';
import { useSelector } from 'react-redux'
import axios from 'axios';
function Products(props) {
  const [orderProduct, setOrderProduct] = useState(false); 
  const { user } = useSelector((state) => state.auth);

  const onSubmit = (values, actions) => {
     
    if(user == null){
      toast.error("Please you are not logged in !")
    }else{
      const user_name = user.name;
      const user_email = user.email;
      const user_id = user._id;
      const day = new Date()
      const date = day.toDateString();
      const time =  day.getHours() + ':' + day.getMinutes() + ":" + day.getSeconds();

      const submitOrder = (orderInfo) => {
        axios.post(`${API}/orders/create`, orderInfo)
            .then(res => {
            })
            .catch(err => {
            })
            // window.location.reload()
      }

      const { product_title, amount, quantity } = values;
          const newAmount = amount * quantity;
          const status = 1;
          submitOrder({
            user_name,
            user_email,
            date,
            time,
            product_title,
            quantity,
            amount: newAmount,
            status,
            user_id
          });
          toast.success("Your order has been saved. Check your order list at the top bar")
    }
    setOrderProduct(false)
  };
  
  const {handleBlur, handleChange, handleSubmit, errors, values, touched} = useFormik({
    initialValues: {
      product_title: props.title, quantity: "", amount: props.amount
    },
    validationSchema: orderFormValidations,
    onSubmit,
  })

  return (
    <div className="card" data-aos="zoom-in-down" data-aos-offset="50" style={{marginBottom:"1rem", border: "none"}}>
        <img className="card_image" src={`${API}/images/${props.image}`}/>
        <div className="card_body">
            <h3 className="cardTitle">{props.title}</h3>
            <h3 className='price'>{props.amount}</h3>
            <h2 className="secondryText">{props.description}</h2>
            <div>{props.name}</div>

          {/* --------------------------- order products model ---------------------- */}
          <Modal size="md" show={orderProduct} onHide={() => setOrderProduct(false)} aria-labelledby="example-modal-sizes-title-lg">
            <Modal.Header closeButton style={{borderBottom:"none"}}></Modal.Header>
            <Modal.Body>
                <div className='loginForm' style={{margin:".5rem", marginBottom:"-1.5rem"}}>
                  <div className='loginHeader'>
                    <div><p className="actives">ORDER PRODUCT</p></div>
                  </div>
                  <div className='loginBody'>
                    <div>
                      <form onSubmit={handleSubmit}>
                        <div className="form-group" data-aos="zoom-left" data-aos-offset="100">
                            <label htmlFor='product_title' style={{ marginBottom: "-12px"}} className="FormLable"><p>Product title</p></label>
                            <input type="text" style={{backgroundColor:"transparent", height:"2.5rem", borderRadius:"0rem", boxShadow:"none", outline:"none"}} className={`form-control ${errors.product_title && touched.product_title && 'form-control2 error-boder'}`} placeholder="Please enter product title" name="product_title" value={values.product_title} onChange={handleChange} onBlur={handleBlur} disabled/>
                            <span className='error' style={{fontSize:"1rem"}}>{errors.product_title && touched.product_title ? errors.product_title : ''}</span>
                        </div>
                        <div className="form-group" data-aos="zoom-right" data-aos-offset="100">
                            <label htmlFor='quantity' style={{ marginBottom: "-12px" }} className="FormLable"><p>Quantity</p></label>
                            <input type="number" style={{backgroundColor:"transparent", height:"2.5rem", borderRadius:"0rem", boxShadow:"none", outline:"none"}} className={`form-control ${errors.quantity && touched.quantity && 'form-control2 error-boder'}`} placeholder="Please enter product quantity" name="quantity" value={values.quantity} onChange={handleChange} onBlur={handleBlur}/>
                            <span className='error' style={{fontSize:"1rem"}}>{errors.quantity && touched.quantity ? errors.quantity : ''}</span>
                        </div>
                        <div className="form-group" data-aos="zoom-right" data-aos-offset="100">
                            <label htmlFor='amount' style={{ marginBottom: "-12px" }} className="FormLable"><p>Total amount</p></label>
                            <input type="text" style={{backgroundColor:"transparent", height:"2.5rem", borderRadius:"0rem", boxShadow:"none", outline:"none"}} className={`form-control`} name="amount" value={values.amount} onChange={handleChange} onBlur={handleBlur} disabled/>
                            <span className='error' style={{fontSize:"1rem"}}></span>
                        </div>
                        <div style={{marginTop:".5rem", marginBottom:"3rem"}}> 
                          <button data-aos="zoom-up" data-aos-offset="100" style={{height:"2.5rem", fontSize:"1rem", border:"none", marginTop:"1rem", boxShadow:"none"}} type="submit" className="contactBtn btn form-control">Make order</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
            </Modal.Body>
          </Modal>
            <button onClick={() => setOrderProduct(true)} className='orderBtn btncenter'>Order Now</button>
        </div>
    </div>
  )
}

export default Products

