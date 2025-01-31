'use client';

import React, {useState} from 'react'
import { EmailIcon } from '@chakra-ui/icons'
import styles from './newfile.module.css'
import { useAppSelector, useAppDispatch } from '@/app/lib/redux/hooks';
import { templates } from '@/app/lib/Apis/templates';
import { setCurrentFile, setCurrentCode, setCurrentLanguage, setFileSaved } from '@/app/lib/redux/features/FileSlice';
import socket from '@/app/lib/socket/socket';

interface NewFileProps {
  setNewFile: (arg0:boolean)=>void;
}

const NewFile = ({setNewFile}:NewFileProps) => {

  const [fileName, setfileName] = useState<string>();
  const [fileType, setfileType] = useState<string>();
  const projectId = useAppSelector((state)=> state.project.projectId);
  const dispatch = useAppDispatch();

  const handleFileNameChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setfileName(e.target.value);
    getExtension(e.target.value);
  }

  const getExtension = (fileName:string) => {
    const name = fileName.split('.');
    if(name.length === 1){
      return;
    }
    const ext = name[name.length-1];

    if(ext === 'html'){
      setfileType('html');
    }
    else if(ext === 'css'){
      setfileType('css');
    }
    else if(ext === 'js'){
      setfileType('javascript');
    }
    else if(ext === 'java'){
      setfileType('java');
    }
    else if(ext === 'py'){
      setfileType('python');
    }
    else if(ext === 'ts'){
      setfileType('javascript');
    }
    else if(ext === 'cpp'){
      setfileType('cpp')
    }
    else if(ext === 'go'){
      setfileType('go');
    }
    else if(ext === 'c'){
      setfileType('c');
    }
    else {
      setfileType('text');
    }
  }

  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      try{
        const res = await fetch('/api/file/addFile', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: fileName,
            language: fileType,
            projectId,
            code: templates[fileType as keyof typeof templates] || ''
          })
        });
  
        const data = await res.json();
  
        if(res.status === 200){
          dispatch(setCurrentFile(data.fileId));
          dispatch(setCurrentCode({fileId: data.fileId, code: templates[fileType as keyof typeof templates] || ''}));
          dispatch(setCurrentLanguage(fileType));
          dispatch(setFileSaved({fileId: data.fileId, saved: true}));

          setNewFile(false);
          setfileName('');
          setfileType('');

          socket.emit('new-file', projectId);
        }
      }
      catch(err){
        console.error(err);
      }
    }
  }

  return (
    <div className={styles.newfile}>
      <div>
        <EmailIcon />
      </div>
        <div className={styles.newfileInp}>
            <input type="text" placeholder="Enter file name" onChange={(e)=>handleFileNameChange(e)} onKeyDown={handleKeyDown} />
        </div>
    </div>
  )
}

export default NewFile
