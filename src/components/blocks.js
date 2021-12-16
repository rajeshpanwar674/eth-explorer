import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

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

function Blocks() {
  const classes = useStyles();

  useEffect(() => {
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
                                                                            <th class="text-center">Status</th>
                                                                            <th class="text-center">Produced by</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td class="text-center">624650</td>
                                                                            <td class="text-center">a few seconds ago</td>
                                                                            <td class="text-center">Completed</td>
                                                                            <td class="text-center">
                                                                                <a target="_blank" href="/address?address=LV3VBJ6aaDe69H9d7oUNmKZimNcn5RZqTu">LV3VBJ6aaDe69H9d7oUNmKZimNcn5RZqTu</a>
                                                                            </td>
                                                                        </tr>
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
