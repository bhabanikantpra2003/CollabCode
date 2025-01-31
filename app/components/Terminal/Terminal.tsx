'use client'

import React from 'react'
import styles from './terminal.module.css'
import { TypeAnimation } from 'react-type-animation';
import { useAppSelector } from '@/app/lib/redux/hooks';

const Terminal = () => {

  const currentFile = useAppSelector((state) => state?.file.currentFile);
  const output = useAppSelector((state) => state?.file?.output);

  return (
    <div className={styles.terminal}>
      <div className={styles.welc}>
        <TypeAnimation 
        sequence={[
          `Welcome to COdev!`,
        ]}
        speed={50}
        style={{ fontSize: '1.5em', width:"100%", textAlign:"center"}}
        />
      </div>
     {currentFile && output[currentFile] && (
        <TypeAnimation
          key={output[currentFile]}
          sequence={[`Output: ${output[currentFile]}`]}
          speed={50}
          style={{ fontSize: '1em', whiteSpace: 'pre-line', marginLeft: '10px', overflowX: 'auto', padding: '10px'}}
          cursor={false}
        />
     )}
    </div>
  )
}

export default Terminal
