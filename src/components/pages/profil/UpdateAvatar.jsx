import React, { Component, Fragment } from 'react';
import Axios from 'axios';
const { apiSite } = require("../../../conf")

class UpdateAvatar extends Component {
  constructor(props) {
    super(props);
    // this.Auth = new AuthService();
    this.state = {
      idUser: null,
      canUpdateAvatar: false,
      selectedFile: null
    };
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
  }

  // Sélection d'une image de profil
  fileSelectedHandler = (e) => {
    e.preventDefault();
    this.setState({
      selectedFile: e.target.files[0]
    }, () => {
      this.fileUploadHandler(e);
    });
    console.log(this.selectedFile, "truc");

    return false;
  }

  // Upload de l'image de profil sélectionnée
  fileUploadHandler = (e) => {
    e.persist();
    const { selectedFile, idUser } = this.state;
    const { refreshProfile } = this.props;
    const userId = idUser;
    const formData = new FormData();
    const config = {
      headers: { 'content-type': 'multipart/form-data' },
      timeout: 6000
    };
    formData.append('avatar', selectedFile);

    Axios.post(`${apiSite}/profil/2/avatar`, formData, config)
      .then(refreshProfile)
      .catch(console.log);
  }

  render() {
    const canUpdateContent = (
      <Fragment>
        <input
          style={{ display: 'none' }}
          type="file"
          name="avatar"
          accept="image/x-png,image/gif,image/jpeg"
          onChange={(e) => { this.fileSelectedHandler(e); }}
          ref={(fileInput) => { this.fileInput = fileInput; }}
        />
        <button type="button" onClick={() => this.fileInput.click()} className="btn btn-secondary">Modifier mon avatar</button>
      </Fragment>
    );

    const {
      avatar
    } = this.state;
    console.log(this.fileInput, "file input-------------------");


    return (
      <div className="profile">

        <div className="item">
          {this.props.avatar ? <img src={this.props.avatar} alt="user avatar" className="avatar" /> : <img src={avatar} alt="user avatar" className="avatar" />}
        </div>
        <div className="item">
          {
            canUpdateContent

          }
        </div>

      </div>
    );
  }
}

export default UpdateAvatar;