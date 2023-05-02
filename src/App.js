import './App.css';
import { useState } from 'react';
import noGroupSelectedImg from './images/noGroupSelected.svg'

function App() {
  let [selectedGroup, setSelectedGroup] = useState(null);


  return (
    <>
      <section className='notesGroup'>
        <div className='groupListTopSection'>
          <h2 className='appHeading'>Pocket Notes</h2>
          <button onClick={ () => setSelectedGroup((selectedGroup) => !selectedGroup)} className='createGroupBtn'>	<i class="fa fa-plus"></i> Create Notes Group</button>
        </div>

      </section>

      <section className='noteSection'>
        {!selectedGroup ?
          <div className='noGroupSelectedSection'>
            <div className='messageWrapper'>
              <img src={noGroupSelectedImg}></img>
              <h1 className='pocketNotesHeading'>Pocket Notes</h1>
              <p>Send and receive messages without keeping your phone online.
                <br/>Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
            </div>
            <div className='encryptionMsg'>
              <i class="fa fa-lock"></i> end-to-end encrypted
            </div>
          </div>
          :
           <div>
            Group notes 
           </div>
        }
      </section>

      <div className='createNewGroupSection'> 
        <div className='createGroupForm'>
          <h2>Create New Notes Group</h2>
          <div className='createGroupInputWrapper'>
            <span className='createGroupInputs'>
              <label>Group Name</label>
              <input className='groupNameInput' placeholder='Enter Your Group Name...' type='text'/>
            </span>
            <span className='createGroupInputs'>
              <label>Choose Colour</label>
              <div className='colorOptionsWrapper'>
                <span style={{background: "#B38BFA"}} className='colorOption'></span>
                <span style={{background: "#FF79F2"}} className='colorOption'></span>
                <span style={{background: "#43E6FC"}} className='colorOption'></span>
                <span style={{background: "#F19576"}} className='colorOption'></span>
                <span style={{background: "#F19576"}} className='colorOption'></span>
                <span style={{background: "#6691FF"}} className='colorOption'></span>
              </div>
            </span>
          </div>  
          <div className='createGroupBtnWrapper'>
              <button className='createGroupFormBtn'>Create</button>
          </div>
        </div>
      </div>

    </>
  );
}

export default App;
