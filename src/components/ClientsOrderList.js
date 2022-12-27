import React from 'react'
import CheckBoxIcon from '@mui/icons-material/CheckBox';
function ClientsOrderList(props) {
  return (
    <>
        {/* <tr>
            <td>mmmmm</td>
            <td>mmmmm</td>
            <td>mmmmm</td>
            <td>mmmmm</td>
            <td>mmmmm</td>
            <td>mmmmm</td>
            <td style={{color:"#ce6d06"}}>
            <span>Recieved</span>
            </td>
        </tr> */}
        <tr>
          <td>{props.index}</td>
          <td>{props.title}</td>
          <td>{props.quantity}</td>
          <td>{props.amount}</td>
          <td>{props.date}</td>
          <td>{props.time}</td>
          <td style={{color:"#ce6d06"}}>
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

export default ClientsOrderList
