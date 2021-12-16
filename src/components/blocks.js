import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Web3 from 'web3';
const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545/');

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
}

function Blocks() {
    const classes = useStyles();
    const [blocks, setBlocks] = useState([])
    const [transactions, setTransactions] = useState([])

    console.log({ blocks });

    const storeLocalCopy = (err, result) => {
        debugger;
        setBlocks((old) => {
            return [result, ...old]
        });
        setTransactions((old) => {
            return [result.transactions, ...old]
        });
    }

    useEffect(async () => {
        const latest = await web3.eth.getBlockNumber()
        const blockNumbers = _range(latest - n, latest + 1, 1)
        const batch = new web3.eth.BatchRequest()
        blockNumbers.forEach((blockNumber) => {
            batch.add(web3.eth.getBlock.request(blockNumber, storeLocalCopy))
        })

        batch.execute()
    }, [])


    return (
        <div>
            <section class="chart_section">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-body">
                                    <div class="block_transaction" id="tabs">
                                        <tabset class="tab-container">
                                            <ul class="nav nav-tabs" role="tablist" aria-label="Tabs">
                                                <li class="nav-item active">
                                                    <a className={classes.navLink, classes.active} href="#" role="tab" aria-controls="tab1" aria-selected="true" id="tab1-link">
                                                        <span>Blocks</span>
                                                    </a>
                                                </li>
                                                {/* <li class="nav-item">
                                                        <a className={classes.navLink} href="" role="tab" aria-controls="" aria-selected="false" id="">
                                                            <span>Transactions</span>
                                                        </a>
                                                    </li> */}
                                            </ul>
                                            <div class="tab-content">
                                                <tab heading="Blocks" id="tab1" class="active tab-pane" role="tabpanel" aria-labelledby="tab1-link">
                                                    <div class="block_table">
                                                        <div class="table-responsive">
                                                            <table class="table">
                                                                <thead>
                                                                    <tr>
                                                                        <th class="text-center">Block</th>
                                                                        <th class="text-center">Age</th>
                                                                        <th class="text-center">Transactions</th>
                                                                        <th class="text-center">Produced by</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {blocks.map((block) =>
                                                                        <tr id={block.number}>
                                                                            <td class="text-center">{block.number}</td>
                                                                            <td class="text-center">a few seconds ago</td>
                                                                            <td class="text-center">{block.transactions.length}</td>
                                                                            <td class="text-center">
                                                                                <a target="_blank" href="/address?address=LV3VBJ6aaDe69H9d7oUNmKZimNcn5RZqTu">{block.miner}</a>
                                                                            </td>
                                                                        </tr>
                                                                    )}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </tab>

                                            </div>
                                        </tabset>
                                    </div>
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
