import React, {useState,useEffect, useCallback } from 'react'
import { FixedSizeList as List } from "react-window";
import AutoSizer from 'react-virtualized-auto-sizer'
import InfiniteLoader from 'react-window-infinite-loader'
import 'react-virtualized/styles.css'; // only needs to be imported once
import { axiosInstance } from '../../../../config';
import CardRestaruant from './CardRestaruant/CardRestaruant';

const Infinite = () => {
    let items = {}
    let requestCache = {}
    console.log("xxy")

const Row = ({ index, style }) => {
    const item = items[index];
    const [image,setImage] = useState("")

    useEffect(() => {
      if(item != undefined){
          var RestaruantImage = item.restaruntImage;
          console.log(RestaruantImage)
        axiosInstance.post('/api/dashboard/RestaruantImage',{RestaruantImage})
        .then(response => response.data)
        .then(data =>{
          console.log("data "+ data[0].filenameimage)
          setImage(data[0].filenameimage)
        })
      }
    })

    return(
    <div style={style}>
      {item ? 
      <CardRestaruant item={item} img={image}/>
      : 'Loading'}
    </div>
    )
  };

  //check if item with index paramter is exist in items object
const isItemLoaded = ({index})=> !!items[index];

const loadMoreItems = (visibleStartIndex,visibleStopIndex)=>{
  const key = [visibleStartIndex, visibleStopIndex].join(":"); // 0:10
  if (requestCache[key]) {
     return;
   }
   const length = visibleStopIndex - visibleStartIndex;
   const visibleRange =  [...Array(length).keys()].map(
    x => x + visibleStartIndex
   );

   // check if all visible range items don't actually have an item in our items object
   const itemsRetrieved = visibleRange.every(index => !!items[index]);

  if (itemsRetrieved) {
    requestCache[key] = key;
     return;
  }
  let tag = 'burger'
   return axiosInstance.post('/api/dashboard/Restaurant',{tag})
   .then(response => response.data)
    .then(data => {
      console.log(data)
     data.forEach((Restaurant, index) => {
       items[index + visibleStartIndex] = {
        name : Restaurant.restarunt,
        info : Restaurant.info,
        priceShipment: Restaurant.priceshipment,
        timeshipment: Restaurant.timeshipment,
        restaruntImage: Restaurant.restarunt_image,
        AddressRestaruant: Restaurant.addressrestaruant
       }
       
     });
   })
   
}

  return (
 <div style={{display: "flex", flexGrow: 1, width: "100%", height:"13rem"}}>
    <AutoSizer>
      {({height,width})=>(
        <InfiniteLoader
        isItemLoaded={isItemLoaded}
        loadMoreItems={loadMoreItems}
        itemCount={100}>
      {({ onItemsRendered, ref }) => (
          <List
          direction='horizontal'
          className="List"
          height={height}
          itemCount={100}
          itemSize={200}
          width={width}
          ref={ref}
          onItemsRendered={onItemsRendered}
          >
          {Row}
          </List>
      )}  
      </InfiniteLoader>
      )}
    </AutoSizer> 
    </div>
  )
}

export default Infinite