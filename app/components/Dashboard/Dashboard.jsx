'use client';

import React,{useState} from 'react'
import styles from './dashboard.module.css'
import CreateProject from '../CreateProject/CreateProject';
import RecentActivity from './RecentActivity/RecentActivity';

const DashboardContents = () => {

    const [createProject, setCreateProject] = useState(false);

  return (
    <div className={styles.dashBody}>
        {createProject && (
            <div className={createProject ? styles.overlay: ''}>
                <CreateProject setCreateProject={setCreateProject}/>
            </div>
        ) }
        <h1 className={styles.dashTitle}>Create a New Project</h1>
        <button className={styles.createBtn} onClick={()=>setCreateProject(true)}>Create</button>

        <hr className={styles.hr}/>
        <RecentActivity />
    </div>
  )
}

export default DashboardContents
