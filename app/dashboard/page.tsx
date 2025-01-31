import React from 'react'
import styles from './dashboard.module.css'
import Navbar from '../components/MainPage/Navbar/Navbar'
import DashboardContents from '../components/Dashboard/Dashboard'

const Dashboard = async () => {
  return (
    <div className={styles.mains}>
        <Navbar />
        <DashboardContents />
    </div>
  )
}

export default Dashboard
