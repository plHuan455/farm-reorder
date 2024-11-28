export function formatToken (token?: number) {
  if(!token) return "0"
  return token.toLocaleString('en-US')
}


export const abbreviateNumber = (num: number = 0, options?: { roundTo?: number }) => {
  const { roundTo = 2 } = options || {}

  const additionStr = [
    {
      numLen: 0,
      add: "",
    },
    {
      numLen: 4,
      add: "K",
    },
    {
      numLen: 7,
      add: "M",
    },
    {
      numLen: 10,
      add: "B",
    },
  ]
  const numLen = String(num).length
  const additionData = additionStr.reverse().find((value) => value.numLen <= numLen)

  if (!additionData?.add) return String(num)

  return `${(num / Math.pow(10, additionData.numLen - 1)).toFixed(roundTo).replace(/\.0+$/g, "")}${additionData.add}`
}
