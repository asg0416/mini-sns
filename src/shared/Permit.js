import React from 'react'
import { useSelector } from 'react-redux'
import { apiKey } from './firebase'


const Permit = (props) => {
    const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
    const yes_session = sessionStorage.getItem(_session_key);
    const user_info = useSelector((state) => state.user.user)

    if(yes_session && user_info){
        return <React.Fragment>{props.children}</React.Fragment>
    }

    return null;
}

export default Permit;
