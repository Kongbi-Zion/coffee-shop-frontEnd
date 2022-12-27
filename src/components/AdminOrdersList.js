import React from 'react'
import { API } from '../config';
import { useSelector } from 'react-redux'
import axios from 'axios';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
function AdminOrdersList(props) {
  const updateStatus = () => {

    const submitOrder = (orderInfo) => {
      axios.put(`${API}/orders/update/${props.id}`, orderInfo)
          .then(res => {
          })
          .catch(err => {
          })
      window.location.reload()
    }

    if(props.status == 1){
      const status = 2;
      submitOrder({
        status,
      });
    }
    if(props.status == 2){
      const status = 3;
      submitOrder({
        status,
      });
    }
  }
  return (
    <>
      <tr className='adminTable'>
          <td>{props.index}</td>
          <td>{props.name + " " + props.email}</td>
          <td>{props.title}</td>
          <td>{props.quantity}</td>
          <td>{props.amount}</td>
          <td>{props.date}</td>
          <td>{props.time}</td>
          <td onClick={() => updateStatus()} style={{color:"#ce6d06"}} className="status">
            {props.status == 1 ?
                <span>Pending!!!</span>
                :
                <span>
                  {(props.status == 2) ?
                    <span>Recieved</span>
                  :
                    <span><CheckBoxIcon style={{color:"#ce6d06", fontSize:"1.2rem"}}/> Delivered</span>
                  }
                </span>
              }
          </td>
      </tr>
    </> 
  )
}

export default AdminOrdersList
