'use client'

import React from 'react';
import styles from './auth.module.css';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import google_img from '../../../styles/images/google_img.png';

const Auth = () => {
  const router = useRouter();

  const handleSignInGoogle = async () => {
    try {
        
        const res = await signIn('google', {
            redirect: false,
        });

    }
    catch (err) {
        console.log(err);
    }
  };

  return (
    <div>
      <button className={styles.signinBtn} onClick={handleSignInGoogle}>
            <span>
                Sign in
            </span>
            <img src={google_img.src} alt="google" className={styles.googimg}/> 
      </button>
    </div>
  )
}

export default Auth
