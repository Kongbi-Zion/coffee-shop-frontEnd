import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import { addProductFormValidations } from '../utils/FormValidations'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { API } from '../config';
function Adminproducts(props) {
  const [addProduct, setAddProduct] = useState(false); 
  const [lgShow, setLgShow] = useState(false); 
  
  const id = props.id;
  const deleteProduct = () => {
     axios
         .delete(`${API}/products/${id}/remove`)
         .then((res) => {
             window.location.reload();
         })
         .catch((err) => {
         });
         window.location.reload()
  }

  const [imageName, setImageName] = useState('')
  const [images, setImages] = useState('')
  const handleImage = (event)=>{
      var img = event.target.files[0]
      setImages(img)
      setImageName(img.name)
  }

  const onSubmit = (values, actions) => {

      const submitProduct = (productInfo) => {

        // sending post request to upload file
        if(imageName != ''){
          const formData = new FormData()
          formData.append('myFile', images)
          axios.post(`${API}/upload`, formData, {
              headers:{
                  "content-tupe": "multipart/form-data"
              }
          }).then(res=>{
          }).catch(err=>{
          })
     
          axios.put(`${API}/products/update/${props.id}`, productInfo)
              .then(res => {
              })
              .catch(err => {
              })
              window.location.reload()
        }else{

            axios.put(`${API}/products/update/${props.id}`, productInfo)
              .then(res => {
              })
              .catch(err => {
              })
              window.location.reload()
        }
      }

      const image = imageName;
      const {title, amount, description } = values;
      if(image != ''){
        submitProduct({
            title,
            amount,
            description,
            image,
        });
      }else{
        submitProduct({
          title,
          amount,
          description,
      });
      }
  };

  const addProductFormik = useFormik({
    initialValues: {
       title: props.title, amount: props.amount, description: props.description
    },
    validationSchema: addProductFormValidations,
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

          {/* --------------------------- edit products model ---------------------- */}
          <Modal size="md" show={addProduct} onHide={() => setAddProduct(false)} aria-labelledby="example-modal-sizes-title-lg">
            <Modal.Header closeButton style={{borderBottom:"none"}}></Modal.Header>
            <Modal.Body>
                <div className='loginForm' style={{margin:".5rem", marginBottom:"-1.5rem"}}>
                  <div className='loginHeader'>
                    <div><p className={`actives`}>EDIT PRODUCT</p></div>
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
                            <input type="file" style={{backgroundColor:"transparent", height:"2.5rem", borderRadius:"0rem", boxShadow:"none", outline:"none"}} className={`form-control input`} name="image" accept=".png, .jpg, .jpeg"/>
                        </div>
                        <div style={{marginTop:".5rem", marginBottom:"3rem"}}> 
                          <button data-aos="zoom-up" data-aos-offset="100" style={{height:"2.5rem", fontSize:"1rem", border:"none", marginTop:"1rem", boxShadow:"none", background:"#ce6d06"}} type="submit" className="contactBtn btn form-control">Update</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
            </Modal.Body>
          </Modal>

          {/* --------------------------- delete products model ---------------------- */}
          <Modal size="md" show={lgShow} onHide={() => setLgShow(false)} aria-labelledby="example-modal-sizes-title-lg">
            <Modal.Header closeButton style={{borderBottom:"none"}}></Modal.Header>
            <Modal.Body>
                <div className='loginForm' style={{margin:".5rem", marginTop:"-1rem"}}>
                  <div className='loginHeader'>
                    <div><p className="actives">DELETE PRODUCT</p></div>
                  </div>
                  <div className='loginBody'>
                    <div className='no-orders'>
                      <p className='secondText' style={{color:"#7e7d7d", marginTop:"1.5rem"}}>Are you sure you want to permanently delete this product ?</p>
                    </div>
                  </div>
                  <div style={{display:"flex", justifyContent:"center", marginTop:"0rem", marginBottom:"1rem"}}>
                    <button style={{borderRadius:".3rem", background:"#B80F0A", padding:".4rem 1rem"}} onClick={deleteProduct} className='orderBtn btncenter'>Yes</button>
                  </div>
                </div>
            </Modal.Body>
          </Modal>

         <div style={{display:"flex", justifyContent:"center"}}>
          <button onClick={() => setAddProduct(true)} style={{borderRadius:".3rem", marginRight:".7rem"}} className='orderBtn btncenter'>Edit</button>
          <button onClick={() => setLgShow(true)} style={{borderRadius:".3rem"}} className='orderBtn btncenter'>Delete</button>
         </div>
      </div>
    </div>
  )
}

export default Adminproducts
