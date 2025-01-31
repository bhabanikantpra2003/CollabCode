'use client';

import React, { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/app/lib/redux/hooks';
import { setShareId, setShareIdLink } from '@/app/lib/redux/features/ProjectSlice';
import { AddIcon, CopyIcon, CheckIcon } from '@chakra-ui/icons';
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
  } from '@chakra-ui/react'
import styles from './menubar.module.css'
import { useSession } from 'next-auth/react';
import { Session } from '@/app/lib/types/types';  

const Menubar = () => {

    const shareId = useAppSelector(state => state.project.shareId);
    const projectId = useAppSelector(state => state.project.projectId);
    const shareIdLink = useAppSelector(state => state.project.shareLink);
    const dispatch = useAppDispatch();
    const [copied,setCopied] = useState<boolean>(false);
    const {data: session} = useSession() as {data: Session | undefined};
    const userId = session?.user?.id;

    const shareProject = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        try{
          const res = await fetch('/api/projects/share', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ projectId })
          });

          const data = await res.json();
          dispatch(setShareId(data.shareId));
        }
        catch(err){
          console.log(err);
        }
      }

      const handlecopiedClick = () =>{

        const shareurl = `${window?.location.href}?shareId=${shareId}`;
        navigator.clipboard.writeText(shareurl || '');
        setCopied((prevSetCopied)=>!prevSetCopied);

        setTimeout(()=>{
          setCopied((prevSetCopied)=>!prevSetCopied);
        },2000);
      }

  return (
    <div className={styles.menub}>
    <Popover>
      <PopoverTrigger>
        <AddIcon color='white' className={styles.addIcon} w={10} h={10}/>
      </PopoverTrigger>
      <PopoverContent marginRight='20px' background='hsl(212 18% 14%)' color='#0A0909' fontWeight='bold'>
        <PopoverArrow />
        <PopoverCloseButton color='whiteAlpha.800' marginTop='7px' />
        <PopoverHeader>
          <span className={styles.text}>Collaborate with others!</span>
        </PopoverHeader>
        {shareId && shareIdLink && (
        <PopoverBody display='flex' flexDirection='row' gap='15px'>
          <input type="text" value={shareIdLink} readOnly className={styles.inpt}/>
          {copied? <CheckIcon color='green.500' marginTop='7px' /> : <CopyIcon color='whiteAlpha.800' marginTop='7px' cursor='pointer' onClick={handlecopiedClick} />}
        </PopoverBody>
        )
        }
        <PopoverFooter>
          <button onClick={(e)=> shareProject(e)} disabled={shareId !== null} className={styles.btn}>
            Invite other devs
          </button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  </div>
  )
}

export default Menubar
