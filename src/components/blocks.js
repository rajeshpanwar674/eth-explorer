import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Web3 from "web3";
const web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545/");

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    padding: "4px",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    // border: "2px solid #000",
    boxShadow: theme.shadows[5],
    width: "500px",
    height: "auto",
    padding: theme.spacing(2, 2, 2),
  },
}));
const n = 3;

const _range = (start, stop, step) => {
  let x = [];
  for (let i = start; i < stop; i++) {
    x.push(i);
  }
  return x;
};

function TabPanel({ children, value, index, history, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

function Blocks() {
  const classes = useStyles();
  const [blocks, setBlocks] = useState([]);
  const [value, setValue] = React.useState(0);

  var transactions = blocks.flatMap(({parentHash, number, miner, transactionsRoot, transactions}) => transactions.map(transaction => ({parentHash, number, miner, transactionsRoot, transaction})));

  const storeLocalCopy = (err, result) => {
    setBlocks((old) => {
      return [result, ...old];
    });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const latest = await web3.eth.getBlockNumber();
    const blockNumbers = _range(latest - n, latest + 1, 1);
    const batch = new web3.eth.BatchRequest();
    blockNumbers.forEach((blockNumber) => {
      batch.add(web3.eth.getBlock.request(blockNumber, storeLocalCopy));
    });

    batch.execute();
  }, []);

  return (
    <div>
      <section className="chart_section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <AppBar position="static" color="default">
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      indicatorColor="primary"
                      textColor="primary"
                      variant="scrollable"
                      scrollButtons="auto"
                      aria-label="scrollable auto tabs example"
                    >
                      <Tab label="Blocks" {...a11yProps(0)} />
                      <Tab label="Transactions" {...a11yProps(1)} />
                    </Tabs>
                  </AppBar>
                  <TabPanel value={value} index={0}>
                    <div className="block_transaction" id="tabs">
                      <div className="block_table">
                        <div className="table-responsive">
                          <table className="table">
                            <thead>
                              <tr>
                                <th className="text-center">Block</th>
                                <th className="text-center">Age</th>
                                <th className="text-center">Transactions</th>
                                <th className="text-center">Produced by</th>
                              </tr>
                            </thead>
                            <tbody>
                              {blocks.map((block) => (
                                <tr id={block.number}>
                                  <td className="text-center">{block.number}</td>
                                  <td className="text-center">a few seconds ago</td>
                                  <td className="text-center">
                                    {block.transactions.length}
                                  </td>
                                  <td className="text-center">
                                    <a
                                      target="_blank"
                                      href="/address?address=LV3VBJ6aaDe69H9d7oUNmKZimNcn5RZqTu"
                                    >
                                      {block.miner}
                                    </a>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <div className="block_transaction" id="tabs">
                      <div className="block_table">
                        <div className="table-responsive">
                          <table className="table">
                            <thead>
                              <tr>
                                <th className="text-center">Transaction Id</th>
                                <th className="text-center">Block</th>
                                <th className="text-center">Age</th>
                                <th className="text-center">From</th>
                                <th className="text-center">Miner</th>
                                <th className="text-center">Parent Hash</th>
                              </tr>
                            </thead>
                            <tbody>
                            {transactions.map((data) => ( 
                                <tr id={data.number}>
                                  <td className="text-center">{data.transaction}</td>
                                  <td className="text-center">{data.number}</td>
                                  <td className="text-center">a few seconds ago</td>
                                  <td className="text-center">{data.transactionsRoot}</td>
                                  <td className="text-center">
                                    <a
                                      target="_blank"
                                      href="/address?address=LV3VBJ6aaDe69H9d7oUNmKZimNcn5RZqTu"
                                    >
                                      {data.miner}
                                    </a>
                                  </td>
                                  <td className="text-center">{data.parentHash}</td>
                                </tr>
                            ))}
                            </tbody>
                          </table> 
                        </div>
                      </div>
                    </div>
                  </TabPanel>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Blocks;
