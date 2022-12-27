import React, { Suspense } from 'react'
import { Puff } from 'react-loader-spinner'
const Navigations = React.lazy(() => import('./Navigations'));


function App() {
   return(
      <>
        <Suspense fallback={<Puff height="80" width="80" radius={1} color="#ce6d06" ariaLabel="puff-loading" wrapperStyle={{position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}} wrapperClass="" visible={true}/>}>
            <div className="App">
              <Navigations/>
            </div>
        </Suspense>
        {/* <Navigations/> */}
      </>
   );
  }

export default App;