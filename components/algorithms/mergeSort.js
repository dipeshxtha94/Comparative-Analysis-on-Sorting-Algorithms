

const sort = async (array, low, high, setArray, sleep, animationSpeed) => {
  let currentArr= array
  if (low < high) {
    let mid = Math.floor((low + high) / 2)
    await sort(currentArr, low, mid, setArray, sleep, animationSpeed)
    await sort(currentArr, mid + 1, high, setArray, sleep, animationSpeed)
    await merge(currentArr, array, low, mid, high, setArray, sleep, animationSpeed)
  }
}

const merge = async (currentArr, array, low, mid, high, setArray, sleep, animationSpeed) => {
  let i = low
  let j = mid + 1
  let k = 0
  let temp = []

  while (i <= mid && j <= high) {
    if (currentArr[i] < currentArr[j]) {
      temp[k] = currentArr[i]
      i++
      k++
    }
    else {
      temp[k] = currentArr[j]
      j++
      k++
    }
     setArray([...currentArr, temp])
    
  
    let bar1 = document.getElementById(i).style
    let bar2 = document.getElementById(j).style
    bar1.backgroundColor = 'orange'
    bar2.backgroundColor = 'green'

    await sleep(animationSpeed)

    bar1.backgroundColor = 'black'
    bar2.backgroundColor = 'yellow'

  }

  while (i <= mid) {
    temp[k] = currentArr[i]

    setArray([...currentArr, temp])


    let bar1 = document.getElementById(i).style
    let bar2 = document.getElementById(j).style
    bar1.backgroundColor = 'orange'
    bar2.backgroundColor = 'green'

    await sleep(animationSpeed)

    bar1.backgroundColor = 'black'
    bar2.backgroundColor = 'yellow'

    i++
    k++
  }

  while (j <= high) {
    temp[k] = currentArr[j]
    setArray([...currentArr, temp])

    let bar1 = document.getElementById(i).style
    let bar2 = document.getElementById(j).style
    bar1.backgroundColor = 'orange'
    bar2.backgroundColor = 'green'

    await sleep(animationSpeed)

    bar1.backgroundColor = 'black'
    bar2.backgroundColor = 'yellow'

    j++
    k++

  }

  for( let i= low; i<=high; i++){
    currentArr[i]= temp[i-low]
    setArray([...currentArr])
  }
}
 export default sort;