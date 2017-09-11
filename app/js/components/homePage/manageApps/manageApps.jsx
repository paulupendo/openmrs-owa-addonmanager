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
    let query = {
      file: addonFile,
      name: AddAddon.name
    };
    apiHelper.post('/owa/addapp', query).then(response => {
      // console.log(addonFile, 'addonFile');
      // console.log(response, 'response');
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
