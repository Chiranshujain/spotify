import React from 'react'
import './Login.css'
import { loginUrl } from '../../Data/spotify'

function Login() {
    return (
        <div className='login'>
            <img
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWwSDcPB5BiNYYBFYC9kcG8st464LzORMRsA&s'
                alt=''
            />
            <a href={loginUrl}>LOGIN WITH SPOTIFY</a>
        </div>
    )
}

export default Login