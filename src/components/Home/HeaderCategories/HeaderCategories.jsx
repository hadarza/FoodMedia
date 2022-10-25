import React, {useState,useEffect, useCallback } from 'react'
import { FixedSizeList as List } from "react-window";
import AutoSizer from 'react-virtualized-auto-sizer'
import InfiniteLoader from 'react-window-infinite-loader'
import 'react-virtualized/styles.css'; // only needs to be imported once
import { axiosInstance } from '../../../../config';
import CardRestaruant from './CardRestaruant/CardRestaruant';
import SkeletonCategory from './SkeletonCategory/SkeletonCategory';
const HeaderCategories = ({tag}) => {
    let items = {}
    let requestCache = {}

const Row = ({ index, style }) => {
    const item = items[index];
    const [image,setImage] = useState("")
    // const {isLoading,data,isError,error} = useAll(RestaruantName,onSuccess,onError)

    useEffect(() => {
      if(item != undefined){
          var RestaruantImage = item.restaruntImage;
        axiosInstance.post('/api/dashboard/GetImage',{id: RestaruantImage})
        .then(response => response.data)
        .then(data =>{
          setImage(data[0].filenameimage)
        })
      }
    },[item])

    return(
    <div style={style}>
      {(item && image) ? 
      <CardRestaruant item={item} img={image}/>
      : <SkeletonCategory/>}
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
   return axiosInstance.post('/api/dashboard/Restaurant',{tag})
   .then(response => response.data)
    .then(data => {
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
    <>
    <h1 className='title-tag-restaruant'>{tag}</h1>

 <div style={{display: "flex", flexGrow: 1, width: "100%", height:"15rem"}}>
    <AutoSizer>
      {({height,width})=>(
        <InfiniteLoader
        isItemLoaded={isItemLoaded}
        loadMoreItems={loadMoreItems}
        itemCount={4}>
      {({ onItemsRendered, ref }) => (
          <List
          direction='horizontal'
          className="List"
          height={height}
          itemCount={4}
          itemSize={200}
          width={width}
          ref={ref}
          onItemsRendered={onItemsRendered}>
          {Row}   
          </List>
      )}  
      </InfiniteLoader>
      )}
    </AutoSizer> 
    </div>
    </>
  )
}

export default HeaderCategories