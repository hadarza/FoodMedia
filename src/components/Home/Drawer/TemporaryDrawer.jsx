import React,{ useState } from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import SelectLocation from '../Location/SelectLocation/SelectLocation';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getOpen, setOpen } from '../../../Redux/features/Phone/OpenDrawer';
export default function TemporaryDrawer() {
  const dispatch = useDispatch()
  const open = useSelector(getOpen)
  return (
    <div>
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={() => dispatch(setOpen(false))}
        onOpen={() => {dispatch(setOpen(true))}}
      >
          <SelectLocation/>
      </SwipeableDrawer>
    </div>
  );
}

