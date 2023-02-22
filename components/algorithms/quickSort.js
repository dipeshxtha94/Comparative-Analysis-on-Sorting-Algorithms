const sorts = async (arr, left, right, array, setArray, sleep, animationSpeed, setAlgorithm) => {
  if (left < right) {
    let partitionIndex = partition(arr, left, right, array, setArray)
    setArray([...arr])
    await sleep(animationSpeed)
    await sorts(arr, left, partitionIndex - 1, array, setArray, sleep, animationSpeed, setAlgorithm)
    await sorts(arr, partitionIndex + 1, right, array, setArray, sleep, animationSpeed, setAlgorithm)
  }
}

const partition = (arr, left, right, array, setArray) => {
  let pivot = arr[right]
  let i = left - 1
  for (let j = left; j < right; j++) {
    if (arr[j] < pivot) {
      i++
      let temp = arr[i]
      arr[i] = arr[j]
      arr[j] = temp

      let bar1 = document.getElementById(i).style
      let bar2 = document.getElementById(j).style
      bar1.backgroundColor = 'orange'
      bar2.backgroundColor = 'blue'

      setTimeout(() => {
        bar1.backgroundColor = 'black'
        bar2.backgroundColor = 'yellow'
      }, 10)

      setArray([...arr])
    }
  }

  let temp = arr[i + 1]
  arr[i + 1] = arr[right]
  arr[right] = temp

  return i + 1
}

export default sorts