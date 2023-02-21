import React, { useEffect, useState } from 'react'
import styles from '../styles/sortingBars.module.css'
import bubble from './algorithms/bubbleSort'
import sort from './algorithms/mergeSort'
import sorts from './algorithms/quickSort'
import { RiCloseCircleFill } from 'react-icons/ri'
import Head from 'next/head'
import { useRouter } from "next/router";
import axios from 'axios'


async function createTask1(arrayData, sortedData) {
  const res = await fetch('/api/hello', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ arrayData, sortedData }),
  });

  const data = await res.json();
  return data;
  
}

export default function sortingBars() {
  const [array, setArray] = useState([])
  const [algorithm, setAlgorithm] = useState('')
  const [animationSpeed, setAnimationSpeed] = useState(10)
  const [disableOptions, setDisableOptions] = useState(false)
  const [noOfBars, setNoOfBars] = useState()
  const [inpVal, setInpVal] = useState([])
  const [rearray, setRearray] = useState([])
  const [inp1, setInp1] = useState('')
  const [inp2, setInp2] = useState({})
  const [prev, setPrev]= useState([])
  const [disablePrev, setDisablePrev]= useState(true)


  const router = useRouter();



  useEffect(() => {
    //let inp= <input type='number' required/>
    resetFunc()
  }, [])

  //let inp= []
  const resetFunc = () => {
    for (let i = 0; i < array.length; i++) {
      let bar = document.getElementById(i).style
      bar.backgroundColor = 'gainsboro';
    }
    const arr = [];
    for (let i = 0; i < 200; i++) {
      arr.push(randomIntFromInterval(5, 450))
    }
    setArray(arr);
    document.getElementById('exetime').innerHTML = ''

  }

  const generateInp = () => {
    let b = document.getElementById('form1').style
    b.display = 'block'
    b.backgroundColor = 'pink'
    setDisableOptions(true)
    setDisablePrev(true)
  }

  const barGen = (e) => {
    e.preventDefault()
    let z = document.getElementById('inp')
    let y = parseInt(z.value)
    let reg = /^[a-zA-Z]+$/

    if (inp1 === '') {
      alert('enter the number')
      return false
    } else if (inp1.match(reg)) {
      alert("we only accept numbers here!!")
      setInp1('')
      return false
    }

    let b = document.getElementById('form1').style
    b.display = 'none'
    setNoOfBars(y)
    let c = document.getElementById('form2').style
    c.display = 'block'
    setInp1('')
  }

  const generating = async (e) => {
    e.preventDefault()
    setInpVal([])
    setInp2('')
    document.getElementById('exetime').innerHTML = ''
    for (let i = 0; i < array.length; i++) {
      let bar = document.getElementById(i).style
      bar.backgroundColor = 'gainsboro'
    }

    let reg = /^[a-zA-Z]+$/
    let values= inpVal.values()
    if (inpVal.length !== noOfBars) {
      alert("enter numbers")
      return false
    } 
    for (const key in inpVal) {
      if (reg.test(inpVal[key])) {
        alert("we only accept numbers here!!");
        return false
      }
    }
    // alert("we only accept numbers here!!")
    //   setInp2('')
    //   return false

    await setArray(inpVal)
    let c = document.getElementById('form2').style
    c.display = 'none'
    setDisableOptions(false)
    setDisablePrev(false)
  }

  const change = (val, idx) => {
    setInp2({ ...inp2, [idx]: val.target.value })

    const inputValue = [...inpVal]
    inputValue[idx] = parseInt(val.target.value)
    let arr = []
    arr = inputValue
    setInpVal(arr)
  }
  let bars = []
  for (let i = 0; i < noOfBars; i++) {
    bars.push(i)
  }

  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const closeform1 = () => {
    let b = document.getElementById('form1').style
    b.display = 'none'
    setDisableOptions(false)
    setDisablePrev(false)
  }

  const closeform2 = () => {
    let b = document.getElementById('form2').style
    b.display = 'none'
    setDisableOptions(false)
    setDisablePrev(false)

  }

  const generatePrev= ()=>{
       setArray(prev)
       for(let i=0; i<array.length; i++){
        let a=document.getElementById(i).style
        a.backgroundColor= 'gainsboro'
       }
  }

  const handleSortedBars= ()=>{
    router.push("/sortedBars");

  }
  
  const bubbleSort = async () => {
    setDisableOptions(true)
    setDisablePrev(true)
    setAlgorithm(' & Time Complexity: O(n^2)')
    const start = Date.now()
    const arr = array
    let copy= [...arr]
    setPrev(copy)
    await bubble(arr, setArray, sleep, animationSpeed, finishedAnimation)
    const end = Date.now()
    let exetime = `Execution time: ${end - start} ms`
    let complexity= await algorithm
    document.getElementById('exetime').innerHTML = `${exetime} & Algorithm: Merge Sort & Time Complexity: O(n^2)` 
    const result= createTask1(copy, array)
  }

  const mergeSort = async () => {
    setDisableOptions(true)
    setDisablePrev(true)

    await setAlgorithm(' & Time Complexity: O(nlogn)')
    const start = Date.now()
    let arr = array
    let copy= [...arr]
    setPrev(copy)
    await sort(arr, 0, arr.length - 1, setArray, sleep, animationSpeed, finishedAnimation)
    await finishedAnimation()
    const end = Date.now()
    let exetime = `Execution time: ${end - start} ms`
    let complexity= await algorithm
    document.getElementById('exetime').innerHTML = `${exetime} & Algorithm: Merge Sort & Time Complexity: O(nlogn)` 
    const result= createTask1(copy, array)

  }

  const quickSort = async () => {
    setDisableOptions(true)
    setDisablePrev(true)
    await setAlgorithm({name: 'Quick Sort'})
    const start = Date.now()
    let currentArr = array
    let copy= [...currentArr]
    setPrev(copy)
    //setUnsortedArray(result)
    //console.log(result)
    await sorts(currentArr, 0, currentArr.length - 1, array, setArray, sleep, animationSpeed, setAlgorithm)
    await finishedAnimation()
    const end = Date.now()
    let exetime = `Execution time: ${end - start} ms`
    let complexity= algorithm
    // await createTask1(array)
    document.getElementById('exetime').innerHTML = `${exetime} & Algorithm: Quick Sort & Time Complexity: O(nlogn)` 
    // console.log(algorithm.name)
    // document.getElementById('algorithm').innerHTML= complexity
    const result= createTask1(copy, array)
 
  }


  const finishedAnimation = async () => {
    for (let i = 0; i < array.length; i++) {
      let bar = document.getElementById(i).style
      bar.backgroundColor = 'green'
      await sleep(animationSpeed)
    }
    setDisableOptions(false)
    setDisablePrev(false)
  }


  const sleep = (milliSeconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliSeconds))
  }


  return (<div>
    <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    </Head>
    <main>
    <div className={styles.container1}>
      <img src={'./sortedbars.jpg'}></img>
      <h1 className={styles.h1}>Sorting Bars</h1>
      <div className={styles.list}>
        <ul className={styles.ul}>
          <button style={{ border: 'none', backgroundColor: 'gainsboro' }} disabled={disableOptions} onClick={() => { mergeSort() }}><li >Merge Sort</li></button>
          <button style={{ border: 'none', backgroundColor: 'gainsboro' }} disabled={disableOptions} onClick={() => { bubbleSort() }}><li>Bubble Sort</li></button>
          <button style={{ border: 'none', backgroundColor: 'gainsboro' }} disabled={disableOptions} onClick={() => { quickSort() }}><li>Quick Sort</li></button>
          <button onClick={handleSortedBars} style={{ border: 'none', backgroundColor: 'gainsboro' }} disabled={disableOptions} ><li>Sorted Bars</li></button>
        </ul>
      </div>
    </div>
    <div className={styles.container}>
      {array.map((value, idx) => {
        return <div key={idx} id={idx} className={styles.container2}>
          <p className={styles.subcontainer} style={{ height: `${value}px` }}>
          </p>
        </div>
      })}
    </div>
    <div id='exetime' className={styles.exetime} style={{margin:'auto', textAlign:'center'}}></div>
    <div id='algorithm' className={styles.exetime} style={{margin:'auto', textAlign:'center'}}></div>    
    <div className={styles.buttons}>
    <button className={styles.genman} onClick={generatePrev} disabled={disablePrev}>Generate Prev</button>
      <button className={styles.genman} onClick={generateInp} disabled={disableOptions}>Generate Manually</button>
      <button className={styles.genBars} onClick={resetFunc} disabled={disableOptions}>Generate Randomly</button>
    </div>
    <form className={styles.form1} id='form1' style={{ position: 'absolute', top: '0', bottom: '0', left: '0', right: '0', height: '20vh', margin: 'auto', textAlign: 'center' }} autoComplete='off'>
      <RiCloseCircleFill className={styles.closeform1} onClick={closeform1} style={{ margin: "0.5rem 0px 0px 22.8rem" }} />
      <br />
      <label style={{ margin: '1rem 0px 0px 0px' }} htmlFor='num'>How many numbers of bar you want to display?</label>
      <br />
      <input type="text" pattern="[0-9]" placeholder='accept only positive number' id='inp' onChange={(e) => { setInp1(e.target.value) }} value={inp1} required /><br />
      <button className={styles.ok} style={{ margin: '6px 0 5px 0' }} onClick={barGen}>Ok</button>
    </form>
    <form className={styles.form2} id='form2' style={{ position: 'absolute', top: '0', bottom: '0', left: '0', right: '0', margin: 'auto', overflow: 'auto', textAlign: 'center' }} >
      <RiCloseCircleFill className={styles.closeform1} onClick={closeform2} style={{ margin: "0.5rem 0px 0px 22.8rem" }} />
      <br />
      <br />
      <label htmlFor='inp2' style={{ margin: '1rem 0px 0 0px' }}>Enter the height of bars here!</label><br />
      {bars.map((idx, value) => {
        return <div key={idx}>
          <input type='text' name={idx} onChange={(e) => change(e, idx)} value={inp2[idx] || ''} placeholder='Enter your input here!' style={{ margin: "0.5rem 0 0 0" }} /><br />
        </div>
      })}

      <button type="button" className={styles.ok} style={{ margin: '6px 0 10px 0' }} onClick={generating}>Ok</button>
    </form>
    </main>
  </div>)
}