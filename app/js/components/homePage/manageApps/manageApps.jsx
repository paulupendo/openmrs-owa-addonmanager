/* * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */
import React from 'react';
import AddAddon from '../manageApps/AddAddon.jsx';
import { ApiHelper } from '../../../helpers/apiHelper';

export default class ManageApps extends React.Component {
  constructor(props) {
    super(props);

    this.handleClear = this.handleClear.bind(this);
    this.handleUpload = this.handleUpload.bind(this);  
  }
  
  componentDidMount() {
    $(":file").filestyle({btnClass: "btn-primary"});
  }

  handleUpload() {
    const addonFile = document.getElementById('fileInput').files[0];
      
    const apiHelper = new ApiHelper(null);
    let query = addonFile;

    // let data = {
    //   name: query.name,
    //   size: query.size,
    //   type: query.type
    // };

    // apiHelper.post('/owa/addapp', addonFile).then(response => {
    //   // console.log(addonFile, 'addonFile');
    //   // console.log(response, 'response');
    //   console.log("gehre", response);
    // });

    const d = Object.assign({
       file: addonFile
    });
    console.log("here", d);
    const fd = new FormData();
    fd.append('file', document.getElementById('fileInput').files[0]);
    console.log(fd);
    
     $.ajax({
      type: "POST",
      url: "http://localhost:8081/openmrs-standalone/ws/rest/owa/addapp",
      data: fd,
      contentType: false,
      processData: false,
      cache: false,
      /*beforeSend: function(xhr, settings) {
          xhr.setRequestHeader("Content-Type", "multipart/form-data;boundary=gc0p4Jq0M2Yt08jU534c0p");
          settings.data = {name: "file", file: inputElement.files[0]};                    
      },*/
      success: function (result) {                        
          if ( result.reseponseInfo == "SUCCESS" ) {
              console.log("done");
          } else {
            console.log(" not done");
          }
      },
      error: function (result) {
          console.log(result.responseText);
      }
  });

  }

  handleClear() {
    $(":file").filestyle('clear');
  }

  render() {
    return (
      <div className="container-fluid">
        <h3 id="manageApps">Addon Manager</h3>
        <AddAddon 
          handleClear={this.handleClear}
          handleUpload={this.handleUpload}
        />
        <div className="manage-app-table col-sm-12">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Logo</th>
                <th>Name</th>
                <th>Developer</th>
                <th>Version</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr />
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
