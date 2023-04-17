import React from 'react';

export function PrimaryIconButton({icon, onClick, disabled, className, ...props}){

    return (
        <a role='button' className='primary-icon'>
            <img src={icon} />
            
        </a>        
    )
}