import React, { useState } from 'react'
import TabPrimary from './components/TabPrimary'
import TabSecondary from './components/TabSecondary'
import Post from './components/Post'
import CreatePost from './components/CreatePost'



const App =()=>{
  const [tabState,setTabState]=useState(<TabPrimary/>);
  const handleChangeTabState=(component)=>{
    setTabState(component)
  }
  return(
    <section>
      <div style={{display:'flex',gap:'5px'}}>
        <button onClick={()=>handleChangeTabState(<TabPrimary/>)}>Tab 1</button>
        <button onClick={()=>handleChangeTabState(<TabSecondary handleChangeTabState={handleChangeTabState}/>)} > Tab 2</button>
        <button
        // onMouseEnter={onHoverPostOneLink}
        onClick={() => handleChangeTabState(<Post id={1} />)}
      >
        First Post
      </button>
        <button onClick={()=>handleChangeTabState(<CreatePost setCurrentPage={handleChangeTabState}/>)}>Create Post</button>
      </div>
      <hr/>
      {tabState}
    </section>
  )
}

export default App