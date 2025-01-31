import React from 'react';
import styles from './videosection.module.css';

const VideoSection = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.gradientText}>Collaborate with your fellow devs</h1>
      <div className={styles.videoContainer}>
        <div className={styles.videoWrapper}>
          <video
            loop
            autoPlay
            muted
            playsInline
            onError={(e) => console.error("Video error", e)}
          >
            <source src="/videos/screen1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className={styles.animatedBorder}></div>
        </div>
        <div className={styles.videoWrapper}>
          <video
            loop
            autoPlay
            muted
            playsInline
            onError={(e) => console.error("Video error", e)}
          >
            <source src="/videos/screen2.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className={styles.animatedBorder}></div>
        </div>
      </div>
    </div>
  );
}

export default VideoSection;