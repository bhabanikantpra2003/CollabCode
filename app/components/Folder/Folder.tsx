'use client'

import React,{useEffect, useState} from 'react'
import styles from './folder.module.css'
import { ChevronDownIcon, ChevronLeftIcon, AddIcon, EmailIcon, WarningIcon } from '@chakra-ui/icons'
import NewFile from './NewFile/NewFile'
import { useAppDispatch, useAppSelector } from '@/app/lib/redux/hooks';
import { setCurrentFile, setCurrentLanguage, setCurrentCode } from '@/app/lib/redux/features/FileSlice'
import { setShareId } from '@/app/lib/redux/features/ProjectSlice'
import socket from '@/app/lib/socket/socket'
import { Tooltip } from '@chakra-ui/react'

interface FolderProps {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  shareId: string;
  files: [
    {
      id: string,
      name: string,
      language: string
    }
  ];
}

const Folder = ({id}:{id:string}) => {

  const [data, setData] = useState<FolderProps>();
  const[open, setOpen] = useState<boolean>(false);
  const[newFile, setNewFile] = useState<boolean>(false);
  const currentFile = useAppSelector((state)=>state?.file?.currentFile);
  const fileSaved = useAppSelector((state)=>state?.file?.fileSaved);
  const dispatch = useAppDispatch();

  const getFolders = async() => {
      try{
        const res = await fetch('/api/projects',{
          method: 'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id
          })
        });
        const data = await res.json();
        setData(data);

        return data;
      }
      catch(err){
        console.error(err);
      }
    }

  useEffect(()=>{
    const getReturnedData = async() => {
      const returnPayload = await getFolders() as FolderProps;
      if(returnPayload && returnPayload.files){
          const file = returnPayload.files[0];
          if(currentFile === ''){
            dispatch(setCurrentFile(file.id));
            dispatch(setCurrentLanguage(file.name));
          }
        }
        if(returnPayload.shareId){
          dispatch(setShareId(returnPayload.shareId))
        }
      }
    getReturnedData();
  }, [currentFile, id]);

  useEffect(()=>{
    socket.on('new-file', async ()=>{
      await getFolders();
    });

    return ()=>{
      socket.off('new-file');
    }
  },[]);

  const handleChevs = (e:React.MouseEvent<SVGElement, MouseEvent>) => {
    e.preventDefault();
    setOpen((prevOpen)=>!prevOpen);
  }

  const handleFileChange = async (e:React.MouseEvent<HTMLSpanElement, MouseEvent>, fileId: string, fileLanguage: string) => {
    e.preventDefault();

    try{
      const res = await fetch('/api/file/getCode',{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fileId
        })
      });
     
      if(res.status === 200){
        const data = await res.json();

        dispatch(setCurrentLanguage(data.language));
        dispatch(setCurrentCode({fileId, code: data.code.code}));
        dispatch(setCurrentFile(fileId));
      }
    }
    catch(err){
      console.error(err);
    }
  }

  return (
    <div className={styles.folders}>
      <div className={styles.names}>
        <div>
          <h1>{data?.name}</h1>
        </div>
        <div>
          {open ? (
            <div className={styles.openIcons}>
              <AddIcon onClick={()=>setNewFile((prevNewFile)=>!prevNewFile)} /> 
              <ChevronDownIcon onClick={(e)=>handleChevs(e)} />
            </div>
          ): <ChevronLeftIcon onClick={(e)=>handleChevs(e)} />}
        </div>
      </div>
      <div>
        {newFile && open && (
          <NewFile setNewFile={setNewFile} />
          )
        }
        {open && (
          <div>
            {data?.files?.map((file)=>{
              return (
                <div className={file.id === currentFile? styles.activeFile: styles.files}>
                  <div>
                    <EmailIcon />
                  </div>
                  <div key={file?.id} className={styles.file}>
                    <span onClick={(e)=>handleFileChange(e,file.id,file.name)} className={styles.fileNm}>{file?.name}</span>
                    {!fileSaved[file.id] && (
                      <Tooltip label="File not saved. Press Ctrl Q" aria-label="A tooltip">
                        <WarningIcon color="red.500" marginLeft='10px' />
                      </Tooltip>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Folder
