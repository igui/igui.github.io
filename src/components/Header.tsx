import React from 'react';

export default () => (
  <video controls={false} autoPlay={true} muted={true} loop={true}>
    <source src="/video/head.webm" type="video/webm" />
    <source src="/video/head.mp4" type="video/mp4" />
  </video>
)