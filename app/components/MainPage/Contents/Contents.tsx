'use client'

import React from 'react'
import styles from './contents.module.css'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
const VideoSection = dynamic(() => import('../VideoSection/VideoSection'), { ssr: false })

const Contents = () => {

  const router = useRouter();

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.content}>
        <div className={styles.mainContent}>
            <span>
                Do your coding work all <span className={styles.diff}>Together</span>
            </span>
            <button className={styles.mainButton} onClick={()=>router.push('/dashboard')}>
                Get Started
            </button>
        </div>
        <VideoSection />
      </div>
    </div>
  )
}

export default Contents
