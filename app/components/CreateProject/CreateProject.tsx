import React, { useEffect, useState } from 'react'
import styles from './createproject.module.css'
import { CloseIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useAppDispatch } from '@/app/lib/redux/hooks';
import { setShareId, setShareIdLink } from '@/app/lib/redux/features/ProjectSlice';
import { setCurrentFile } from '@/app/lib/redux/features/FileSlice';
import { Session } from '@/app/lib/types/types'

const CreateProject = ({setCreateProject}:{setCreateProject:React.Dispatch<React.SetStateAction<boolean>>}) => {
    const dispatch = useAppDispatch();
    const {data: session} = useSession() as {data: Session | undefined};
    const userId = session?.user?.id; 
    const router = useRouter();

    const [projectName, setProjectName] = useState<string>('');

    const handleCreateProject = async() => {
        try{
            const res = await fetch('/api/projects/newProject',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: projectName,
                    userId
                })
            });

            
            const data = await res.json();

            dispatch(setShareId(null));
            dispatch(setCurrentFile(null))
            dispatch(setShareIdLink(null));
            const newProjUrl = `/project/${data.project.id}`;
            router.push(newProjUrl);
        }
        catch(err){
            console.error(err);
        }
    }

  return (
    <div className={styles.projnew}>
        <div className={styles.projmain}>
            <div className={styles.closeIcon}>
                <CloseIcon onClick={()=> setCreateProject((prevClicked)=>!prevClicked)} />
            </div>
            <div className={styles.projnewContent}>
                <span>
                    Project Name
                </span>
                <input type="text" placeholder="Enter Here..." className={styles.projnewInput} onChange={(e)=>setProjectName(e.target.value)} />
            </div>
            <div className={styles.projnewBtn}>
            <button className={styles.projBtn} onClick={handleCreateProject}>
                Go
            </button>
            </div>
        </div>
    </div>
  )
}

export default CreateProject
