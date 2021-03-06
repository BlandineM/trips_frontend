import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from 'axios';
import "./infos.scss"

const { apiSite } = require("../../../../conf")

function Infos() {
  const [profil, setProfil] = useState([]);
  const [preview, setPreview] = useState('')
  const toPassed = useSelector(state => state.LastTrip);
  const user = useSelector(state => state.user);
  const token = useSelector(state => state.user.token);

  useEffect(() => {
    axios.get(`${apiSite}/me/profil`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(({ data }) => {
      setProfil(data);
    });
  }, [token, user.id])

  const onChange = e => {
    return new Promise((resolve) => {
      setPreview(URL.createObjectURL(e.target.files[0]));
      return resolve(e.target.files[0])
    })
      .then((file) => {
        const formData = new FormData();
        formData.append('file', file);
        return axios.post(`${apiSite}/profil/${user.id}/avatar`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data'
          },
        });
      })
  };

  return (
    <div>
      {profil.map((user, i) => {
        return (
          (i === 0)
            ?
            (

              <div className="profil" key={i}>

                <div className="picture">
                  <form>
                    <label className='custom-file-label' htmlFor='customFile'>
                      {preview ? <img src={preview} alt="profil" />
                        : (<img src={(user.avatar != null
                          ? `${user.avatar}`
                          : 'https://res.cloudinary.com/blandine/image/upload/v1585844046/avatar/none.png')}
                          alt='profil'></img>
                        )}
                    </label>
                    <input
                      style={{ display: 'none' }}
                      type='file'
                      className='custom-file-input'
                      id='customFile'
                      accept="image/x-png,image/gif,image/jpeg"
                      onChange={onChange}
                    >
                    </input>
                  </form>
                </div>

                <div>
                  <h2 className="name">{user.user_name}</h2>
                  <h2 className="countries">{toPassed.length} pays visité{toPassed.length > 1 ? "s" : ""}</h2>
                </div>


              </div>
            )
            : ""
        )
      })}

    </div>

  )


}

export default Infos