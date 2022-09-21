import React from 'react'
import { Progress } from 'antd';
import './Progress.scss'

const ProgressBar = ({percent}) => {
  return (
    <div>
    <Progress type="circle" percent={percent*10} strokeColor={'#0A315A'} trailColor={'rgba(10, 49, 90, 0.4)'} strokeWidth={12} />

    </div>
  )
}

export default ProgressBar
