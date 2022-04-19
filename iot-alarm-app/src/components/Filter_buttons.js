

function FilterButtons({filterValues, setFilterValues}){

  function handleChangeStart(e){
      const {value} = e.target;
      setFilterValues(previousValue => {
        return{
            startDate: value + " 00:00:00.000000",
            endDate: previousValue.endDate  
        }
          
      })
  }

  function handleChangeEnd(e){
    const {value} = e.target;
    setFilterValues(previousValue => {
      return{
          startDate: previousValue.startDate,
          endDate: value + " 00:00:00.000000"  
      }
    })
  }

  return ( 
      <div className="form-container">
        <br></br>
          <div className="input-div">
              <form>
                  <label>Start date:</label> &nbsp;
                  <input type="date" name="startDate" defaultValue="2015-01-01" onChange={handleChangeStart}></input>&nbsp;&nbsp;&nbsp;
                  <label>End date:</label> &nbsp;
                  <input type="date" name="endDate" defaultValue="2050-01-01" onChange={handleChangeEnd}></input>
              </form>
          </div>
      </div>)
}

export default FilterButtons;