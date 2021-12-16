import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Web3 from 'web3';

function App() {
  const [searchTerm, setSearchTerm] = useState("");

const searchOverWeb3 = (searchTerm)=>{
  
  var requestStr = searchTerm.split('0x').join('');

  if (requestStr.length === 40)
    return goToAddrInfos(requestStr)
  else if(requestStr.length === 64) {
    if(/[0-9a-zA-Z]{64}?/.test(requestStr))
      return goToTxInfos('0x'+requestStr)
    else if(/[0-9]{1,7}?/.test(requestStr))
      return goToBlockInfos(requestStr)
  }else if(parseInt(requestStr) > 0)
    return goToBlockInfos(parseInt(requestStr))

  alert('Don\'t know how to handle '+ requestStr)
}

const goToBlockInfos = (requestStr)=> {
  console.log(requestStr);

  Web3.eth.getBlock(requestStr,function(error, result) {
      if(!error) {
        console.log(result);
      } else {
          console.log(error);
      }
  });
}

const goToAddrInfos = (requestStr)=> {
  console.log(requestStr);
}

const goToTxInfos  = (requestStr)=> {
   console.log(requestStr);
}

  return (
    <div className="row anik1">
      <div
        className="col-md-12 col-lg-12 aos-init aos-animate d-flex justify-content-end"
        data-aos="fade-up"
        _nghost-c3=""
      >
        <div className="search_option">
          <form
            autoComplete="off"
            className="ng-untouched ng-pristine ng-invalid"
            noValidate=""
          >
            <div className="row">
              <div className="input-group col-md-10">
                <span className="search_icon">
                  <i className="bx bx-search"></i>
                </span>
                <input
                  aria-label=""
                  className="form-control ng-untouched ng-pristine ng-invalid"
                  name="searchkey"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  value={searchTerm}
                  placeholder="Search by Address/TXn Hash/Token/Block"
                  required=""
                  type="text"
                />
                <div className="input-group-prepend">
                  <select
                    className="form-control ng-untouched ng-pristine ng-valid"
                    name="searchFilter"
                  >
                    <option value="all">All Filters</option>
                    <option value="address">Address</option>
                    <option value="hash">Txn Hash</option>
                    <option value="token">Token</option>
                    <option value="block">Block</option>
                  </select>
                </div>
              </div>
              <div className="col-md-2">
                <button
                  className="btn_search"
                  onClick={(e) => {
                    debugger;
                    searchOverWeb3(searchTerm);
                  }}
                  disabled=""
                >
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
