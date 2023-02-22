import React, {useEffect, useState} from 'react'
import connectDb from '../utils/connectMongo';
import Test from '../models/testModel';
import { useRouter } from "next/router";
import Link from 'next/link'




const sortedBars = ({data}) => {
  const router = useRouter();


  async function handleDelete(id) {
    const response = await fetch('./api/hello/?id=' + id + '&method=del');
    const data= await response.json()
  //console.log(response)
    if (!response.ok) {
      throw new Error(`Failed to delete document: ${response.status}`);
    }else{
      router.push("/sortedBars");
    }
  
    return data;

  }
  
  return (
    
    <div>
      {data.length===0?(<p style={{textAlign:'center', fontFamily:"cursive"}}>This Page is Empty</p>):''}
      {data.map((value, idx)=>{
        return<div key={idx}>
           {value.length===0?(<p>This page is Empty</p>):''}
          <div  style={{margin: '10px'}}>
          <p style={{overflow: 'auto'}}>Unsorted Array: {`${value.arrayData},`}</p>
          <p style={{overflow: 'auto'}}>Sorted Array: {`${value.sortedData},`}</p>
          <p>Algorithm: {value.algorithmName}</p>
          <p>{value.executionTime}</p><button onClick={()=>handleDelete(value._id)}>Delete</button>
            <hr/>
          </div></div>
      })}
      <div style={{textAlign:'center', margin: '5px'}}>
        <Link href='/'><span style={{textAlign: 'center', margin:'auto', border:'1px solid black', borderRadius:'3px'}}>Back to Home Page</span></Link>
      </div>
    
    </div>
  )
}

export async function getServerSideProps() {
  connectDb();
  const data = await Test.find();
  return {
    props: {
      data: JSON.parse(JSON.stringify(data)),
    }
  }
}


// export async function getServerSideProps(context) {
//   const props1 = await getServerSideProps1(context);
//   const props2 = await getServerSideProps2(context);

//   return {
//     props: {
//       ...props1.props,
//       ...props2.props
//     }
//   }
// }

// export async function getServerSideProps() {
//   const response = await axios.get('/api/hello');
//   const users = response.data;
//   console.log(users)

//   return {
//     props: {
//       users: JSON.parse(JSON.stringify(users))
//     },
//   };
// }

// export async function getServerSideProps2(context){
//   try{
//   await connectDb()

//   const tests1= await Test1.find()

//   return{
//     props:{
//       tests1: JSON.parse(JSON.stringify(tests1))
//     }
//   }
// } catch(error){
//   console.log(error)
//   return{
//     notFound: true
//   }

// }
// }

export default sortedBars