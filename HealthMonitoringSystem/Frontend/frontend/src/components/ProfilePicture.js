import { React, useState } from 'react'
import { Avatar, IconButton } from "@mui/material"
import { styled } from '@mui/material/styles';

function ProfilePicture(props) {
    const [pfp, setPfp] = useState(props.default);

    const Input = styled('input')({
        display: 'none',
    });

    const changePfp = (e) => {
        setPfp(URL.createObjectURL(e.target.files[0]));
    }

    return (
        <div>
            <label htmlFor="icon-button-file">
                <Input accept="image/*" id="icon-button-file" type="file" onChange={changePfp}/>
                <IconButton color="primary" aria-label="upload picture" component="span" sx={{ padding: 0 }}>
                    <Avatar 
                        sx={{ width: "12vw", height: "12vw" }}
                        src={pfp}
                    />
                </IconButton>
            </label>            
        </div>
    
    )
}

export default ProfilePicture