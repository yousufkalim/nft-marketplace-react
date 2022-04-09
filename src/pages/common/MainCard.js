import React from 'react'

import style from '../styles/mainCard.module.scss'

const MainCard = ({ children }) => {
    return (
        <div className={style.main}>
            <div className={style.cardMain}>
                {children}
            </div>
        </div>
    )
}

export default MainCard