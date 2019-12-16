export const objectToArray = (object) => {
    if(object){
        return Object.entries(object).map(e=>Object.assign(e[1], {id: e[0]}))
    }
}


export const descriptives =(list) =>{
    // compute mean, sd and the interval range: [min, max]
    var mean,
      sd,
      i,
      len = list.length,
      sum,
      a = Infinity,
      b = -a;
    for (sum = i = 0; i < len; i++) {
      sum += list[i];
      a = Math.min(a, list[i]);
      b = Math.max(b, list[i]);
    }
    mean = sum / len;
    for (sum = i = 0; i < len; i++) {
      sum += (list[i] - mean) * (list[i] - mean);
    }
    sd = Math.sqrt(sum / (len - 1));
    return {
      mean: mean,
      sd: sd,
      range: [a, b]
    };
  }
  
 export const  forceDescriptives =(list, mean, sd) =>{
    // transfom a list to have an exact mean and sd
    var oldDescriptives = descriptives(list),
      oldMean = oldDescriptives.mean,
      oldSD = oldDescriptives.sd,
      newList = [],
      len = list.length,
      i;
    for (i = 0; i < len; i++) {
      newList[i] = sd * (list[i] - oldMean) / oldSD + mean;
    }
    return newList;
  }



export  const  randomList = (n, a, b) =>{
    // create a list of n numbers between a and b
    var list = [],
      i;
    for (i = 0; i < n; i++) {
      list[i] = Math.random() * (b - a) + a;
    }
    return list;
  }