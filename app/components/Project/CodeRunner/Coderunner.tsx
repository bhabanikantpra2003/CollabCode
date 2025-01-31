'use client'

import React from 'react'
import { Play, Loader2 } from 'lucide-react'
import { useAppSelector, useAppDispatch } from '@/app/lib/redux/hooks'
import { setOutput } from '@/app/lib/redux/features/FileSlice'
import styles from './coderunner.module.css'

const Coderunner = () => {

  const currentFile = useAppSelector((state) => state?.file.currentFile);
  const currentLanguage = useAppSelector((state) => state?.file.currentLanguage);
  const currentCode = useAppSelector((state) => state?.file.currentCode);
  const [loading, setLoading] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();

  const runCode = async() => {

    if(!currentFile || !currentLanguage || !currentCode){
      return;
    }

    try{
      const code = currentCode[currentFile];

      if(!code || code === ''){
        return;
      }

      const endpoint = process.env.ENDPOINT ? process.env.ENDPOINT:  "https://codev-api.onrender.com";

      setLoading(true);

      const res = await fetch(`${endpoint}/execute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          code,
          lang: currentLanguage
        })
      });

      const data = await res.json();

      const output = String(data.output)

      dispatch(setOutput({fileId: currentFile, output}));
      setLoading(false);
    }
    catch(e){
      console.log(e);
    }
  }
  return (
    <div>
        {loading? (
          <Loader2 size={52} color="white" cursor='disabled' className={styles.loader} />
        ): (
          <Play color="white" size={52} onClick={runCode} cursor='pointer' />
        )}
    </div>
  )
}

export default Coderunner
