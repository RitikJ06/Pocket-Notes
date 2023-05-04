import './App.css';
import { useState, useRef } from 'react';
import GroupsSection from './components/groups/GroupsSection';
import NotesListing from './components/notesListing/NotesListing';


let all_groups = JSON.parse(localStorage.getItem('groups'));
if(all_groups == undefined){
  all_groups = [];
}

// define function to get next group or notes id
function getNextGroupOrNotesId(prefix) {
  let count = all_groups.length + 1;
  return function() {
      return prefix + count++;
  }
}
let nextGroupIDgenerator = getNextGroupOrNotesId('gp');

function App() {
  let [selectedGroup, setSelectedGroup] = useState(null);
  let [groups, setGroups] = useState([]);
  let [showCreateGroupForm, setShowCreateGroupForm] = useState(false);
  let selectedColor = "";

  let initialColorOptions = {
    '#B38BFA': false,
    '#FF79F2': false,
    '#43E6FC': false,
    '#F19576': false,
    '#0047FF': false,
    '#6691FF': false,
  };
  let [colorOptions, setColorOptions] = useState(initialColorOptions);

  let groupNameRef = useRef("");

  const addGroup = () => {
    // validate input
    selectedColor = Object.keys(colorOptions).find(key => colorOptions[key] === true);
    if(groupNameRef.current.value.trim() == ""){
      return;
    }
    if(selectedColor == undefined){
      return;
    }
    // add the group
    all_groups.push(
      {
        id: nextGroupIDgenerator(),
        name : groupNameRef.current.value,
        color : selectedColor
      }
    )
    // console.log(selectedColor, typeof(selectedColor));
    // console.log(all_groups);
    setColorOptions(initialColorOptions);
    setShowCreateGroupForm(false);

    localStorage.setItem('groups', JSON.stringify(all_groups));
  }
  
  return (
    <>
      <div className='groupSectionWrapper'>
        <GroupsSection setShowCreateGroupForm={setShowCreateGroupForm}  setGroups={setGroups} all_groups = {all_groups} setSelectedGroup={setSelectedGroup} selectedGroup={selectedGroup} />
      </div>

      <div className='notesListingWrapper'>
        <NotesListing selectedGroup={selectedGroup} all_groups={all_groups}/>
      </div>
    {
      showCreateGroupForm &&
      <div className='createNewGroupSection'> 
        <div className='createGroupForm'>
          <h2>Create New Notes Group</h2>
          <div className='createGroupInputWrapper'>
            <span className='createGroupInputs'>
              <label>Group Name</label>
              <input ref={groupNameRef} className='groupNameInput' placeholder='Enter Your Group Name...' type='text'/>
            </span>
            <span className='createGroupInputs'>
              <label>Choose Colour</label>
              <div className='colorOptionsWrapper'>
                {Object.keys(colorOptions).map((colorCode, value) =>
                    <span onClick={
                      () => {
                        selectedColor = colorCode; 
                        console.log(colorCode, 'sdf', selectedColor);
                        let newOptions = {};
                        Object.entries(colorOptions).map(([color, value]) => {
                          if(color !== selectedColor){
                            newOptions[color] = false;
                          }
                          else{
                            newOptions[color] = true;
                          }
                        })
                        
                        setColorOptions(() => newOptions);
                        }
                  } key={colorCode} style={!colorOptions[colorCode] ? {background: colorCode}: {border: "solid 3px grey", background: colorCode} } className='colorOption'></span>
                )
                }
              </div>
            </span>
          </div>  
          <div className='createGroupBtnWrapper'>
              <button onClick={addGroup} className='createGroupFormBtn'>Create</button>
          </div>
        </div>
      </div>
    }

    </>
  );
}

export default App;
