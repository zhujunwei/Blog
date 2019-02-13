
import React from 'react'
import Loadable from 'react-loadable';

const Null = () => {
  return null;
};

const ZLoadable = (props) => {
  let {
    loading = Null,
    delay = 0,
    ...rest
  } = props;
  return (
    Loadable({
      ...rest,
      delay,
      loading
    })
  )
};

export default ZLoadable;