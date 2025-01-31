'use client'

import React, { useEffect, useCallback, useRef } from 'react'
import styles from './project.module.css'
import Navbar from '@/app/components/Project/Navbar/Navbar'
import Folder from '@/app/components/Folder/Folder'
import EditorMain from '@/app/components/Editor/EditorMain'
import Terminal from '@/app/components/Terminal/Terminal'
import { useAppDispatch, useAppSelector } from '@/app/lib/redux/hooks'
import socket from '@/app/lib/socket/socket'
import { setShareId, setShareIdLink, setProjectId } from '@/app/lib/redux/features/ProjectSlice'
import { setFileUser } from '@/app/lib/redux/features/EditingSlice'
import { setFileSaved } from '@/app/lib/redux/features/FileSlice'
import { useSession } from 'next-auth/react'
import { Session } from '@/app/lib/types/types'

const Project = ({ params }: { params: { id: string } }) => {
  const shareId = useAppSelector((state) => state.project.shareId);
  const projectId = useAppSelector((state) => state.project.projectId);
  const dispatch = useAppDispatch();
  const { data: session } = useSession() as { data: Session | undefined };
  const userId = session?.user?.id;
  const isMounted = useRef(true);
  const [admin, setAdmin] = React.useState<string>();

  useEffect(() => {

    const getAdmin = async () => {
      try {
        const res = await fetch('/api/projects/admin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
             projectId: params.id
           })
        });
        const data = await res.json();
        setAdmin(data.userId);
      } catch (error) {
        console.error('Failed to get admin:', error);
      }
    }

    getAdmin();

    return () => {
      isMounted.current = false;
    };
  }, []);

  const joinProject = (projectId: string, userId: string | undefined) => {
    if (userId) {
      socket.emit('join-project', projectId, userId);
      dispatch(setShareId(shareId));
      dispatch(setShareIdLink(`${window.location.href}?shareId=${shareId}`));
    }
  }

  const leaveProject = useCallback((projectId: string, userId: string | undefined) => {
    if (userId) {
      socket.emit('leave-project', projectId, userId);
    }
  }, [projectId, userId]);

  const addParticipant = async (projectId: string, userId: string) => {
    try {
      const res = await fetch('/api/projects/participants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ projectId, userId })
      });
      
      if (res.status === 200) {
        joinProject(projectId, userId);
      }
    } catch (error) {
      console.error('Failed to add participant:', error);
    }
  };

  useEffect(() => {
    const handleParticipant = async() => {
      if (projectId !== '' && userId) {
        const url = new URL(window.location.href);
        const urlShareId = url.searchParams.get('shareId');
    
        if (shareId) {
          if ((admin === userId) || (urlShareId === shareId)) {
            await addParticipant(projectId, userId);
          }
        } 
      }
    }
  
    handleParticipant();
  
    return () => {
      if (!isMounted.current && projectId && userId) {
        leaveProject(projectId, userId);
      }
    };
  }, [shareId, projectId, userId, addParticipant, leaveProject, admin, joinProject]);

  useEffect(() => {
    const handleProjectState = (data: any) => {
      const { projectId, fileUserMap, fileSaved, shareId } = data;
      
      Object.entries(fileUserMap).forEach(([fileId, name]) => {
        dispatch(setFileUser({ fileId, name: name as string }));
      });

      Object.entries(fileSaved).forEach(([fileId, saved]) => {
        dispatch(setFileSaved({ fileId, saved: saved as boolean }));
      });

      dispatch(setProjectId({ projectId }));
      dispatch(setShareIdLink(`${window.location.href}?shareId=${shareId}`));

      if (shareId) {
        dispatch(setShareId(shareId));
      }
    };

    socket.on('project-state', handleProjectState);

    return () => {
      socket.off('project-state', handleProjectState);
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(setProjectId({ projectId: params.id }));
  }, [dispatch, params.id]);

  return (
    <div className={styles.projBody}>
      <div className={styles.navb}>
        <Navbar />
      </div>
      <hr className={styles.ruler} />
      <div className={styles.projContent}>
        <Folder id={params.id}/>
        <div className={styles.workspace}>
          <EditorMain/>
          <Terminal/>
        </div>
      </div>
    </div>
  )
}

export default Project