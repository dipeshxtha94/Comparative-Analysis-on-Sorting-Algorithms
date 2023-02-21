const bubble= async(array, setArray, sleep, animationSpeed, finishedAnimation)=>{
    let currentArr = array
    let sorted = false
    //setAlgorithm({ name: 'Bubble Sort', timeComplexity: 'O(n^2)' })

    while (!sorted) {
      sorted = true

      for (let i = 0; i < currentArr.length - 1; i++) {
        for (let j = 0; j < currentArr.length - i - 1; j++) {
          if (currentArr[j] > currentArr[j + 1]) {
            let temp = currentArr[j]
            currentArr[j] = currentArr[j + 1]
            currentArr[j + 1] = temp
            setArray([...currentArr])

            let bar1 = document.getElementById(j).style
            let bar2 = document.getElementById(j + 1).style
            bar1.backgroundColor = 'orange'
            bar2.backgroundColor = 'blue'

            await sleep(animationSpeed)

            bar1.backgroundColor = 'black'
            bar2.backgroundColor = 'yellow'

            sorted = false
          }
        }
      }
      if (sorted) finishedAnimation()
    }}

export default bubble;