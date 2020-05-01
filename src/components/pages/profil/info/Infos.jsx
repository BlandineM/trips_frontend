import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import "./infos.scss"

const { apiSite } = require("../../../../conf")

function Infos() {
  const [profil, setProfil] = useState([]);
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [preview, setPreview] = useState('')
  const toPassed = useSelector(state => state.LastTrip);
  const user = useSelector(state => state.user);
  const token = useSelector(state => state.user.token);

  useEffect(() => {
    axios.get(`${apiSite}/profil/2`, {
      // headers: { Authorization: `Bearer ${token}` }
    }).then(({ data }) => {
      setProfil(data);
    });
  }, [])

  const onChange = e => {
    return new Promise((resolve) => {
      setFile(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
      setFilename(e.target.files[0].name)
      return resolve(e.target.files[0])
    })
      .then((file) => {
        const formData = new FormData();
        formData.append('file', file);
        return axios.post('http://localhost:5000/profil/2/avatar', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        });
      })
  };

  return (
    <div>
      {profil.map((user, i) => {
        if (i === 0) {
          return (

            <div className="profil">

              <div className="picture">
                <form>
                  <label className='custom-file-label' htmlFor='customFile'>
                    {preview ? <img src={preview} />
                      : (<img src={(user.avatar != null
                        ? `${user.avatar}`
                        : 'https://res.cloudinary.com/blandine/image/upload/v1585844046/avatar/none.png')}
                        alt='image de profil'></img>
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
        }
      })}

    </div>

  )


}

export default Infos