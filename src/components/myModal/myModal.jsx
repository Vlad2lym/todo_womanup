import React from "react";
import style from './myModal.module.less'
/**
 * 
 * @typedef MyModalProps
 * @property {any} children
 * @property {boolean} visible
 * @property {Function} setVisible
 */

/** @param {MyModalProps} props*/
const MyModal = ({children, visible, setVisible}) => {
    const rootClasses = [style.myModal]

    if (visible) {
        rootClasses.push(style.active)
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={style.myModalContent} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default MyModal